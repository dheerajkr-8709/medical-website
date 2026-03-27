import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin, Grid, Menu, X, Heart, Home, PhoneCall, Globe, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SearchBar from './SearchBar';

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
      >
        <Globe size={14} className="text-emerald-500" />
        <span>{lang === 'hi' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}</span>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 overflow-hidden p-1"
            >
              <button 
                onClick={() => { setLang('hi'); setShowDropdown(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${lang === 'hi' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                🇮🇳 हिंदी
              </button>
              <button 
                onClick={() => { setLang('en'); setShowDropdown(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${lang === 'en' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                🇬🇧 English
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { cart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showInactivityHighlight, setShowInactivityHighlight] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Inactivity Highlight Logic
  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      setShowInactivityHighlight(false);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (location.pathname !== '/') {
           setShowInactivityHighlight(true);
        }
      }, 8000); // 8 seconds of inactivity
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    // Initial highlight for 3 seconds
    const initialTimer = setTimeout(() => setIsInitialLoad(false), 3000);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(inactivityTimer);
      clearTimeout(initialTimer);
    };
  }, [location.pathname]);

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
       e.preventDefault();
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-4">
          
          {/* Logo & Shop Name */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
               <span className="text-white font-black text-lg">S</span>
            </div>
            <div className="hidden lg:flex flex-col">
               <span className="font-black text-slate-900 tracking-tight leading-none uppercase text-sm md:text-base">Shree Ram</span>
               <span className="text-[10px] font-black text-emerald-500 tracking-[0.2em] leading-none">Medical</span>
            </div>
          </Link>

          {/* Home Button - Desktop */}
          <div className="hidden md:block relative group">
            <Link 
              to="/" 
              onClick={handleHomeClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all relative ${
                location.pathname === '/' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-white border border-slate-100 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <Home size={18} />
              <span>{t('home')}</span>
              
              {/* Highlight Glow/Pulse */}
              {(showInactivityHighlight || isInitialLoad) && location.pathname !== '/' && (
                <motion.div 
                  layoutId="homeHighlight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-emerald-500/20 rounded-xl ring-4 ring-emerald-500/30 blur-sm pointer-events-none"
                />
              )}
            </Link>
          </div>

          {/* Desktop Search - Slimmer */}
          <div className="hidden md:flex flex-grow max-w-lg">
             <SearchBar />
          </div>

          {/* Desktop Actions - Cleaner */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-shrink-0">
            <Link to="/products" className="text-slate-500 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest transition-colors hidden xl:block">{t('medicines')}</Link>
            
            <a href="tel:+919113766681" className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl hover:bg-emerald-100 transition-colors hidden md:flex items-center gap-2 font-black text-[10px] uppercase">
               <PhoneCall size={18} />
               <span className="hidden lg:inline">91137 66681</span>
            </a>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
               <LanguageSwitcher />

               <Link to="/cart" className="relative group p-2 text-slate-500">
                 <ShoppingCart size={20} className="group-hover:text-emerald-600 transition-colors" />
                 {cart.length > 0 && (
                   <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">{cart.length}</span>
                 )}
               </Link>

               <Link to="/orders" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95">
                  {t('orders')}
               </Link>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/" className="p-2 text-slate-500">
               <Home size={22} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900">
               {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Simplified Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
               <SearchBar onSearchComplete={() => setIsOpen(false)} />
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { to: '/', icon: <Home />, label: t('home') },
                    { to: '/products', icon: <Grid />, label: t('medicines') },
                    { to: '/orders', icon: <ShoppingBag />, label: t('orders') },
                    { to: '/cart', icon: <ShoppingCart />, label: t('cart') },
                  ].map((item, i) => (
                    <Link key={i} to={item.to} onClick={() => setIsOpen(false)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all group ${
                      location.pathname === item.to ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-transparent text-slate-600 hover:bg-emerald-50 hover:border-emerald-100'
                    }`}>
                       <div className={`mb-2 ${location.pathname === item.to ? 'text-emerald-500' : 'text-slate-400 group-hover:text-emerald-500'}`}>{item.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </Link>
                  ))}
               </div>
               <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4 border border-emerald-100/50">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg"><MapPin size={20} /></div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">{lang === 'hi' ? 'डिलीवरी क्षेत्र' : 'Delivering At'}</span>
                     <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{t('localStoreDesc')}</span>
                  </div>
               </div>
               <a href="tel:+919113766681" className="flex items-center justify-center gap-3 bg-slate-900 text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                  <PhoneCall size={20} />
                  Call 91137 66681
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
