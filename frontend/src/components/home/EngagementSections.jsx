import React from 'react';
import { motion } from 'framer-motion';
import { Zap, PhoneCall, MessageCircle, AlertCircle, HeartPulse, Sparkles, Gift, Truck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const EmergencyModeSection = () => {
  const { t, lang } = useLanguage();
  const emergencyText = t('emergencyTitle') + " " + t('emergencyWait');
  const words = emergencyText.split(" ");
  
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-br from-rose-600 via-orange-600 to-rose-900 rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-[0_50px_100px_rgba(225,29,72,0.3)]">
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-400/20 blur-[100px] rounded-full animate-pulse delay-700" />
        
        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-10 right-20 text-white/10 hidden lg:block"
        >
          <HeartPulse size={120} strokeWidth={1} />
        </motion.div>

        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute bottom-10 left-20 text-white/5 hidden lg:block"
        >
          <Truck size={100} strokeWidth={1} />
        </motion.div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          {/* Animated Heartbeat Circle */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-ping" />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-40 h-40 md:w-56 md:h-56 bg-white/10 backdrop-blur-md p-4 rounded-full border-4 border-white/30 flex items-center justify-center relative z-10 shadow-2xl"
            >
               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-rose-600 shadow-inner">
                  <HeartPulse size={80} className="animate-beat drop-shadow-lg" />
               </div>
            </motion.div>
          </div>
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white text-rose-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl border-b-4 border-rose-100"
            >
               <div className="w-2 h-2 bg-rose-600 rounded-full animate-ping" />
               <span>{lang === 'hi' ? 'प्राथमिकता सेवा सक्रिय' : 'Priority Support Active'}</span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">
              {words.map((word, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="inline-block mr-4"
                >
                  {word.includes('EMERGENCY') || word.includes('इमरजेंसी') ? <span className="text-orange-300 not-italic">{word}</span> : word}
                </motion.span>
              ))}
            </h2>

            <p className="text-rose-50 text-xl font-medium max-w-xl leading-relaxed opacity-90">
              {lang === 'hi' ? '20-30 मिनट के भीतर तत्काल जीवन रक्षक दवा वितरण। हमारे मुख्य फार्मासिस्ट आपके कॉल के लिए तैयार हैं।' : 'Immediate life-saving medication delivery within 20-30 minutes. Our head pharmacist is on standby for your call.'}
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919113766681" 
                className="bg-white text-rose-600 px-12 py-6 rounded-[2.5rem] font-black flex items-center gap-4 shadow-2xl transition-all text-2xl uppercase tracking-tighter"
              >
                 <PhoneCall size={32} />
                 {t('callPriority')}
              </motion.a>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`https://wa.me/919113766681?text=EMERGENCY: I need medicine immediately. Please respond!`, '_blank')}
                className="bg-slate-900 text-white px-10 py-6 rounded-[2.5rem] border-2 border-white/20 font-black flex items-center gap-4 transition-all uppercase text-sm tracking-[0.2em] shadow-2xl"
              >
                 <MessageCircle size={24} fill="currentColor" />
                 {t('whatsappPriority')}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Glow Effect Footnote */}
        <div className="absolute bottom-6 right-10 flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-widest">
           <Zap size={12} fill="currentColor" />
           <span>{lang === 'hi' ? 'रुन्नीसैदपुर इमरजेंसी स्क्वाड' : 'Runnisaidpur Emergency Squad'}</span>
        </div>
      </div>
    </section>
  );
};

export const OffersSection = () => {
  const { t, lang } = useLanguage();
  
  const offers = [
    { 
      title: lang === 'hi' ? 'प्रथम ऑर्डर छूट' : "First Order Discount", 
      desc: lang === 'hi' ? 'हमारे स्टोर से पहले ऑर्डर पर फ्लैट 20% की छूट पाएं।' : "Get Flat 20% OFF on your very first order from our store.", 
      code: "RAM20", 
      color: "bg-emerald-500" 
    },
    { 
      title: lang === 'hi' ? 'नियमित ग्राहक' : "Repeat Customer", 
      desc: lang === 'hi' ? '1000 रुपये से अधिक के हर नियमित ऑर्डर पर फ्लैट 100 रुपये कैशबैक।' : "Enjoy Flat ₹100 Cashback on every repeat order above ₹1000.", 
      code: "REAP100", 
      color: "bg-blue-500" 
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
       <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight italic uppercase">
            {lang === 'hi' ? 'विशेष' : 'Exclusive'} <span className="text-emerald-500">{lang === 'hi' ? 'ऑफ़र' : 'Offers'}</span>
          </h2>
          <div className="hidden sm:block h-1 w-32 bg-slate-100 rounded-full" />
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {offers.map((offer, idx) => (
             <motion.div 
               key={idx}
               whileHover={{ scale: 1.02 }}
               className={`${offer.color} rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200/5 group`}
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 text-white/5 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Sparkles size={160} strokeWidth={1} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                   <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center p-4 border border-white/20 shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                      <Gift size={48} className="animate-bounce" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{offer.title}</h3>
                      <p className="text-white/80 font-bold uppercase text-[10px] tracking-widest leading-relaxed max-w-sm">{offer.desc}</p>
                      
                      <div className="bg-white/10 border border-white/20 p-2 rounded-2xl flex items-center justify-between mt-6">
                         <span className="text-xs font-black uppercase tracking-widest pl-4">
                           {lang === 'hi' ? 'कोड का प्रयोग करें:' : 'Use Code:'} <span className="text-amber-300 ml-2">{offer.code}</span>
                         </span>
                         <button className="bg-white text-slate-900 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-lg active:scale-95">
                           {lang === 'hi' ? 'कॉपी' : 'Copy'}
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          ))}
       </div>
    </section>
  );
};
