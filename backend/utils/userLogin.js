var google = require('googleapis').google;
const models = require('../models').models;

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
        await updateDatabaseUser(user, profile.data, tokens);
      } else {
        await addDatabaseUser(profile.data, tokens);
      }
      // got all data here
      console.log("update complete.")
    }

    return profile;

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

  } catch (error) {
    console.error(error);
  }
}

const updateDatabaseUser = async (user, data, tokens) => {
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

  } catch (error) {
    console.error(error);
  }
}

exports.getAuthenticatedUser = getAuthenticatedUser;
exports.addDatabaseUser = addDatabaseUser;
exports.updateDatabaseUser = updateDatabaseUser;