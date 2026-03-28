import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon, X, ShoppingBag, MessageSquare, Camera, ArrowRight, Star, ChevronDown, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import MedicineCard from '../components/home/MedicineCard';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const Products = () => {
  const { t, lang } = useLanguage();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const categoryList = [
    { id: 'All', key: 'catAll' },
    { id: 'Fever & Pain', key: 'catFever' },
    { id: 'Pain Relief', key: 'catPain' },
    { id: 'Cold & Allergy', key: 'catCold' },
    { id: 'Antibiotic', key: 'catAntibiotic' },
    { id: 'Acidity', key: 'catAcidity' },
    { id: 'Diabetes', key: 'catDiabetes' },
    { id: 'Blood Pressure', key: 'catBP' },
    { id: 'Cough Syrup', key: 'catCough' },
    { id: 'Ayurvedic', key: 'catAyurvedic' },
    { id: 'Baby Care', key: 'catBaby' },
    { id: 'Vitamins', key: 'catVitamins' },
    { id: 'Women Care', key: 'catWomen' },
    { id: 'Injection', key: 'catInjection' },
    { id: 'First Aid', key: 'catFirstAid' }
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/medicines');
        if (res.data && res.data.length > 0) {
          setMedicines(res.data);
        } else {
          setMedicines([]);
        }
      } catch (err) {
        console.error("Error fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const shopNumber = "919113766681";

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* Compact Header & Search */}
      <div className="bg-white border-b border-slate-100/80 sticky top-0 z-40 px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-2 md:mb-0">
               <ShoppingBag className="text-emerald-500" size={24} />
               <span>{t('pharmacyShelf').split(' ')[0]} <span className="text-emerald-500 italic">{t('pharmacyShelf').split(' ')[1]}</span></span>
            </h1>

            <div className="flex-grow max-w-xl relative group">
              <input 
                type="text" 
                placeholder={t('searchMedicines')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            </div>

            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <Grid size={18} />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                  <ListIcon size={18} />
               </button>
            </div>
          </div>

          {/* Scrollable Categories Bar */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
            {categoryList.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
                }`}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {t('showingResults')} <span className="text-slate-900">{filteredMedicines.length}</span> {t('resultsFound')} 
              {selectedCategory !== 'All' && <span> {t('inCategory')} <span className="text-primary-600">{t(categoryList.find(c => c.id === selectedCategory).key)}</span></span>}
           </h3>
           <div className="flex items-center gap-2 text-primary-600 text-xs font-bold bg-primary-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={12} />
              <span>{t('freeDeliveryOn')} ₹500+</span>
           </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white h-72 rounded-3xl animate-pulse flex flex-col p-6">
                 <div className="bg-slate-100 w-full h-40 rounded-2xl mb-4" />
                 <div className="bg-slate-100 w-4/5 h-4 rounded-full mb-2" />
                 <div className="bg-slate-100 w-2/5 h-4 rounded-full mt-auto" />
              </div>
            ))}
          </div>
        ) : medicines.length === 0 && !loading && !searchTerm ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
             <AlertTriangle size={64} className="mx-auto text-amber-500 mb-6" />
             <h2 className="text-3xl font-black text-slate-800 uppercase italic">Connection Issue</h2>
             <p className="text-slate-500 font-medium max-w-sm mx-auto mt-4">We are having trouble connecting to the medical inventory. Please check your internet or try again later.</p>
             <button onClick={() => window.location.reload()} className="mt-8 bg-emerald-500 text-white px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">Retry Connection</button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {filteredMedicines.length > 0 ? (
                <motion.div 
                  layout
                  className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
                >
                  {filteredMedicines.map((med) => (
                    <MedicineCard key={med.id || med._id} product={med} layout={viewMode} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center shadow-xl shadow-slate-900/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                  
                  <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center text-amber-500 mb-8 shadow-inner">
                    <AlertTriangle size={48} />
                  </div>
                  
                  <h2 className="text-3xl font-black text-slate-800 leading-none tracking-tight mb-4 italic uppercase">
                    {t('searchFailed').split(' ')[0]} <span className="text-slate-400 font-medium not-italic">{t('searchFailed').split(' ')[1]}</span>
                  </h2>
                  <p className="text-slate-500 font-medium max-w-sm mb-10 text-lg leading-relaxed">
                    {lang === 'hi' ? `हमें आपकी दवा हमारे स्टॉक में नहीं मिली।` : `We couldn't find "${searchTerm}" in our local inventory.`} {t('searchFailedDesc').split('. ')[1]}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <a 
                      href={`https://wa.me/${shopNumber}?text=Hello, I want to order medicine from SHREE RAM MEDICAL`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 active:scale-95 transition-all uppercase tracking-widest"
                    >
                      <MessageSquare size={24} />
                      <span>{t('contactOnWhatsApp')}</span>
                    </a>
                    <button 
                      onClick={() => navigate('/')}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest"
                    >
                       <Camera size={24} />
                       <span>{t('uploadPrescription')}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

    </div>
  );
};

export default Products;
