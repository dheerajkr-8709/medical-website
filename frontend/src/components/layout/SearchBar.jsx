import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({ onSearchComplete }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search API Call
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 0) {
        try {
          setLoading(true);
          const res = await axios.get(`/api/medicines/search?q=${query}`);
          setSuggestions(res.data);
          setShowDropdown(true);
          setActiveIndex(-1);
        } catch (err) {
          console.error("Search API Error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        // Show recent searches if query is empty and focused
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const saveToRecent = (searchTerm) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleSelect = (product) => {
    saveToRecent(product.name);
    setQuery('');
    setShowDropdown(false);
    navigate(`/products?search=${product.name}`);
    if (onSearchComplete) onSearchComplete();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex]);
      } else if (query.trim()) {
        saveToRecent(query);
        navigate(`/products?search=${query}`);
        setShowDropdown(false);
        if (onSearchComplete) onSearchComplete();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <b key={i} className="text-emerald-600">{part}</b> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative group">
        <input
          type="text"
          placeholder="Search for medicines (e.g. Paracetamol)..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-10 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
        
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
          >
            <X size={16} />
          </button>
        )}

        {loading && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (query.trim() || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[101]"
          >
            {/* Suggestions */}
            {query.trim().length > 0 ? (
              <div className="p-2 max-h-[400px] overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((item, idx) => (
                    <div
                      key={item._id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        activeIndex === idx ? 'bg-emerald-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-100" />
                      <div>
                        <div className="text-sm font-bold text-slate-800 leading-tight">
                          {highlightText(item.name, query)}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.category}</div>
                      </div>
                      <ArrowRight size={14} className={`ml-auto text-emerald-500 transition-transform ${activeIndex === idx ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                    </div>
                  ))
                ) : !loading && (
                  <div className="p-8 text-center space-y-4">
                    <div className="p-4 bg-rose-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-rose-500">
                       <ShoppingBag size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 italic uppercase">Medicine not found!</h4>
                      <p className="text-xs text-slate-400 mt-1">Don't worry, we can arrange it for you.</p>
                    </div>
                    <a 
                      href="https://wa.me/919113766681?text=Hello, I am looking for a medicine that is not on your website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // Recent Searches
              <div className="p-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recent Searches</h4>
                 <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          setQuery(s);
                          navigate(`/products?search=${s}`);
                          setShowDropdown(false);
                          if (onSearchComplete) onSearchComplete();
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-xs font-bold text-slate-600 transition-all border border-transparent hover:border-emerald-100"
                      >
                        {s}
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {/* Trending / Categories Pick */}
            <div className="bg-slate-50/50 p-4 border-t border-slate-100">
               <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trending Medicines</h4>
               </div>
               <div className="space-y-2">
                  {['Paracetamol', 'Dolo 650', 'Cough Syrup'].map((med, i) => (
                    <div key={i} onClick={() => { setQuery(med); navigate(`/products?search=${med}`); setShowDropdown(false); }} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 cursor-pointer p-1">
                       <Search size={12} className="text-slate-300" />
                       <span>{med}</span>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
