const functions = require('firebase-functions');

const admin = require('firebase-admin');

const fs = admin.firestore();

// Get authorisation function
const verifyToken = require('./auth/verify.js');
const responseHeaders = {'Access-Control-Allow-Credentials': true, 'PW-Mini-Version': '10.5.0', 'content-type':'application/json'};

module.exports = functions.https.onRequest(async (request, response) => {
  try {
    verifyToken(request.headers['authorization']);
  } catch (error) {
    response.writeHead(400, responseHeaders);
    response.end(JSON.stringify({success: false, error: error.message}));
  }
  if (request.method === 'POST') {
    let body = JSON.parse(request.rawBody.toString());
    console.log(JSON.stringify(body));

    // Check for required properties
    if (!body.block) {
      response.writeHead(400, responseHeaders);
      response.end(JSON.stringify({success: false, error: 'Missing Block'}));
      return;
    } else if (!body.name) {
      response.writeHead(400, responseHeaders);
      response.end(JSON.stringify({success: false, error: 'Missing Name'}));
      return;
    }

    // Create Class in Database
    const newClass = {};
    newClass[body.name] = {
      events: [],
      homework: []
    };
    await fs.collection('classes').doc(body.block).update(newClass);

    // Send Response
    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({success: true}));
  } else {
    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({success: false, error: 'POST request must be used', method: request.method}));
  }
});