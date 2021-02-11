const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
// const data = require('./data.js');
const bodyParser = require('body-parser');
const request = require('request');

const { OAuth2Client } = require('google-auth-library');

const login = require('./utils/userLogin');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// import userRoute from './routes/userRoute';

const client_id = config.CLIENT_ID;
const auth_redirect_url = 'postmessage';
const client_secret = config.CLIENT_SECRET;
const session_secret = config.SESSION_SECRET;



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

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Session Storage
app.use(session({
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));



// app.use('/users', userRoute);

app.get('/', function (req, res) {
 return res.send('Hello world');
});

// Auth
app.get('/auth/google', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.session);
  if (req.session.email) 
    return res.send({
      loggedIn: true, 
      userName: req.session.name, 
      userId: req.session.userId,
      accessToken: req.session.access_token
    });
  return res.send({loggedIn: false});
});

app.post('/auth/google', async (req, res) => {

  console.log(req);
  console.log('Got body: ', req.body.code);

  const code = req.body.code;
  console.log(`Code is ${code}`);

  // Session

  // use req.body.code to retrieve user, then send user info back to frontend.

  try {
    if (code != null) { 
      
      // after retrieving authorization code, get token.
      const r = await googleAuthClient.getToken({
        code,
      });
      // console.log(r);

      //Then store and save access_token and refresh token in database
      // googleAuthClient.setCredentials(r.tokens);
      googleAuthClient.credentials = r.tokens;
      console.log('Tokens acquired.');
      const profile = await login.getAuthenticatedUser(googleAuthClient, r.tokens);
      
      if (profile) {
        // Session
        req.session.email = profile.data.email;
        if (req.session.email) {
          req.session.name = profile.data.name;
          req.session.userId = profile.data.id;
          req.session.access_token = r.tokens.access_token;
          
          res.send({
            response: 'Authentication successful!', 
            loggedIn: true, 
            userName: req.session.name,
            userId: req.session.userId,
            accessToken: req.session.access_token
          });
          
        } else {
          //redo authentication
          console.log("retry authentication");
        }
      }
    }
  } catch (e) {
    
    res.status(700);
    console.log(e);
    res.send({ error: e });
  }

  return;
  
});

app.get('/auth/google/logout', (req, res) => {
    req.session.destroy();
    res.send({response: "Session destroyed."});
});



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

module.exports = app;
