import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle2, MoreVertical, Search, Filter, Clock, MapPin, ChevronRight, LayoutGrid, RotateCcw, MessageSquare, Star, Zap, ShoppingBag, Phone, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error(lang === 'hi' ? "कृपया अपना फोन नंबर दर्ज करें" : "Please enter your phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/orders?phone=${phoneNumber}`);
      setOrders(res.data);
      setSearched(true);
    } catch (err) {
      toast.error(lang === 'hi' ? "इस नंबर के लिए ऑर्डर नहीं मिल सके" : "Could not find orders for this number");
    } finally {
      setLoading(false);
    }
  };

  const getStatusPhase = (status) => {
    switch (status) {
      case 'Placed': return 1;
      case 'Packed': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const shopNumber = "919113766681";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-16">
         <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-1.5 rounded-full">
                     <Package size={14} className="text-primary-500" />
                     <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none">{t('trackStatusText')}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic uppercase">
                     {t('trackByMobile').split(' ')[0]} <span className="text-primary-500 not-italic border-b-8 border-primary-500/10">{t('trackByMobile').split(' ')[1]}</span>
                  </h1>
               </div>
               
               <form onSubmit={handleSearch} className="flex-grow max-w-md relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                     <Phone size={20} />
                  </div>
                  <input 
                    type="tel"
                    placeholder={t('enterPhone')}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-100 border-none rounded-2xl py-5 pl-12 pr-32 text-sm font-black focus:ring-4 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
                  />
                  <button type="submit" className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-600 transition-all active:scale-95 uppercase">
                     {t('findOrder')}
                  </button>
               </form>
            </div>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
        {loading ? (
          <div className="space-y-6">
            {[1,2].map(i => <div key={i} className="bg-white h-48 rounded-[2.5rem] animate-pulse" />)}
          </div>
        ) : searched ? (
           orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-slate-900/5 relative overflow-hidden group border border-transparent hover:border-primary-100 transition-all"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                   
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-50">
                      <div className="space-y-2">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block leading-none">
                            {t('orderId')}: #{order._id.slice(-6)}
                         </span>
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none italic uppercase">
                            {order.status === 'Placed' ? t('statusPlaced') : 
                             order.status === 'Packed' ? t('statusPacked') : 
                             order.status === 'Out for Delivery' ? t('statusOut') : 
                             order.status === 'Delivered' ? t('statusDelivered') : order.status}
                         </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                             <div className="flex items-center gap-2"><Clock size={14} /> <span>{t('placedOn')} {new Date(order.createdAt).toLocaleDateString()}</span></div>
                             <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                                {order.paymentMethod === 'UPI' ? (order.paymentStatus === 'Paid' ? `★ ${t('verifiedPayment')}` : t('upiPending')) : t('payOnDelivery')}
                             </div>
                             <div className="flex items-center gap-2 text-primary-600"><Truck size={14} /> <span>{t('rapidDelivery')}</span></div>
                          </div>
                      </div>
                      <div className="flex items-center gap-4">
                          <button 
                            onClick={() => window.open(`https://wa.me/${shopNumber}?text=Hello, I want to track my order #${order._id.slice(-6)}. What is the live status?`, '_blank')}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 group transition-all hover:bg-primary-600"
                          >
                             {t('trackLive')}
                          </button>
                      </div>
                   </div>

                   <div className="py-10">
                      <div className="relative flex justify-between">
                         <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(getStatusPhase(order.status) / 4) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-primary-500 shadow-lg shadow-primary-500/50" 
                            />
                         </div>
                         
                         {[
                           { icon: <ShoppingBag size={18} />, label: t('statusPlaced') },
                           { icon: <Package size={18} />, label: t('statusPacked') },
                           { icon: <Truck size={18} />, label: t('statusOut') },
                           { icon: <CheckCircle2 size={18} />, label: t('statusDelivered') }
                         ].map((item, sIdx) => {
                           const currentPhase = sIdx + 1;
                           const completed = currentPhase <= getStatusPhase(order.status);
                           return (
                               <div key={sIdx} className="relative z-10 flex flex-col items-center gap-3">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${completed ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/30' : 'bg-slate-50 text-slate-300 border-2 border-slate-100'}`}>
                                     {completed ? <CheckCircle2 size={18} /> : item.icon}
                                  </div>
                                  <span className={`text-[10px] font-black uppercase tracking-widest ${completed ? 'text-primary-600' : 'text-slate-300'}`}>{item.label}</span>
                               </div>
                           );
                         })}
                      </div>
                   </div>

                   <div className="bg-slate-50 p-6 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                         <div className="text-sm font-black text-slate-800 leading-tight">
                            {t('includesItems')} {order.items.length} {t('items')} <span className="text-slate-400 font-bold block whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{order.items.map(i => i.name).join(', ')}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{t('orderTotal')}</span>
                             <span className="text-2xl font-black text-slate-900 tracking-tighter italic">₹{Number(order.totalAmount).toFixed(0)}</span>
                         </div>
                         <ChevronRight className="text-slate-300 group-hover:text-primary-500 transition-all group-hover:translate-x-1" size={24} />
                      </div>
                   </div>

                   <div className="mt-8 flex items-center justify-center gap-6">
                      <button onClick={() => window.open(`https://wa.me/${shopNumber}?text=Checking on order #${order._id.slice(-6)}`, '_blank')} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-emerald-500 transition-colors">
                         <MessageSquare size={14} />
                         <span>{t('whatsappPharmacist')}</span>
                      </button>
                   </div>
                </motion.div>
              ))}
            </div>
           ) : (
            <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-100">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <AlertCircle size={40} />
               </div>
               <h3 className="text-2xl font-black text-slate-800 italic uppercase mb-2">{t('noOrdersFound')}</h3>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{lang === 'hi' ? 'अपने फोन नंबर की पुष्टि करें या दूसरा नंबर प्रयास करें।' : 'Verify your phone number or try another one.'}</p>
            </div>
           )
        ) : (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl shadow-slate-900/5">
             <div className="w-24 h-24 bg-primary-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary-500 shadow-inner">
                <Search size={48} />
             </div>
             <h2 className="text-3xl font-black text-slate-800 italic uppercase mb-4 tracking-tight">
                {t('readyToTrack').split(' ')[0]} <span className="text-primary-500">{t('readyToTrack').split(' ').slice(1).join(' ')}</span>
             </h2>
             <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">{t('trackPromo')}</p>
          </div>
        )}

        <div className="mt-20 flex flex-col items-center">
           <Link to="/products" className="group bg-slate-100 hover:bg-slate-200 text-slate-700 px-10 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all flex items-center gap-4 shadow-lg shadow-slate-900/5 uppercase">
              <span>{t('continueShopping')}</span>
              <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
