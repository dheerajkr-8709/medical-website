import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Zap, HeartPulse } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, lang } = useLanguage();
  const shopNumber = "919113766681";
  
  const doctorImg = "/ai_doctor_face_round_1774593193270.png"; 

  const emergencyMessage = lang === 'hi' ? "इमरजेंसी: मुझे तुरंत दवा चाहिए। कृपया जवाब दें!" : "EMERGENCY: I need medicine immediately. Please respond!";
  const generalMessage = lang === 'hi' ? "नमस्ते, मैं श्री राम मेडिकल से कुछ दवाएं मंगवाना चाहता हूं।" : "Hello, I want to order some medicines from SHREE RAM MEDICAL.";

  return (
    <div className="fixed bottom-24 md:bottom-10 right-6 z-[9999] flex flex-col items-end gap-4">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[320px] overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative">
                   <div className="w-14 h-14 rounded-full border-2 border-white/50 p-1 bg-white">
                      <img src={doctorImg} className="w-full h-full object-cover rounded-full" alt="AI Doctor" />
                   </div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-emerald-600 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight uppercase italic">{lang === 'hi' ? 'डॉ. श्री राम' : 'Dr. Shree Ram'}</h3>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest flex items-center gap-1">
                    <HeartPulse size={10} className="text-emerald-300" />
                    {lang === 'hi' ? 'फार्मासिस्ट सहायता' : 'Pharmacist Support'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 bg-slate-50/50">
               <div className="bg-white p-4 rounded-2xl text-xs font-medium text-slate-600 shadow-sm border border-slate-100 italic">
                  {lang === 'hi' ? '"नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ? किसी भी दवा इमरजेंसी के मामले में, कृपया नीचे दिए गए लाल बटन का उपयोग करें।"' : '"Hello! How can I help you today? In case of any medication emergency, please use the red button below."'}
               </div>

               <div className="grid gap-3">
                  <a 
                    href={`https://wa.me/${shopNumber}?text=${encodeURIComponent(emergencyMessage)}`}
                    target="_blank"
                    className="bg-rose-500 text-white p-4 rounded-2xl flex items-center justify-between group hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                       <Zap size={18} className="animate-bounce" />
                       <span className="font-black text-xs uppercase tracking-widest">{lang === 'hi' ? 'मेडिकल इमरजेंसी' : 'Medical Emergency'}</span>
                    </div>
                    <Phone size={16} className="opacity-50" />
                  </a>

                  <a 
                    href={`https://wa.me/${shopNumber}?text=${encodeURIComponent(generalMessage)}`}
                    target="_blank"
                    className="bg-[#25D366] text-white p-4 rounded-2xl flex items-center justify-between group hover:bg-[#1eb85a] transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                       <MessageCircle size={18} />
                       <span className="font-black text-xs uppercase tracking-widest">{lang === 'hi' ? 'सामान्य ऑर्डर' : 'General Order'}</span>
                    </div>
                    <span className="text-[10px] font-bold opacity-70">30 MINS</span>
                  </a>
               </div>
            </div>

            <div className="p-4 text-center border-t border-slate-50">
               <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{lang === 'hi' ? 'सेवा समय: सुबह 9 - रात 10' : 'Service Time: 9 AM - 10 PM'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.div
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl"
        />
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full p-1.5 shadow-2xl shadow-emerald-500/50 border-4 border-white group"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img src={doctorImg} className="w-full h-full object-cover" alt="AI Doctor" />
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors" />
          </div>
          
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
             <HeartPulse size={12} className="animate-pulse" />
          </div>
        </motion.button>
      </div>

    </div>
  );
};

export default FloatingWhatsApp;
