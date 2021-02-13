const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');
// const data = require('./data.js');
const bodyParser = require('body-parser');
const request = require('request');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

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

app.get('/', function (req, res) {
 return res.send('Hello world');
});

// Auth
app.use('/auth', authRoute);
app.use('/users', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

module.exports = app;
