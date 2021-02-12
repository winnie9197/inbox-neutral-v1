const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
// const data = require('./data.js');
const bodyParser = require('body-parser');
const request = require('request');
const authRoute = require('./routes/authRoute');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// import userRoute from './routes/userRoute';

const session_secret = config.SESSION_SECRET;





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
app.use('/auth', authRoute);


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
