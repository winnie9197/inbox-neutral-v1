const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema(
  {
    //user id, transaction date, transaction quantity ( byte Size ), number of items deleted
    byte_size: { type: Number, required: true, default: 0 },
    number_of_messages: { type: Number, required: true, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const savingsModel = mongoose.model('Savings', savingsSchema);

module.exports = savingsModel;
