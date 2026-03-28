const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Medicine = require('../models/Medicine');

const medicinesData = [
  // Snippet 1
  { "name": "Dolo 650", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Crocin Advance", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=400" },
  { "name": "Calpol 500", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Brufen 400", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=400" },
  { "name": "Zerodol SP", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Cetzine", "category": "Cold & Allergy", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Allegra 120", "category": "Cold & Allergy", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Montair LC", "category": "Allergy", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Azithral 500", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Augmentin 625", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Ciplox 500", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Pan 40", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Omez 20", "category": "Acidity", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Glycomet 500", "category": "Diabetes", "image": "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=400" },
  { "name": "Amaryl 1mg", "category": "Diabetes", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Amlokind 5", "category": "Blood Pressure", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Telma 40", "category": "Blood Pressure", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Benadryl Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Ascoril Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Becosules Capsule", "category": "Capsule", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Evion 400", "category": "Capsule", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Ceftriaxone Injection", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Insulin Injection", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Johnson Baby Powder", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Himalaya Baby Cream", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Dabur Chyawanprash", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Liv 52", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },

  // Snippet 2
  { "name": "Dolo 500", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Combiflam", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Voveran", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Sinarest", "category": "Cold & Flu", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Okacet", "category": "Allergy", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "TusQ Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Oflox 200", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Taxim O", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Gelusil Tablets", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Digene Tablets", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Thyronorm 50", "category": "Thyroid", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Eltroxin", "category": "Thyroid", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Ecosprin 75", "category": "Heart Care", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Clopitab", "category": "Heart Care", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Zincovit", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Supradyn", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "ORS Sachet", "category": "Rehydration", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Electral Powder", "category": "Rehydration", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Volini Gel", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Moov Spray", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Dettol Antiseptic", "category": "First Aid", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Savlon Liquid", "category": "First Aid", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Betadine Ointment", "category": "First Aid", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Burnol Cream", "category": "First Aid", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },

  // Snippet 3
  { "name": "Eno Powder", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Pantocid 40", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Rablet 20", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Honitus Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Koflet Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Bro Zedex Syrup", "category": "Cough Syrup", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Sumo Tablet", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Pacimol 650", "category": "Fever & Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Saridon", "category": "Headache", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Nicip Plus", "category": "Headache", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "A to Z Multivitamin", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Neurobion Forte", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Johnson Baby Shampoo", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Sebamed Baby Lotion", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Pampers Pants", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Huggies Pants", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Stayfree Pads", "category": "Women Care", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Whisper Ultra Pads", "category": "Women Care", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Boroline Cream", "category": "Ointment", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Soframycin Cream", "category": "Ointment", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Neosporin Ointment", "category": "Ointment", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Normal Saline 500ml", "category": "Saline", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "DNS Saline", "category": "Saline", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "TT Injection", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Vitamin B Complex Injection", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Himalaya Ashwagandha", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Patanjali Aloe Vera Juice", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Dabur Honitus", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },

  // Snippet 4
  { "name": "Hajmola", "category": "Digestion", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Pudin Hara", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Cyclopam", "category": "Stomach Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Spasmonil", "category": "Stomach Pain", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Vicks VapoRub", "category": "Cold & Cough", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Strepsils", "category": "Throat Care", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Halls Candy", "category": "Cold & Cough", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Atorva 10", "category": "Cholesterol", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Rosuvas 10", "category": "Cholesterol", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Ecosprin AV", "category": "Heart Care", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Met XL 50", "category": "Blood Pressure", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Prolomet XL", "category": "Blood Pressure", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Glimy M", "category": "Diabetes", "image": "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=400" },
  { "name": "Istamet", "category": "Diabetes", "image": "https://images.unsplash.com/photo-1550572017-ed200f5e6343?q=80&w=400" },
  { "name": "Caldikind Plus", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Arachitol 60K", "category": "Vitamin D", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Folvite", "category": "Vitamins", "image": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=400" },
  { "name": "Livogen", "category": "Iron Supplement", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Dexorange", "category": "Iron Supplement", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "ORS Electral", "category": "Rehydration", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Protinex Powder", "category": "Nutrition", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Dabur Lal Tail", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Mamaearth Baby Lotion", "category": "Baby Care", "image": "https://images.unsplash.com/photo-1582121326402-9bc509be12a2?q=80&w=400" },
  { "name": "Whisper Choice", "category": "Women Care", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Stayfree Secure", "category": "Women Care", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Iodex Balm", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Fast Relief Spray", "category": "Pain Relief", "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400" },
  { "name": "Candid Cream", "category": "Skin Care", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Clotrimazole Cream", "category": "Skin Care", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Lactulose Syrup", "category": "Constipation", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Cremaffin Syrup", "category": "Constipation", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Ondem Tablet", "category": "Vomiting", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Emeset Tablet", "category": "Vomiting", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Albendazole", "category": "Deworming", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Zentel", "category": "Deworming", "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400" },
  { "name": "Rabeprazole", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Esomeprazole", "category": "Acidity", "image": "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=400" },
  { "name": "Cefixime 200", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Cephalexin", "category": "Antibiotic", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Insulin Glargine", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Heparin Injection", "category": "Injection", "image": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400" },
  { "name": "Tulsi Drops", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Giloy Tablets", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Chandraprabha Vati", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" },
  { "name": "Triphala Churna", "category": "Ayurvedic", "image": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=400" }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      console.error("MONGO_URL is NOT defined! ❌");
      process.exit(1);
    }
    console.log('Using connection:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing
    await Medicine.deleteMany({});
    console.log('Existing medicines cleared.');

    // Extend data
    const extendedData = medicinesData.map(med => ({
      ...med,
      brand: 'Shree Ram Special',
      genericName: med.name + ' Generic',
      composition: 'Standard Medical Formulation',
      manufacturer: 'Shree Ram Certified Labs',
      price: Math.floor(Math.random() * (1200 - 45 + 1)) + 45, // ₹45 to ₹1200
      discount: Math.floor(Math.random() * 31), // 0-30%
      stock: Math.random() > 0.1, // 90% in stock
      prescriptionRequired: Math.random() > 0.7, // 30% RX required
      mfgDate: '01/2024',
      expDate: '12/2026',
      shelfLife: '24 Months',
      description: `High-quality ${med.name} effectively used for treating ${med.category.toLowerCase()} related issues. Sourced from authorized channels in Runnisaidpur.`,
      uses: 'Provides rapid relief from symptoms, Supports recovery, Maintains health balance',
      dosage: 'Take as directed by your physician or 1 unit every 8 hours after meals',
      sideEffects: 'Mild nausea, Dizziness (Rare), Consult doctor if symptoms persist',
      warnings: 'Store in a cool dry place, Keep away from children, Do not exceed recommended dose',
      additionalImages: [med.image, med.image], // Duplicating for UI gallery
      ratings: {
        average: parseFloat((Math.random() * (5 - 3.8) + 3.8).toFixed(1)), // 3.8 to 5.0
        count: Math.floor(Math.random() * 500)
      }
    }));

    await Medicine.insertMany(extendedData);
    console.log(`Successfully seeded ${extendedData.length} medicines.`);
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
