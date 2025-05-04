const mongoose = require('mongoose');

const pinCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
  redeemedBy: {
    idGame: String,
    nama: String,
    redeemedAt: Date,
  }
});

module.exports = mongoose.model('PinCode', pinCodeSchema);
