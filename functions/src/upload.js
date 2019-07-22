const inspect = require('util').inspect;

const functions = require('firebase-functions');

const admin = require('firebase-admin');

const fs = admin.firestore();

const Busboy = require('busboy');

// Libraries for resizing the image
const sharp = require('sharp');
const sizeOf = require('buffer-image-size');

const responseHeaders = {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.5.0', 'content-type':'application/json'};

function buildBody (request) {
  return new Promise((resolve, reject) => {
    const body = {};
    const busboy = new Busboy({headers: request.headers});
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        body[fieldname] = {
          data,
          type: mimetype
        }
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
      body[fieldname] = val;
    });
    busboy.on('finish', () => {
      console.log('busboy finished');
      resolve(body);
    })
    busboy.end(request.rawBody);
  });
}

module.exports = functions.https.onRequest(async (request, response) => {
  try {
    if (request.method === 'POST') {
      const body = await buildBody(request);
      let image;
      if (body.image) {
        if (body.image.type === 'image/heic') {
          image = 'tbi';
        } else {
          const imageDimensions = sizeOf(body.image.data);
          if (imageDimensions.width > 512) {
            const ratio = imageDimensions.width / 512;
            body.image.data = await sharp(body.image.data).resize(512, imageDimensions.height / ratio).toBuffer();
          }
          // Convert the image buffer to a data url
          image = `data:${body.image.type};base64,${encodeURIComponent(body.image.data.toString('base64'))}`;
        }
      }

      // Check that all the required parts are there
      if (!body.block || !body.class) {
        response.writeHead(400, responseHeaders);
        response.end(JSON.stringify({success: false, error: 'Missing Class'}));
        return;
      } else if (!body.title) {
        response.writeHead(400, responseHeaders);
        response.end(JSON.stringify({success: false, error: 'Missing Title'}));
        return;
      } else if (!body.date) {
        response.writeHead(400, responseHeaders);
        response.end(JSON.stringify({success: false, error: 'Missing Date'}));
        return;
      }

      // Prepare New Entry
      const newHomework = {
        title: body.title,
        date: body.date
      };
      if (body.image) {
        newHomework.image = image;
      }

      // Add to database
      const doc = fs.collection('classes').doc(body.block);
      const docSnap = await doc.get();
      const theClass = docSnap.data()[body.class];
      theClass.homework.push(newHomework);
      const updateData = {};
      updateData[body.class] = theClass;
      await doc.update(updateData);

      response.writeHead(200, responseHeaders);
      response.end(JSON.stringify({success: true}));
    } else {
      response.writeHead(405, responseHeaders);
      response.end(JSON.stringify({success: false, error: 'POST request must be used', method: request.method}));
    }
  } catch (error) {
    response.writeHead(400, responseHeaders);
    response.end(JSON.stringify({success: false, error: error.message, method: request.method}));
  }
});