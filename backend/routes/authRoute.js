const express = require('express');
const router = express.Router();
const googleAuthClient = require('../utils/googleAuthClient');
const login = require('../utils/userLogin');

router.get('/google', (req, res) => {
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
  
router.post('/google', async (req, res) => {
  
  
    console.log(req);
  
    console.log('Got body: ', req.body.code);
    const authorizationCode = req.body.code;
  
  
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
  
router.get('/google/logout', (req, res) => {
      req.session.destroy();
      res.send({response: "Session destroyed."});
});

module.exports = router;