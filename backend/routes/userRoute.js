const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
  });
   
router.post('/users', (req, res) => {
return res.send('POST HTTP method on user resource');
});

router.put('/users/:userId', (req, res) => {
return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
);
});

router.delete('/users/:userId', (req, res) => {
return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
);
});

module.exports = router;