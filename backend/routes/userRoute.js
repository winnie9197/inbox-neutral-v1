const express = require('express');
const router = express.Router();
const models = require('../models').models;

router.post('/savings/update', async(req, res) => {

    console.log(req.body.byteSize);
    // console.log(req.session.user._id);
    try {
        // check if there's an existing entry
        if (req.body.byteSize) {  
            const entry = new models.Savings({
                byte_size: req.body.byteSize,
                number_of_messages: req.body.numberOfMessages,
                user: req.session.user._id,
            });
        
            const result = await entry.save();
            console.log(result);
            return res.send('updated Savings.');
        }
    } catch (error) {
        console.error(error);
        return res.send('Cannot update Savings.');
    }
    
    //update byte_size, number of emails, and user reference
    
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