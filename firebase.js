const admin = require('firebase-admin');
const { google } = require('googleapis');
const path = require('path');

// Path to your Firebase service account key
const serviceAccountPath = path.join(__dirname, './config/serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

// Scopes for Firebase Messaging
const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

// Function to get an access token
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const keyPath = path.join(__dirname, './config/serviceAccountKey.json');
    const key = require(keyPath);

    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );

    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

// Example usage of getAccessToken
getAccessToken()
  .then(token => console.log('Access Token:', token))
  .catch(err => console.error('Error getting access token:', err));

// Export the Firebase Admin SDK
module.exports = admin;
