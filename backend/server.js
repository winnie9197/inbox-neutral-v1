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
app.get('/auth/google', (req, res) => {
  return res.send(data.users);
});

// const googleAuthClient = new OAuth2Client(
//   config.CLIENT_ID,
//   config.CLIENT_SECRET,
//   config.AUTH_REDIRECT_URL
// );

app.post('/auth/google', (req, res) => {
  console.log(req.params);
  console.log('Got body: ', req.body.code);

  // use req.body.code to retrieve user, then send user back to frontend.

  // after retrieving authorization code, handle and get token.




  // res.sendStatus(200);
  return res.send(data.users);
});

// function getAuthenticatedClient() {


//   // Generate the url that will be used for the consent dialog.
//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: 'https://www.googleapis.com/auth/userinfo.profile',
//   });
// }

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