import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, User, Search, Grid, LayoutGrid, Package, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

const BottomNav = () => {
  const { cart } = useCart();
  const { t, lang } = useLanguage();
  const shopNumber = "919113766681";

  const navItems = [
    { to: '/', icon: <Home size={22} />, label: t('home') },
    { to: '/products', icon: <Search size={22} />, label: lang === 'hi' ? 'खोजें' : 'Search' },
    { to: '/cart', icon: <ShoppingCart size={22} />, label: t('cart'), badge: cart.length },
    { to: '/orders', icon: <Package size={22} />, label: t('orders') },
    { to: 'whatsapp', icon: <MessageSquare size={22} />, label: lang === 'hi' ? 'चैट' : 'Chat', isExternal: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-3 pb-4 animate-slide-up bg-transparent pointer-events-none">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] flex items-center justify-between p-1.5 shadow-2xl pointer-events-auto h-16 shadow-slate-200/50">
        {navItems.map((item, idx) => (
          item.isExternal ? (
            <a 
              key={idx}
              href={`https://wa.me/${shopNumber}?text=${encodeURIComponent(lang === 'hi' ? "नमस्ते, मैं श्री राम मेडिकल से दवा मंगाना चाहता हूँ" : "Hello, I want to order medicine from SHREE RAM MEDICAL")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-full relative transition-all duration-300 w-full text-emerald-600 font-bold"
            >
               <div className="relative">
                  {item.icon}
               </div>
               <span className="text-[8px] uppercase tracking-tighter mt-1 font-black">{item.label}</span>
            </a>
          ) : (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 rounded-full relative transition-all duration-300 w-full ${
                  isActive ? 'text-primary-500 font-black' : 'text-slate-400 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                   <div className={`relative ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'hover:scale-105'}`}>
                      {item.icon}
                      {item.badge > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[8px] font-black h-3.5 min-w-[0.85rem] p-0.5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                          {item.badge}
                        </span>
                      )}
                   </div>
                   <span className={`text-[8px] uppercase tracking-tighter mt-1 font-black transition-all ${isActive ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-0'}`}>{item.label}</span>
                   
                   {isActive && (
                     <motion.div 
                       layoutId="active-dot" 
                       className="absolute -bottom-1 w-1 h-1 bg-primary-500 rounded-full" 
                     />
                   )}
                </>
              )}
            </NavLink>
          )
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
