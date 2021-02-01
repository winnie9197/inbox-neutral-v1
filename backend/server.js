import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import data from './data.js';
import bodyParser from 'body-parser';
import OAuth2Client from 'google-auth-library';


// import userRoute from './routes/userRoute';
// const logger = require('./config/logger');
let server;

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/users', userRoute);

app.get('/', function (req, res) {
 return res.send('Hello world');
});

// Auth
const googleAuthClient = new OAuth2Client(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
);

app.get('/auth/google', (req, res) => {
  return res.send(data.users);
});

app.post('/auth/google', async (req, res) => {
  console.log(req.params);
  console.log('Got body: ', req.body.code);
  const authorizationCode = req.body.code;

  // use req.body.code to retrieve user, then send basic user info back to frontend.

  // after retrieving authorization code, handle and get token.
  
  // Give access to a Google client
  const { tokens } = await googleAuthClient.getToken(authorizationCode);
  googleAuthClient.setCredentials(tokens);
  // At this point, Google client should be authorized anywhere in server.
  




  // res.sendStatus(200);
  return res.send(data.users);
});

// include this function when verifying login status
function updateRefreshToken() {
  oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      // ...

      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});