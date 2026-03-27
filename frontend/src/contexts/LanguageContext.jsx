import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navbar
    home: "Home",
    medicines: "Medicines",
    orders: "Orders",
    cart: "Cart",
    about: "About",
    contact: "Contact",
    
    // Search
    searchPlaceholder: "Search for Medicines (e.g. Paracetamol...)",
    voiceSearchTitle: "Speak now to search",
    voiceSearchError: "Voice search not supported",
    recentSearches: "Recent Searches",
    popularMedicines: "Popular Medicines",
    medicineNotFound: "Medicine Not Found",
    findOnWhatsApp: "Find on WhatsApp",
    viewAllMedicines: "View All 200+ Medicines",
    showingResults: "Showing",
    resultsFound: "results",
    inCategory: "in",
    freeDeliveryOn: "Free Delivery on",
    pharmacyShelf: "Pharmacy Shelf",
    searchMedicines: "Search medicines...",
    searchFailed: "Search Failed",
    searchFailedDesc: "We couldn't find your medicine in our local inventory. Our pharmacist can suggest substitutes.",
    contactOnWhatsApp: "Contact on WhatsApp",
    rxRequired: "RX Required",
    noPrescription: "No Prescription",
    composition: "Composition",
    expiry: "Expiry",
    status: "Status",
    buyNow: "Buy Now",
    medicalDescription: "Medical Description",
    mainUses: "Main Uses",
    sideEffects: "Side Effects",
    askPharmacist: "Ask Pharmacist on WhatsApp",
    ratingsReviews: "Ratings & Reviews",
    backToHome: "Back to Home",
    backToPharmacy: "Back to Pharmacy",
    trackByMobile: "Track By Mobile",
    trackStatusText: "Order Tracking System",
    enterPhone: "Enter Phone Number...",
    findOrder: "Find Order",
    orderId: "Order ID",
    placedOn: "Placed on",
    verifiedPayment: "Verified Payment",
    upiPending: "UPI Pending",
    payOnDelivery: "Pay on Delivery",
    rapidDelivery: "Rapid Delivery Enabled",
    trackLive: "Track Live",
    includesItems: "Includes",
    orderTotal: "Order Total",
    whatsappPharmacist: "WhatsApp Pharmacist",
    noOrdersFound: "No Orders Found",
    readyToTrack: "Ready to Track?",
    trackPromo: "Enter the phone number used during checkout to track your active orders.",
    statusPlaced: "Placed",
    statusPacked: "Packed",
    statusOut: "Out",
    statusDelivered: "Delivered",
    userAccess: "User Access",
    secureOtp: "Secure OTP Verification",
    welcomeToStore: "Welcome to Shree Ram Medical",
    phoneNumber: "Phone Number",
    getOtp: "Get Magic OTP",
    sendingRequest: "Sending Request...",
    enterCode: "ENTER 6-DIGIT CODE",
    didntReceive: "Didn't receive?",
    changeNumber: "Change Number",
    verifyContinue: "Verify & Continue",
    authenticating: "Authenticating...",
    safeSecuredSync: "Safe & Secured Pharmacy Sync",
    myOrders: "My Orders",
    savedAddresses: "Saved Addresses",
    prescriptions: "Prescriptions",
    wishlist: "Wishlist",
    accountSync: "Account Sync",
    terminalSession: "Terminal Session",
    medicalElite: "Medical Elite",
    privilegeStatus: "Privilege Status",
    pointsSync: "Points Sync",
    activeWarehouseAddress: "Active Warehouse Address",
    modify: "Modify",
    digitalNotifications: "Digital Notifications",
    orderUpdates: "Order Updates",
    offersRefills: "Offers & Refills",
    
    // Quick Actions
    whatsappOrder: "Order on WhatsApp",
    callNow: "Call Now",
    needHelp: "Need Help?",
    
    // Prescription Section
    uploadPrescription: "Upload Prescription",
    submitNow: "Submit Now",
    changePhoto: "Change Photo",
    selectPrescription: "Select Prescription",
    whatsappHelp: "WhatsApp Help",
    uploadSuccess: "Submission Confirmed!",
    uploadSuccessDesc: "Our pharmacist will call you shortly to confirm your order.",
    submitAnotherPrescription: "Submit Another Prescription",
    pharmaInfo: "Professional Pharmacy Service",
    pharmaCallInfo: "Phone Number for Pharmacist Call",
    dropHint: "Drop Prescription Here",
    clickSelectHint: "or click the select button on the left",
    
    // Emergency Section
    emergencyTitle: "MEDICAL EMERGENCY?",
    emergencyWait: "DON'T WAIT.",
    callPriority: "Call Emergency Priority",
    whatsappPriority: "WhatsApp Priority Line",
    
    // Trust Sections
    fastDelivery: "30-60 Mins",
    fastDeliveryDesc: "Fastest Delivery in Town",
    localStore: "Within 10km",
    localStoreDesc: "Local Sitamarhi Store",
    genuineMeds: "100% Genuine",
    genuineMedsDesc: "Original Quality Meds",
    bigSavings: "Big Savings",
    bigSavingsDesc: "Up to 30% Discount",
    certPharmacist: "Certified Pharmacist",
    readyGuidance: "Always Ready For Guidance.",
    pharmaGuideDesc: "No need to visit the clinic for simple guidance.",
    connectNow: "Connect Now",
    storeLocation: "Store Location",
    runnisaidpur: "Runnisaidpur",
    addressShort: "Main Road, Runnisaidpur, Bihar 843328",
    addressLong: "Madhopur Sultanpur, District Runnisaidpur, Bihar - 843328",
    
    // Categories
    catAll: "All",
    catFever: "Fever & Pain",
    catPain: "Pain Relief",
    catCold: "Cold & Allergy",
    catAntibiotic: "Antibiotic",
    catAcidity: "Acidity",
    catDiabetes: "Diabetes",
    catBP: "Blood Pressure",
    catCough: "Cough Syrup",
    catAyurvedic: "Ayurvedic",
    catBaby: "Baby Care",
    catVitamins: "Vitamins",
    catWomen: "Women Care",
    catInjection: "Injection",
    catFirstAid: "First Aid",
    
    // Products
    bestSellers: "Best Sellers",
    mustHave: "Must Have Items",
    viewAll: "View All",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    saveMsg: "SAVE",
    
    // Cart / Checkout
    checkout: "Checkout",
    grandTotal: "Grand Total",
    items: "Items",
    placeOrder: "Place Order",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    
    // Admin
    manageOrders: "Manage Orders",
    liveMonitor: "LIVE MONITOR: ACTIVE"
  },
  hi: {
    // Navbar
    home: "होम",
    medicines: "दवाइयाँ",
    orders: "ऑर्डर",
    cart: "कार्ट",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    
    // Search
    searchPlaceholder: "दवाई खोजें (जैसे: पैरासिटामोल...)",
    voiceSearchTitle: "खोजने के लिए बोलें",
    voiceSearchError: "वॉइस सर्च इस ब्राउज़र में काम नहीं करता",
    recentSearches: "हाल ही की खोज",
    popularMedicines: "लोकप्रिय दवाइयाँ",
    medicineNotFound: "दवाई नहीं मिली",
    findOnWhatsApp: "WhatsApp पर खोजें",
    viewAllMedicines: "सभी 200+ दवाइयाँ देखें",
    showingResults: "दिखा रहे हैं",
    resultsFound: "परिणाम",
    inCategory: "में",
    freeDeliveryOn: "मुफ्त डिलीवरी",
    pharmacyShelf: "फार्मेसी शेल्फ",
    searchMedicines: "दवाइयाँ खोजें...",
    searchFailed: "खोज विफल रही",
    searchFailedDesc: "हमें आपकी दवा हमारे स्थानीय स्टॉक में नहीं मिली। हमारे फार्मासिस्ट विकल्प सुझा सकते हैं।",
    contactOnWhatsApp: "WhatsApp पर संपर्क करें",
    rxRequired: "पर्चे की आवश्यकता",
    noPrescription: "पर्चे की जरूरत नहीं",
    composition: "संरचना",
    expiry: "वैधता",
    status: "स्थिति",
    buyNow: "अभी खरीदें",
    medicalDescription: "चिकित्सा विवरण",
    mainUses: "मुख्य उपयोग",
    sideEffects: "दुष्प्रभाव",
    askPharmacist: "WhatsApp पर फार्मासिस्ट से पूछें",
    ratingsReviews: "रेटिंग और समीक्षाएं",
    backToHome: "होम पर वापस",
    backToPharmacy: "फार्मेसी पर वापस",
    trackByMobile: "मोबाइल से ट्रैक करें",
    trackStatusText: "ऑर्डर ट्रैकिंग सिस्टम",
    enterPhone: "फोन नंबर दर्ज करें...",
    findOrder: "ऑर्डर खोजें",
    orderId: "ऑर्डर आईडी",
    placedOn: "ऑर्डर दिया गया",
    verifiedPayment: "सत्यापित भुगतान",
    upiPending: "UPI पेंडिंग",
    payOnDelivery: "डिलीवरी पर भुगतान",
    rapidDelivery: "सुपरफास्ट डिलीवरी चालू",
    trackLive: "लाइव ट्रैक करें",
    includesItems: "शामिल हैं",
    orderTotal: "कुल ऑर्डर",
    whatsappPharmacist: "WhatsApp फार्मासिस्ट",
    noOrdersFound: "कोई ऑर्डर नहीं मिला",
    readyToTrack: "ट्रैक करने के लिए तैयार?",
    trackPromo: "अपने सक्रिय ऑर्डर और लाइव स्थिति देखने के लिए चेकआउट के दौरान उपयोग किया गया फोन नंबर दर्ज करें।",
    statusPlaced: "सफल",
    statusPacked: "पैक्ड",
    statusOut: "निकला",
    statusDelivered: "पहुंचा",
    userAccess: "यूजर लॉगिन",
    secureOtp: "सुरक्षित OTP सत्यापन",
    welcomeToStore: "श्री राम मेडिकल में आपका स्वागत है",
    phoneNumber: "फोन नंबर",
    getOtp: "OTP प्राप्त करें",
    sendingRequest: "अनुरोध भेजा जा रहा है...",
    enterCode: "6-अंकों का कोड दर्ज करें",
    didntReceive: "प्राप्त नहीं हुआ?",
    changeNumber: "नंबर बदलें",
    verifyContinue: "सत्यापित करें",
    authenticating: "प्रमाणित किया जा रहा है...",
    safeSecuredSync: "सुरक्षित और प्रमाणित फार्मेसी सिंक",
    myOrders: "मेरे ऑर्डर",
    savedAddresses: "सहेजे गए पते",
    prescriptions: "पर्चे (RX)",
    wishlist: "पसंदीदा",
    accountSync: "खाता सिंक",
    terminalSession: "लॉग आउट करें",
    medicalElite: "मेडिकल एलिट",
    privilegeStatus: "विशेषाधिकार स्थिति",
    pointsSync: "पॉइंट्स सिंक",
    activeWarehouseAddress: "सक्रिय गोदाम का पता",
    modify: "सुधारें",
    digitalNotifications: "डिजिटल सूचनाएं",
    orderUpdates: "ऑर्डर अपडेट",
    offersRefills: "ऑफर और रिफिल",
    
    // Quick Actions
    whatsappOrder: "WhatsApp पर ऑर्डर दें",
    callNow: "अभी कॉल करें",
    needHelp: "मदद चाहिए?",
    
    // Prescription Section
    uploadPrescription: "पर्चा अपलोड करें",
    submitNow: "अभी सबमिट करें",
    changePhoto: "फोटो बदलें",
    selectPrescription: "पर्चा चुनें",
    whatsappHelp: "WhatsApp मदद",
    uploadSuccess: "सफलतापूर्वक भेजा गया!",
    uploadSuccessDesc: "हमारे फार्मासिस्ट जल्द ही आपके ऑर्डर के लिए कॉल करेंगे।",
    submitAnotherPrescription: "दूसरा पर्चा सबमिट करें",
    pharmaInfo: "प्रोफेशनल फार्मेसी सेवा",
    pharmaCallInfo: "फार्मासिस्ट कॉल के लिए नंबर",
    dropHint: "पर्चा यहाँ छोड़ें",
    clickSelectHint: "या बाईं ओर के बटन पर क्लिक करें",
    
    // Emergency Section
    emergencyTitle: "मेडिकल इमरजेंसी?",
    emergencyWait: "देर न करें।",
    callPriority: "इमरजेंसी कॉल करें",
    whatsappPriority: "WhatsApp इमरजेंसी लाइन",
    
    // Trust Sections
    fastDelivery: "30-60 मिनट",
    fastDeliveryDesc: "शहर में सबसे तेज़ डिलीवरी",
    localStore: "10 किमी के भीतर",
    localStoreDesc: "लोकल सीतामढ़ी स्टोर",
    genuineMeds: "100% असली",
    genuineMedsDesc: "ओरिजिनल क्वालिटी दवाइयाँ",
    bigSavings: "बड़ी बचत",
    bigSavingsDesc: "30% तक छूट",
    certPharmacist: "प्रमाणित फार्मासिस्ट",
    readyGuidance: "सलाह के लिए हमेशा तैयार।",
    pharmaGuideDesc: "छोटी सलाह के लिए क्लिनिक जाने की जरूरत नहीं।",
    connectNow: "अभी जुड़ें",
    storeLocation: "स्टोर लोकेशन",
    runnisaidpur: "रुन्नीसैदपुर",
    addressShort: "मेन रोड, रुन्नीसैदपुर, बिहार 843328",
    addressLong: "माधोपुर सुल्तानपुर, जिला रुन्नीसैदपुर, बिहार - 843328",

    // Categories
    catAll: "सभी",
    catFever: "बुखार और दर्द",
    catPain: "दर्द से राहत",
    catCold: "सर्दी और एलर्जी",
    catAntibiotic: "एंटीबायोटिक",
    catAcidity: "एसिडिटी",
    catDiabetes: "मधुमेह",
    catBP: "ब्लड प्रेशर",
    catCough: "खांसी की दवाई",
    catAyurvedic: "आयुर्वेदिक",
    catBaby: "बेबी केयर",
    catVitamins: "विटामिन",
    catWomen: "महिला देखभाल",
    catInjection: "इंजेक्शन",
    catFirstAid: "प्राथमिक चिकित्सा",
    
    // Products
    bestSellers: "सबसे ज्यादा बिकने वाले",
    mustHave: "जरूरी आइटम",
    viewAll: "सभी देखें",
    addToCart: "कार्ट में जोड़ें",
    outOfStock: "स्टॉक में नहीं है",
    saveMsg: "बचत",
    
    // Cart / Checkout
    checkout: "चेकआउट",
    grandTotal: "कुल योग",
    items: "आइटम",
    placeOrder: "ऑर्डर दें",
    emptyCart: "आपकी कार्ट खाली है",
    continueShopping: "खरीदारी जारी रखें",
    
    // Admin
    manageOrders: "ऑर्डर प्रबंधित करें",
    liveMonitor: "लाइव मॉनिटर: चालू"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'hi');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
