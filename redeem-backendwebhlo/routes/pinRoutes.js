const express = require('express');
const router = express.Router();
const PinCode = require('../models/pinCode');

router.post('/redeem', async (req, res) => {
  const { pinCode, idGame, nama } = req.body;
  
  console.log('Received redemption request:', { pinCode, idGame, nama });
  
  if (!pinCode || !idGame || !nama) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Semua kolom harus diisi' });
  }

  try {
    console.log('Looking for PIN code:', pinCode);
    const pin = await PinCode.findOne({ code: pinCode });

    if (!pin) {
      console.log('PIN not found:', pinCode);
      return res.status(404).json({ error: 'PIN code tidak ditemukan' });
    }
    
    if (pin.used) {
      console.log('PIN already used:', pinCode);
      return res.status(409).json({ error: 'PIN code sudah digunakan' });
    }

    console.log('PIN found and valid, updating...');
    pin.used = true;
    pin.redeemedBy = {
      idGame,
      nama,
      redeemedAt: new Date()
    };

    await pin.save();
    console.log('PIN successfully redeemed');
    res.status(200).json({ message: 'Redeem berhasil' });
  } catch (error) {
    console.error('Server error during redemption:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});
module.exports = router;
