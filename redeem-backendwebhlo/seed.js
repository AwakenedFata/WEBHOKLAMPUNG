require('dotenv').config();
const mongoose = require('mongoose');
const PinCode = require('./models/pinCode');

// Ganti dengan PIN yang kamu mau isi
const seedPins = [
  { code: 'ABC123', used: false },
  { code: 'DEF456', used: false },
  { code: 'XYZ789', used: false },
  { code: 'CIHUYY123', used: false },
  { code: 'LAWAKLU255', used: false },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    // Hapus data lama dulu biar gak error duplikat
    await PinCode.deleteMany({});

    // Masukkan data baru
    await PinCode.insertMany(seedPins);
    console.log('✅ Data berhasil di-seed!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Gagal seed data:', err);
    mongoose.disconnect();
  });
