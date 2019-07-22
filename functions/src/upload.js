const { parse } = require('querystring');
const inspect = require('util').inspect;

const functions = require('firebase-functions');

const admin = require('firebase-admin');

const Busboy = require('busboy');

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
  if (request.method === 'POST') {
    const body = await buildBody(request);
    let image;
    if (body.image) {
      if (body.image.type === 'image/heic') {
        image = 'tbi';
      } else {
        // Convert the image buffer to a data url
        image = `data:${body.image.type};base64,${encodeURIComponent(body.image.data.toString('base64'))}`;
      }
    }

    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({...body, image}));
  } else {
    response.writeHead(405, responseHeaders);
    response.end(JSON.stringify({success: false, error: 'POST request must be used', method: request.method}));
  }
});