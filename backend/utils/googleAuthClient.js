const { OAuth2Client } = require('google-auth-library');
const config = require('../config.js');

const client_id = config.CLIENT_ID;
const auth_redirect_url = 'postmessage';
const client_secret = config.CLIENT_SECRET;

// Setup Google client
const googleAuthClient = new OAuth2Client(
    client_id,
    client_secret,
    auth_redirect_url
  );
  
//update refresh token listener
googleAuthClient.on('tokens', async (tokens) => {
    await login.getAuthenticatedUser(googleAuthClient, tokens);
});

module.exports = googleAuthClient;