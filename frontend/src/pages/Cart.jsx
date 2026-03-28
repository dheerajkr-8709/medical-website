import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingBag, MapPin, ChevronRight, Zap, Info, Clock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../config';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, deliveryFee, total, distance } = useCart();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} ${lang === 'hi' ? 'कार्ट से हटाया गया' : 'removed from cart'}`, {
      icon: '🗑️',
      style: { borderRadius: '12px', background: '#334155', color: '#fff' },
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-50 animate-pulse" />
           <div className="relative bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-primary-500/10 border border-primary-50/50">
              <ShoppingBag size={80} className="text-primary-500 mx-auto" strokeWidth={1.5} />
           </div>
           <div className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-xl">
              <Plus size={24} />
           </div>
        </div>
        
        <h2 className="text-4xl font-black text-slate-800 leading-none tracking-tight mb-4 italic uppercase">
          {lang === 'hi' ? 'आपकी कार्ट' : 'Your Bag is'} <span className="text-primary-500">{lang === 'hi' ? 'खाली है' : 'Empty'}</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-sm mb-12 text-lg">
          {lang === 'hi' ? 'ऐसा लगता है कि आपने अभी तक कोई दवा नहीं जोड़ी है। आइए वह खोजें जिसकी आपको आवश्यकता है!' : "Looks like you haven't added any medicines yet. Let's find what you need!"}
        </p>
        
        <Link 
          to="/products"
          className="bg-primary-500 text-white px-10 py-5 rounded-[2.5rem] font-black text-lg flex items-center gap-4 shadow-2xl shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95 group"
        >
          <span>{t('continueShopping')}</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-16">
         <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-1.5 rounded-full">
                     <ShoppingCart size={14} className="text-primary-500" />
                     <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none">{lang === 'hi' ? 'सुरक्षित चेकआउट' : 'Checkout Securely'}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic">
                     {lang === 'hi' ? 'शॉपिंग' : 'Shopping'} <span className="text-primary-500 not-italic border-b-8 border-primary-500/10">{t('cart')}</span>
                  </h1>
               </div>
               <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="hidden sm:block text-right">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'hi' ? 'कुल योग' : 'Quick Total'}</div>
                     <div className="text-2xl font-black text-slate-900 leading-none">₹{total.toFixed(0)}</div>
                  </div>
                  <button onClick={() => navigate('/checkout')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 group hover:bg-primary-600 transition-all">
                     <span>{t('checkout')}</span>
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main List Column */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item, idx) => {
                const itemId = item.medicineId || item._id || item.id;
                const actualPrice = item.price * (1 - (item.discount || 0) / 100);
                return (
                  <motion.div
                    key={itemId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2.5rem] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl shadow-slate-900/5 relative group border border-transparent hover:border-primary-100 transition-all"
                  >
                    <div className="w-28 h-28 bg-slate-50 rounded-3xl flex items-center justify-center p-4 relative flex-shrink-0">
                       <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform" />
                       <div className="absolute -top-2 -left-2 bg-primary-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-white">
                          {lang === 'hi' ? 'सत्यापित' : 'Verified'}
                       </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-between py-1 text-center sm:text-left">
                       <div>
                          <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-1.5 block leading-none">{item.category}</span>
                          <h3 className="text-lg font-black text-slate-800 leading-tight mb-1">{item.name}</h3>
                          <p className="text-xs text-slate-400 font-semibold line-clamp-1 italic">{item.description}</p>
                       </div>

                       <div className="mt-4 sm:mt-6 flex flex-wrap sm:flex-row items-center justify-center sm:justify-between gap-6">
                           <div className="flex items-center bg-slate-900 rounded-2xl p-1.5 shadow-lg group-hover:shadow-primary-500/20 transition-all">
                              <button onClick={() => updateQuantity(itemId, item.quantity - 1)} className="p-2 text-white hover:text-primary-400"><Minus size={20} /></button>
                              <span className="px-5 text-white text-sm font-black min-w-[3rem] text-center tracking-widest">{item.quantity}</span>
                              <button onClick={() => updateQuantity(itemId, item.quantity + 1)} className="p-2 text-white hover:text-primary-400"><Plus size={20} /></button>
                           </div>

                           <div className="flex flex-col items-center sm:items-end">
                               {item.discount > 0 && <span className="text-[10px] text-slate-400 line-through font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>}
                               <span className="text-xl font-black text-slate-900 tracking-tight leading-none italic">₹{(actualPrice * item.quantity).toFixed(0)}</span>
                           </div>
                       </div>
                    </div>

                    <button onClick={() => handleRemove(itemId, item.name)} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                       <Trash2 size={24} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[3rem] h-32 flex items-center justify-center text-slate-400 hover:border-primary-200 transition-colors group cursor-pointer">
               <Link to="/products" className="flex items-center gap-3 font-black text-xs uppercase tracking-widest group-hover:text-primary-500">
                  <Plus size={20} />
                  <span>{lang === 'hi' ? 'और दवाइयाँ जोड़ें' : 'Add More Medicines'}</span>
               </Link>
            </div>
          </div>

          {/* Checkout Summary Column */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/5 border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-primary-50 rounded-2xl text-primary-500 ring-4 ring-primary-50/50"><MapPin size={24} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{lang === 'hi' ? 'डिलीवरी क्षेत्र' : 'Delivering Within'}</h4>
                    <span className="font-black text-slate-800 tracking-tight leading-none italic">{t('localStoreDesc')}</span>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">{lang === 'hi' ? 'कुल योग' : 'Subtotal'}</span>
                     <span className="text-slate-900 font-black">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <div className="flex items-center gap-2 group">
                        <span className="text-slate-500 font-bold">{lang === 'hi' ? 'डिलीवरी शुल्क' : 'Local Delivery'}</span>
                        <Info size={12} className="text-slate-300 group-hover:text-primary-500 cursor-help" />
                     </div>
                     <span className="text-emerald-500 font-black">{deliveryFee > 0 ? `₹${deliveryFee}` : (lang === 'hi' ? 'मुफ्त' : 'FREE')}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg pt-4 border-t-2 border-slate-100/50">
                     <span className="text-slate-900 font-black italic tracking-tight">{t('grandTotal')}</span>
                     <span className="text-2xl font-black text-primary-600 tracking-tighter leading-none">₹{total.toFixed(0)}</span>
                  </div>
               </div>

               <button onClick={() => navigate('/checkout')} className="w-full mt-8 bg-slate-900 hover:bg-primary-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 group">
                  <span>{t('placeOrder')}</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>

               <div className="mt-6 flex items-center justify-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 grayscale opacity-30" />
                  <div className="h-4 w-px bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{lang === 'hi' ? 'सुरक्षित भुगतान' : 'Pay Securely'}</span>
               </div>
            </div>

            {/* COD Check */}
            <div className="bg-amber-50 rounded-[2rem] p-6 border border-amber-100 flex items-center gap-4">
               <div className="p-3 bg-white rounded-xl text-amber-500 shadow-sm"><AlertCircle size={20} /></div>
               <div>
                  <h5 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5 leading-none">{lang === 'hi' ? 'स्थानीय सुविधा' : 'Local Feature'}</h5>
                  <span className="text-xs font-bold text-amber-600">{lang === 'hi' ? 'रुन्नीसैदपुर में कैश ऑन डिलीवरी उपलब्ध है।' : 'Cash on Delivery (COD) available within Runnisaidpur.'}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
