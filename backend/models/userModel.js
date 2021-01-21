const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    roles: [String],
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        email: String,
        name: String,

        access_token: String,
        refresh_token: String,
        id_token: String,
        token_type: String,
    },
    savingsInBytes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
