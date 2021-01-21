
const express = require('express');
const userModel = require('../models/userModel');

const router = express.Router();
// import { getToken, isAuth } from '../util';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.clientId);

// Delete this function before deployment!!
// router.get('/google', (req, res) => {
//     console.dir(req.body);
//     return res.send(req.code);
// });
// retrieve user
router.post('/google', async (req, res) => {
    // from code, get code
    // console.log(code);

    try {
        // const user = await userModel.find({email: "user@example.com"});
        // console.log(user)
        // res.send(user);
        res.json(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
    return res.send("this request works");
});

// create user
// router.post("/register", async (req, res) => {
//     // verify token
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { name, email, picture } = ticket.getPayload();

//     // create user in database
//     const user = new userModel(req.body);

//     try {
//         await user.save();
//         res.send(user);

//         res.status(201);
//         res.json(user);
//     } catch (err) {
//         res.status(500).send(err);
//     }

// replace this section with mongoose crud operations

// curl --header "Content-Type: application/json" \
// --request POST \
// --data '{"username":"xyz","password":"xyz"}' \
// http://localhost:3000/api/login


// const user = await db.user.upsert({ 
//     where: { email: email },
//     update: { name, picture },
//     create: { name, email, picture }
// })

// });
  
  
  // router.post("/signin", async (req, res) => {
    
  //   // verify token
  //   const { token }  = req.body
  //   const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: process.env.CLIENT_ID
  //   });
  //   const { name, email, picture } = ticket.getPayload();
  
  //   try {
  //     // find user in database
  //     const user = await userModel.find({});
  //     res.send(user);
  
  //     req.session.userId = user.id
  //     res.status(201);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  
    // replace this section with mongoose crud operations
  
    // curl --header "Content-Type: application/json" \
    // --request POST \
    // --data '{"username":"xyz","password":"xyz"}' \
    // http://localhost:3000/api/login
  
  // });
  
  module.exports = router;