import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Package, Clock, MessageCircle, ChevronRight, Zap, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useLanguage } from '../../contexts/LanguageContext';

const HomeSearchBar = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularMedicines] = useState(['Dolo 650', 'Paracetamol', 'Crocin', 'Vicks', 'Allegra', 'Pantocid']);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (term) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      saveSearch(transcript);
    };
    recognition.start();
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`/api/medicines/search?q=${query}`);
        setSuggestions(res.data.slice(0, 8));
        setShowDropdown(true);
      } catch (err) {
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const highlightMatch = (text, term) => {
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={i} className="text-emerald-600 font-black">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={dropdownRef}>
      <div className="relative group">
        <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${query ? 'text-emerald-500' : 'text-slate-400'}`} size={20} />
        <input
          type="text"
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-5 pl-14 pr-24 text-sm md:text-base font-bold shadow-2xl shadow-slate-900/5 focus:ring-4 ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none md:scale-105"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button 
            onClick={startVoiceSearch}
            className={`p-3 rounded-full transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            <Mic size={20} className={isListening ? 'animate-bounce' : ''} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Recent & Popular if query is short */}
            {query.length < 2 && (
              <div className="p-6 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                        <Clock size={12} /> {t('recentSearches')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => { setQuery(s); saveSearch(s); }}
                          className="bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-100 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                     <Zap size={12} /> {t('popularMedicines')}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {popularMedicines.map((s, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => { setQuery(s); saveSearch(s); }}
                        className="bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-black border border-emerald-100 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="p-4 bg-slate-50/50 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Top Results</span>
              {loading && <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent animate-spin rounded-full" />}
            </div>

            <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
              {suggestions.length > 0 ? (
                suggestions.map((med) => (
                  <button
                    key={med._id}
                    onClick={() => {
                      navigate(`/product/${med._id}`);
                      setShowDropdown(false);
                      setQuery('');
                    }}
                    className="w-full flex items-center gap-5 p-4 hover:bg-emerald-50/50 transition-colors text-left border-b border-slate-50 last:border-none group"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 p-2 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                       <img 
                         src={med.image} 
                         className="w-full h-full object-contain" 
                         onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=MEDICA'}
                       />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors">
                        {highlightMatch(med.name, query)}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 flex items-center gap-3">
                         <span className="bg-slate-100 px-2 py-0.5 rounded-md">{med.category}</span>
                         {med.discount > 0 && <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">SAVE {med.discount}%</span>}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))
              ) : (
                <div className="p-10 text-center">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Zap size={32} />
                   </div>
                   <h5 className="font-black text-slate-900 italic uppercase">{t('medicineNotFound')}</h5>
                   <p className="text-xs font-medium text-slate-400 mb-6">We might have it in the offline inventory.</p>
                   <button 
                     onClick={() => window.open(`https://wa.me/919113766681?text=Hello, I am looking for ${query} which is not on the website.`, '_blank')}
                     className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 mx-auto shadow-xl"
                   >
                     <MessageCircle size={18} />
                     {t('findOnWhatsApp')}
                   </button>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-900 text-white text-center">
               <button 
                 onClick={() => navigate('/products')}
                 className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-400 transition-colors flex items-center gap-2 justify-center mx-auto"
               >
                  {t('viewAllMedicines')} <ChevronRight size={14} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeSearchBar;
