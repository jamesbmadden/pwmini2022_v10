const functions = require('firebase-functions');

const admin = require('firebase-admin');

const fs = admin.firestore();

const responseHeaders = {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.5.0', 'content-type':'application/json'};

module.exports = functions.https.onRequest(async (request, response) => {
  if (request.method === 'POST') {
    console.log('hello');
    let body = JSON.parse(request.rawBody.toString());
    console.log(body);
    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({success: true, body}));
  } else {
    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({success: false, error: 'POST request must be used', method: request.method}));
  }
});