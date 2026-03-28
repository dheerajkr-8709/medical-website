const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');

require('dotenv').config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      console.error("❌ MONGO_URL not found in .env");
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB Atlas for seeding");
    
    await Medicine.deleteMany({});
    
    const jsonPath = path.join(__dirname, 'medicines.json');
    const medicines = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    await Medicine.insertMany(medicines);
    console.log("✅ Data from medicines.json inserted successfully");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();
