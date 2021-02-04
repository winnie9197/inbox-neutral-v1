const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
const data = require('./data.js');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
// import models, { connectDb } from './models';
const models = require('./models').models;
const connectDb = require('./models').connectDb;

// import userRoute from './routes/userRoute';
// const logger = require('./config/logger');
let server;

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
      saveAuthenticatedUser(r.tokens);
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

async function saveAuthenticatedUser(tokens) {
  //Google: get User name, & email

  //+ Mongoose code here: create new User(), and save
  try {
    const user = new models.User ({
      name: 'User1',
      email: 'user1@gmail.com',
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    });

    const doc = await user.save()
    console.log(doc);
  } catch (error) {
    console.error(error);
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
