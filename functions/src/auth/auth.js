const functions = require('firebase-functions');

const admin = require('firebase-admin');

const jwt = require('jsonwebtoken');

const fetch = require('node-fetch');

const responseHeaders = {'Access-Control-Allow-Origin': '*', 'PW-Mini-Version': '10.5.0', 'content-type':'application/json'};

module.exports = functions.https.onRequest(async (request, response) => {
  if (request.method === 'POST') {
    let body = JSON.parse(request.rawBody.toString());
    console.log(JSON.stringify(body));
    const googleResp = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-L3rjWDvUVc1TMDZ_t8xeWZrkhjPM3Fw', {
      method: 'POST', body: JSON.stringify({
        email: body.email,
        password: body.password,
        returnSecureToken: true
      })
    });
    const account = await googleResp.json();
    if (account.error) {
      response.writeHead(200, responseHeaders);
      response.end(JSON.stringify({success: false, error: account.error.message}));
      return;
    }
    response.writeHead(200, responseHeaders);
    response.end(JSON.stringify({success: true, account, token: jwt.sign({ iat: new Date().getTime(), sub: body.email }, functions.config().jwt.secret)}));
  } else {
    response.writeHead(400, responseHeaders);
    response.end(JSON.stringify({success: false, error: 'POST request must be used', method: request.method}));
  }
});