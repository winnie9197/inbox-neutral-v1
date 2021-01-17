const express = require('express');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const config = require('./config');

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

// app.use('/users', userRoute);

app.get('/', function (req, res) {
 return res.send('Hello world');
});

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

app.listen(process.env.PORT || 5000);