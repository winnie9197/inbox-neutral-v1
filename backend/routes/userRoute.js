const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();

// import { getToken, isAuth } from '../util';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.clientId);

// const router = express.Router();

//router.put('/users/:userId', (req, res) => {
//   return res.send(
//       `PUT HTTP method on user/${req.params.userId} resource`,
//   );
// });

//router.delete('/users/:userId', (req, res) => {
//   return res.send(
//       `DELETE HTTP method on user/${req.params.userId} resource`,
//   );
// });

// router.put('/:id', isAuth, async (req, res) => {
  // const userId = req.params.id;
  // const user = await User.findById(userId);
  // if (user) {
  //   user.name = req.body.name || user.name;
  //   user.email = req.body.email || user.email;
  //   user.password = req.body.password || user.password;
  //   const updatedUser = await user.save();
  //   res.send({
  //     _id: updatedUser.id,
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     isAdmin: updatedUser.isAdmin,
  //     token: getToken(updatedUser),
  //   });
  // } else {
  //   res.status(404).send({ message: 'User Not Found' });
  // }
// });
router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    token: req.body.token,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

// router.post('/register', async (req, res) => {
  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // const newUser = await user.save();
  // if (newUser) {
  //   res.send({
  //     _id: newUser.id,
  //     name: newUser.name,
  //     email: newUser.email,
  //     isAdmin: newUser.isAdmin,
  //     token: getToken(newUser),
  //   });
  // } else {
  //   res.status(401).send({ message: 'Invalid User Data.' });
  // }
// });

// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       email: 'admin@example.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

// module.exports = {
//   router: router
// }
module.exports = router;