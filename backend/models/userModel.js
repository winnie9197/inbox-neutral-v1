const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String, required: true, unique: true, index: true
    },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    totalSavingsInBytes: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
