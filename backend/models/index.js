const mongoose = require('mongoose');
const config = require('../config.js');
const User = require('./userModel');
const Savings = require('./savingsModel');
 
const connectDb = () => {
    const mongodbUrl = config.MONGODB_URL;
    return mongoose.connect(mongodbUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((error) => console.log(error.reason));
    
        
};
 
const models = { User, Savings };

exports.models = models;
exports.connectDb = connectDb;
// export { connectDb };
 
// export default models;