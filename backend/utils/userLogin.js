var google = require('googleapis').google;
const models = require('../models').models;
const request = require('request');
const config = require('../config.js');

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;

//manually refresh an access token from google
// const refreshAccessToken = (refresh_token) => {
  
//   var options = {
//     uri: 'https://oauth2.googleapis.com/token',
//     body: JSON.stringify({
//       //data
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     }),
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     }
//   }

//   request(options, function (error, response) {
//       console.log(response.body);
//       return;
//   });
// }

const getAuthenticatedUser = async (client, tokens) => {
  //Google: get User name, & email from Gmail API
  try {
    const oauth2 = google.oauth2('v2');
  
    const profile = await oauth2.userinfo.get({ auth: client });
    if (!profile) {
      
      console.log("Can't get user profile");
    } else {
      console.log(profile.data);

      const user = await models.User.findOne({ email: profile.data.email });

      if (user) {
        console.log("This user has already been saved previously.");
        entry = await updateDatabaseUser(user, profile.data, tokens);
      } else {
        entry = await addDatabaseUser(profile.data, tokens);
      }
      // got all data here
      console.log("update complete.")
    }

    return { user: entry,
      profile: profile
    };

  } catch (error) {
    console.log(error);
  }
  return ;
}

const addDatabaseUser = async (data, tokens) => {
  try {
    // check if there's an existing entry
    
    const user = new models.User ({
      name: data.name,
      email: data.email,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
    
    const result = await user.save();
    console.log(result);
    return user;

  } catch (error) {
    console.error(error);
  }
}

const updateDatabaseUser = async (user, data, tokens) => {
  console.log(user.access_token);
  try {
    // check if there's an existing entry
    if (tokens.refresh_token) {
      user.refresh_token = tokens.refresh_token;
      console.log("There's a refresh token");
    }
    console.log("Got an access token");
    user.access_token = tokens.access_token;
    // store the refresh_token in database
    
    const result = await user.save();
    console.log(result);
    return user;

  } catch (error) {
    console.error(error);
  }
  console.log(user.access_token);
}

exports.getAuthenticatedUser = getAuthenticatedUser;
exports.addDatabaseUser = addDatabaseUser;
exports.updateDatabaseUser = updateDatabaseUser;
// exports.refreshAccessToken = refreshAccessToken;