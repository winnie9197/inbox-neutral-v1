const express = require('express');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const mongoose = require('mongoose');
const config = require('./config');
const data = require('./data');
const bodyParser = require('body-parser');

// connect to MongoDB
const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
// app.use(bodyParser);
app.use('/auth', authRoute);
app.use('/user', userRoute);

app.get('/', function (req, res) {
 return res.send('Hello world');
});

app.get('/api/v1', function (req, res) {
  return res.send(data.users);
 });

// Check the currently signed in user
// app.use(async (req, res, next) => {
//   const user = await db.user.findFirst({where: { id:  req.session.userId }})
//   req.user = user
//   next()
// })

// app.delete("/logout", async (req, res) => {
//   await req.session.destroy()
//   res.status(200)
//   res.json({
//       message: "Logged out successfully"
//   })
// })

const port = config.PORT;
app.listen(config.PORT, () => console.log(`Serve at http://localhost:${port}`));