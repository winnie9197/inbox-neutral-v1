const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
// const data = require('./data.js');
const bodyParser = require('body-parser');
const request = require('request');

const { OAuth2Client } = require('google-auth-library');
var google = require('googleapis').google;
const models = require('./models').models;
const connectDb = require('./models').connectDb;

// import userRoute from './routes/userRoute';

const client_id = config.CLIENT_ID;
const auth_redirect_url = 'postmessage';
const client_secret = config.CLIENT_SECRET;



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/users', userRoute);

app.get('/', function (req, res) {
 return res.send('Hello world');
});

// Auth
app.get('/auth/google', (req, res) => {
  // return res.send(data.users);
});

app.post('/auth/google', async (req, res) => {
  console.log(req);

  const googleAuthClient = new OAuth2Client(
    client_id,
    client_secret,
    auth_redirect_url
  );

  // console.log(req);
  console.log('Got body: ', req.body.code);

  const code = req.body.code;
  console.log(`Code is ${code}`);

  // use req.body.code to retrieve user, then send user back to frontend.

  // after retrieving authorization code, handle and get token.
  try {
    if (code != null) { 
      const r = await googleAuthClient.getToken({
        code,
      });
      console.log(r);

      googleAuthClient.setCredentials(r.tokens);
      console.log('Tokens acquired.');
      await saveAuthenticatedUser(googleAuthClient, r.tokens);
      res.send('Authentication successful!');
    }
  } catch (e) {
    
    res.status(700);
    console.log(e);
    res.send(e);
  }

  //Then store and save access_token and refresh token in database


  return;
  
});

async function saveAuthenticatedUser(client, tokens) {
  //Google: get User name, & email from Gmail API
  try {
    // const client = await google.auth.getClient();
    const oauth2 = google.oauth2('v2');
    // var oauth2 = google.oauth2({
    //   version: 'v2',
    //   auth: googleAuthClient
    // });
  
    const profile = await oauth2.userinfo.get({ auth: client },
      async (err, res) => {
        if (err) {
           console.log(err);
        } else {
           console.log(res.data);

           // got all data here

           //+ Mongoose code here: create new User(), and save
          try {

            // check if there's an existing entry
            
            await models.User.findOne({ email: res.data.email }, 
              async (err, user) => {

                if (err) {
                  throw(err);
                }

                if (user) {
                  console.log("This user has already been saved previously.");

                  //update access_token / refresh_token

                } else {

                  const user = new models.User ({
                    name: res.data.name,
                    email: res.data.email,
                    access_token: 'access_token',
                    refresh_token: 'refresh_token',
                  });
                  
                  const result = await user.save();
                  console.log(result);

              }
            });
          } catch (error) {
            console.error(error);
          }
          
        }
    });
  } catch (error) {
    console.log(error);
  }
  



  
}

// Users
app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
  });
   
app.post('/users', (req, res) => {
return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
);
});

app.delete('/users/:userId', (req, res) => {
return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
);
});


// Database
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error.reason));

// verify if the connction is made
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Database connected')
});
db.on('error', err => {
  console.error('connection error:', err)
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
