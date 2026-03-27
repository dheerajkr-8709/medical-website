const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Medicine = require('./models/Medicine');

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medical-shop';
    await mongoose.connect(mongoUri);
    console.log('--- Database Connected Successfully ---');
    
    // Clear existing
    await Medicine.deleteMany({});
    console.log('--- Inventory Cleared ---');

    // Read from medicines.json
    const jsonPath = path.join(__dirname, 'medicines.json');
    if (!fs.existsSync(jsonPath)) {
        console.error('medicines.json NOT FOUND!');
        process.exit(1);
    }
    const rawData = fs.readFileSync(jsonPath);
    let medicines = JSON.parse(rawData);

    // If less than 200, duplicate to reach exactly 205
    const targetCount = 205; 
    let finalMedicines = [...medicines];
    
    if (medicines.length < targetCount) {
      console.log(`Initial items: ${medicines.length}. Expanding to 200+...`);
      let i = 0;
      while (finalMedicines.length < targetCount) {
        const baseMed = medicines[i % medicines.length];
        const copy = { 
          ...baseMed, 
          name: `${baseMed.name} (Pack of ${Math.floor(Math.random() * 3) + 2})`,
          price: Math.floor(baseMed.price * (1.2 + Math.random() * 0.5)),
          discount: Math.floor(Math.random() * 25)
        };
        finalMedicines.push(copy);
        i++;
      }
    }

    // Insert new
    await Medicine.insertMany(finalMedicines);
    console.log(`--- SUCCESS: Seeded ${finalMedicines.length} Medicines! ---`);
    
    process.exit();
  } catch (err) {
    console.error('--- SEEDING FAILED ---');
    console.error(err);
    process.exit(1);
  }
};

seedDB();
