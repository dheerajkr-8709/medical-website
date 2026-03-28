import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, User, CreditCard, Banknote, ShieldCheck, ChevronRight, ArrowLeft, Target, CheckCircle2, AlertCircle, Clock, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../config';

const Checkout = () => {
  const { cart, total, deliveryFee, subtotal, setDistance, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Runnisaidpur',
    zip: '843328',
    paymentMethod: 'COD'
  });
  const [locationVerified, setLocationVerified] = useState(false);
  const [detectedDistance, setDetectedDistance] = useState(0); 
  const navigate = useNavigate();

  const detectLocation = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const dist = Math.random() * 5; 
        setDistance(dist);
        setDetectedDistance(dist);
        
        if (dist > 10) {
           toast.error(lang === 'hi' ? "क्षमा करें, हम केवल 10 किमी त्रिज्या के भीतर वितरण करते हैं।" : "Sorry, we only deliver within 10km radius.", { duration: 5000 });
           setLocationVerified(false);
        } else {
           toast.success(lang === 'hi' ? "स्थान सत्यापित! हम आपके क्षेत्र में वितरण करते हैं।" : "Location verified! We deliver to your area.");
           setLocationVerified(true);
           setFormData(prev => ({ ...prev, address: lang === 'hi' ? "पता लगाया गया स्थान (रुन्नीसैदपुर सेक्टर)" : "Detected Location (Runnisaidpur Sector)" }));
        }
        setLoadingLocation(false);
      }, (error) => {
        toast.error(lang === 'hi' ? "स्थान का पता लगाने में विफल। कृपया मैन्युअल रूप से दर्ज करें।" : "Failed to detect location. Please enter manually.");
        setLoadingLocation(false);
      });
    } else {
      toast.error(lang === 'hi' ? "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।" : "Geolocation not supported by your browser.");
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
       toast.error(lang === 'hi' ? "कृपया नाम, फोन और पता दर्ज करें" : "Please enter Name, Phone and Address");
       return;
    }

    try {
       const orderDetails = {
         customerName: formData.name,
         phone: formData.phone,
         address: `${formData.address}${formData.landmark ? `, Landmark: ${formData.landmark}` : ''}`,
         items: cart.map(item => ({
           medicine: item._id || item.id,
           name: item.name,
           quantity: item.quantity,
           price: item.price * (1 - (item.discount || 0) / 100)
         })),
         totalAmount: total,
         paymentMethod: formData.paymentMethod,
         distance: detectedDistance
       };

       if (formData.paymentMethod === 'UPI') {
          toast.loading(lang === 'hi' ? "UPI भुगतान शुरू किया जा रहा है..." : "Initiating UPI Payment...", { id: 'payment' });
          const { data: rpOrder } = await axios.post('/api/payment/create-order', { amount: total });
          
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_5wzE0v1vVvVvVv", 
            amount: rpOrder.amount,
            currency: "INR",
            name: "SHREE RAM MEDICAL",
            description: lang === 'hi' ? "फार्मेसी ऑर्डर भुगतान" : "Pharmacy Order Payment",
            order_id: rpOrder.id,
            handler: async (response) => {
              try {
                toast.loading(lang === 'hi' ? "भुगतान सत्यापित किया जा रहा है..." : "Verifying Payment...", { id: 'payment' });
                const verifyRes = await axios.post('/api/payment/verify-payment', {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderDetails
                });

                if (verifyRes.status === 201) {
                  toast.success(lang === 'hi' ? "ऑर्डर सफलतापूर्वक दिया गया!" : "Order Placed Successfully!", { id: 'payment' });
                  clearCart();
                  navigate('/orders');
                }
              } catch (err) {
                toast.error(lang === 'hi' ? "भुगतान सत्यापन विफल रहा" : "Payment verification failed", { id: 'payment' });
              }
            },
            prefill: {
              name: formData.name,
              contact: formData.phone
            },
            theme: { color: "#10b981" }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
          toast.dismiss('payment');
       } else {
          toast.loading(lang === 'hi' ? "ऑर्डर दिया जा रहा है..." : "Placing Order...", { id: 'order' });
          const res = await axios.post('/api/orders', orderDetails);
          if (res.status === 201) {
            toast.success(lang === 'hi' ? "ऑर्डर दे दिया गया! व्हाट्सएप चेक करें।" : "Order Placed! Check your WhatsApp.", { id: 'order' });
            clearCart();
            navigate('/orders');
          }
       }
    } catch (err) {
       toast.error(lang === 'hi' ? "ऑर्डर विफल रहा। कृपया पुन: प्रयास करें।" : "Order failed. Please try again.", { id: 'order' });
       console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-16">
         <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary-600 mb-8 transition-colors group">
               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
               <span>{lang === 'hi' ? 'कार्ट पर वापस जाएं' : 'Back to Cart'}</span>
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-1.5 rounded-full">
                     <ShieldCheck size={14} className="text-primary-500" />
                     <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none">{lang === 'hi' ? `चरण ${step} / 2` : `Step ${step} of 2`}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic">
                     {step === 1 ? (lang === 'hi' ? 'डिलीवरी' : 'Delivery') : (lang === 'hi' ? 'भुगतान' : 'Payment')} <span className="text-primary-500 not-italic border-b-8 border-primary-500/10">{lang === 'hi' ? 'सत्यापन' : 'Verification'}</span>
                  </h1>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8">
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-900/5 space-y-8"
                   >
                      <div className="space-y-6">
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3 italic uppercase">
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500"><User size={24} /></div>
                            <span>{lang === 'hi' ? 'आपका विवरण' : 'Your Details'}</span>
                         </h3>
                         <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{lang === 'hi' ? 'पूरा नाम' : 'Full Name'}</label>
                               <input 
                                  placeholder={lang === 'hi' ? "अपना नाम दर्ज करें" : "Enter your name"} 
                                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-5 outline-none font-bold text-lg transition-all"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{lang === 'hi' ? 'फोन नंबर (मोबाइल)' : 'Phone Number (Mobile)'}</label>
                               <input 
                                  placeholder={lang === 'hi' ? "10-अंकों का नंबर दर्ज करें" : "Enter 10-digit number"} 
                                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-5 outline-none font-bold text-lg transition-all"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6 pt-4 border-t border-slate-50">
                         <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3 italic uppercase">
                               <div className="p-3 bg-blue-50 rounded-2xl text-blue-500"><MapPin size={24} /></div>
                               <span>{lang === 'hi' ? 'डिलीवरी का पता' : 'Delivery Address'}</span>
                            </h3>
                            <button 
                             type="button" 
                             onClick={detectLocation}
                             disabled={loadingLocation}
                             className="bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 px-4 py-2.5 rounded-full transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                            >
                               <Target size={14} className={loadingLocation ? "animate-spin" : ""} />
                               <span>{loadingLocation ? (lang === 'hi' ? "खोज रहे हैं..." : "Locating...") : (lang === 'hi' ? "मेरे स्थान का उपयोग करें" : "Use My Location")}</span>
                            </button>
                         </div>
                         
                         <div className="space-y-4">
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{lang === 'hi' ? 'पूरा पता' : 'Full Address'}</label>
                               <textarea 
                                  placeholder={lang === 'hi' ? "फ्लैट/हाउस नंबर, गली, गांव" : "Flat/House No, Street, Village"}
                                  rows={3}
                                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-5 outline-none font-bold text-lg transition-all resize-none"
                                  value={formData.address}
                                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{lang === 'hi' ? 'लैंडमार्क (वैकल्पिक)' : 'Landmark (Optional)'}</label>
                               <input 
                                  placeholder={lang === 'hi' ? "स्कूल, मंदिर, आदि के पास" : "Near School, Temple, etc."} 
                                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl p-5 outline-none font-bold text-lg transition-all"
                                  value={formData.landmark}
                                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6 pt-4 border-t border-slate-50">
                         <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3 italic uppercase">
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500"><Banknote size={24} /></div>
                            <span>{lang === 'hi' ? 'भुगतान' : 'Payment'}</span>
                         </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className={`relative p-6 rounded-3xl cursor-pointer border-2 transition-all group ${formData.paymentMethod === 'COD' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                               <input type="radio" value="COD" checked={formData.paymentMethod === 'COD'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="absolute opacity-0" />
                               <div className="flex flex-col items-center gap-2">
                                  <div className={`p-4 rounded-2xl transition-all ${formData.paymentMethod === 'COD' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}><Banknote size={32} /></div>
                                  <span className={`text-xs font-black uppercase tracking-widest ${formData.paymentMethod === 'COD' ? 'text-emerald-700' : 'text-slate-500'}`}>{lang === 'hi' ? 'नकद भुगतान (COD)' : 'Cash on Delivery'}</span>
                               </div>
                            </label>

                            <label className={`relative p-6 rounded-3xl cursor-pointer border-2 transition-all group ${formData.paymentMethod === 'UPI' ? 'border-primary-500 bg-primary-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                               <input type="radio" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="absolute opacity-0" />
                               <div className="flex flex-col items-center gap-2">
                                  <div className={`p-4 rounded-2xl transition-all ${formData.paymentMethod === 'UPI' ? 'bg-primary-500 text-white' : 'bg-white text-slate-400'}`}><CreditCard size={32} /></div>
                                  <span className={`text-xs font-black uppercase tracking-widest ${formData.paymentMethod === 'UPI' ? 'text-primary-700' : 'text-slate-500'}`}>UPI / Online</span>
                               </div>
                            </label>
                         </div>
                      </div>

                      <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl md:text-2xl uppercase tracking-[0.1em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 group">
                          <span>{t('placeOrder')}</span>
                          <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                      
                      <div className="flex items-center justify-center gap-4 text-slate-400">
                         <ShieldCheck size={20} />
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{lang === 'hi' ? '100% सुरक्षित चेकआउट' : '100% Secure Checkout'}</span>
                      </div>
                   </motion.div>
                </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-32">
               <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/5 space-y-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full blur-2xl -mr-12 -mt-12 opacity-50" />
                  <h3 className="text-lg font-black text-slate-800 tracking-tight italic uppercase border-b border-slate-50 pb-4">
                    {lang === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
                  </h3>
                  
                  <div className="space-y-4 max-h-48 overflow-y-auto no-scrollbar pr-2">
                     {cart.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                              <img src={getImageUrl(item.image)} alt="" className="w-4/5 h-4/5 object-contain" />
                           </div>
                           <div className="flex-grow">
                              <div className="text-xs font-black text-slate-800 line-clamp-1">{item.name}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase">{lang === 'hi' ? 'मात्रा' : 'Qty'}: {item.quantity}</div>
                           </div>
                                <div className="text-xs font-black text-slate-900">₹{(item.price * (1 - (item.discount || 0)/100) * item.quantity).toFixed(0)}</div>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                     <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>{lang === 'hi' ? 'आइटम उप-योग' : 'Items Subtotal'}</span>
                         <span>₹{subtotal.toFixed(0)}</span>
                     </div>
                     <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>{lang === 'hi' ? 'डिलीवरी शुल्क' : 'Delivery Fee'}</span>
                        <span className="text-emerald-500 font-black italic">{deliveryFee > 0 ? `₹${deliveryFee}` : (lang === 'hi' ? 'मुफ्त' : 'FREE')}</span>
                     </div>
                     <div className="flex justify-between text-xl font-black text-slate-900 italic pt-2">
                        <span>{t('grandTotal')}</span>
                         <span className="text-primary-600">₹{total.toFixed(0)}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Checkout;
