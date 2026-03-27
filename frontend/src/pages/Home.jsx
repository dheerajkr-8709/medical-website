import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Truck, ShieldCheck, Clock, MapPin, Package, Heart, Star, Sparkles, LayoutGrid, Zap, PhoneCall } from 'lucide-react';
import Banner from '../components/home/Banner';
import MedicineCard from '../components/home/MedicineCard';
import HomeSearchBar from '../components/home/HomeSearchBar';
import MedicineMarquee from '../components/home/MedicineMarquee';
import QuickActionButtons from '../components/home/QuickActionButtons';
import QuickOrder from '../components/home/QuickOrder';
import { DeliveryTrustSection, TrustBuildingSection } from '../components/home/TrustSections';
import { EmergencyModeSection, OffersSection } from '../components/home/EngagementSections';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const HeroCarousel = () => {
  const { lang } = useLanguage();
  const images = [
    { url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000", title: lang === 'hi' ? "प्राकृतिक जड़ी-बूटी" : "Natural Herbs" },
    { url: "https://images.unsplash.com/photo-1550572017-ed200f5e6343?auto=format&fit=crop&q=80&w=2000", title: lang === 'hi' ? "ऑर्गेनिक दवाएं" : "Organic Meds" },
    { url: "https://images.unsplash.com/photo-1563483783225-fd53262866ad?auto=format&fit=crop&q=80&w=2000", title: lang === 'hi' ? "शुद्ध फार्मेसी" : "Pure Pharmacy" },
    { url: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=2000", title: lang === 'hi' ? "हर्बल तेल" : "Herbal Oils" }
  ];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden group/carousel bg-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
           key={index}
           custom={direction}
           variants={variants}
           initial="enter"
           animate="center"
           exit="exit"
           className="absolute inset-0"
        >
          <img 
            src={images[index].url} 
            alt={images[index].title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-900/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 z-20 text-left">
             <div className="bg-emerald-500 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-3 shadow-xl border border-white/20 w-max">
                {lang === 'hi' ? '100% ऑर्गेनिक और प्राकृतिक' : '100% Organic & Natural'}
             </div>
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-white text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none drop-shadow-2xl"
             >
                {lang === 'hi' ? 'शुद्ध' : 'Pure'} <span className="text-emerald-300">{lang === 'hi' ? 'प्राकृतिक' : 'Natural'}</span> <br /> {lang === 'hi' ? 'उच्च शक्ति' : 'High Potency'}
             </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-10 z-30 flex gap-2">
         {images.map((_, i) => (
           <button 
             key={i} 
             onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} 
             className={`h-1.5 transition-all duration-500 rounded-full ${index === i ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40'}`} 
           />
         ))}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [featuredMedicines, setFeaturedMedicines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/medicines');
        if (res.data && res.data.length > 0) {
          setFeaturedMedicines(res.data.slice(0, 8));
        }
        setError(null);
      } catch (err) {
        console.error("Home Data Fetch Error:", err);
        setError("Unable to load medicines.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = lang === 'hi' ? [
    { name: 'बुखार और दर्द', icon: '💊', count: '45+' },
    { name: 'एंटीबायोटिक', icon: '🧪', count: '12+' },
    { name: 'आयुर्वेदिक', icon: '🌿', count: '8+' },
    { name: 'मधुमेह', icon: '🩸', count: '6+' },
    { name: 'बेबी केयर', icon: '👶', count: '10+' },
    { name: 'महिला देखभाल', icon: '🌸', count: '4+' },
  ] : [
    { name: 'Fever & Pain', icon: '💊', count: '45+' },
    { name: 'Antibiotic', icon: '🧪', count: '12+' },
    { name: 'Ayurvedic', icon: '🌿', count: '8+' },
    { name: 'Diabetes', icon: '🩸', count: '6+' },
    { name: 'Baby Care', icon: '👶', count: '10+' },
    { name: 'Women Care', icon: '🌸', count: '4+' },
  ];

  return (
    <div className="pb-24 bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      
      <QuickActionButtons />
      <MedicineMarquee />

      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 p-4 md:py-6">
        <HomeSearchBar />
      </div>

      <div className="relative pt-6 md:pt-12 pb-12 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-100"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>{lang === 'hi' ? 'रुन्नीसैदपुर की डिजिटल फार्मेसी' : "Runnisaidpur's Digital Pharmacy"}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
              >
                {lang === 'hi' ? 'आपका स्वास्थ्य,' : 'Your Health,'} <br />
                <span className="text-emerald-500 italic uppercase">{lang === 'hi' ? 'डिलीवरी तेज़।' : 'Delivered Fast.'}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed mx-auto md:mx-0"
              >
                {lang === 'hi' ? 'श्री राम मेडिकल की विश्वसनीय दवाएं। रुन्नीसैदपुर में मिनटों में डोर-स्टेप डिलीवरी पाएं।' : 'Trusted medicines from SHREE RAM MEDICAL. Get door-step delivery in minutes in Runnisaidpur.'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 flex-wrap justify-center md:justify-start pt-2"
              >
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 shadow-2xl transition-all active:scale-95 group uppercase tracking-widest"
                >
                  {t('order')}
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href="tel:+919113766681"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 shadow-2xl transition-all active:scale-95 group uppercase tracking-widest shadow-emerald-500/20"
                >
                  <PhoneCall size={20} />
                  {t('callNow')}
                </a>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 relative hidden md:block w-full max-w-xl mx-auto"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative z-10 w-full h-[450px] rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl bg-white">
                <HeroCarousel />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="py-8 bg-white border-y border-slate-100 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 md:grid md:grid-cols-6 md:gap-6 md:mx-0 md:px-0">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.95 }}
                className="min-w-[100px] md:min-w-0 bg-slate-50/50 rounded-[2rem] p-5 text-center cursor-pointer border border-transparent hover:border-emerald-100 hover:bg-emerald-50 transition-all group"
              >
                <div className="text-3xl mb-3 transform grup-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">{cat.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuickOrder />
      <OffersSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t('mustHave')}</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight italic uppercase">
                {lang === 'hi' ? 'सबसे ज्यादा' : 'Best'} <span className="text-emerald-500 not-italic border-b-8 border-emerald-500/10">{lang === 'hi' ? 'बिकने वाले' : 'Sellers'}</span>
              </h2>
            </div>
            <button onClick={() => navigate('/products')} className="text-xs font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest transition-colors flex items-center gap-2">{t('viewAll')} <ChevronRight size={14}/></button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-50 rounded-[2.5rem] p-5 animate-pulse h-80" />
              ))
            ) : featuredMedicines.map((med, idx) => (
              <MedicineCard key={med._id || idx} product={med} />
            ))}
          </div>
        </div>
      </section>

      <DeliveryTrustSection />
      <EmergencyModeSection />
      <TrustBuildingSection />
      <Banner />

    </div>
  );
};

export default Home;
