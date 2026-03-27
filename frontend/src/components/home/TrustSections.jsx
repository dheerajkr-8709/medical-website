import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, MapPin, Package, Heart, Star, Sparkles, LayoutGrid, Zap, PhoneCall, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const DeliveryTrustSection = () => {
  const { t } = useLanguage();
  
  const items = [
    { icon: <Truck size={32} />, title: t('fastDelivery'), desc: t('fastDeliveryDesc'), color: "bg-blue-500 shadow-blue-500/20" },
    { icon: <MapPin size={32} />, title: t('localStore'), desc: t('localStoreDesc'), color: "bg-emerald-500 shadow-emerald-500/20" },
    { icon: <ShieldCheck size={32} />, title: t('genuineMeds'), desc: t('genuineMedsDesc'), color: "bg-amber-500 shadow-amber-500/20" },
    { icon: <Package size={32} />, title: t('bigSavings'), desc: t('bigSavingsDesc'), color: "bg-rose-500 shadow-rose-500/20" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className={`${item.color} bg-opacity-10 p-10 rounded-[3rem] border border-white/40 flex flex-col items-center text-center gap-6 shadow-2xl shadow-slate-200/5 backdrop-blur-sm`}
          >
             <div className={`${item.color} p-6 rounded-3xl text-white shadow-xl rotate-3`}>{item.icon}</div>
             <div>
                <h4 className="font-black text-slate-900 text-2xl leading-tight mb-2 uppercase tracking-tighter italic">{item.title}</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{item.desc}</p>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TrustBuildingSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 space-y-6">
             <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-xs tracking-[0.3em]">
                <Clock size={16} /> {t('certPharmacist')}
             </div>
             <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase italic">{t('readyGuidance').split(' ').slice(0, 2).join(' ')} <br /> <span className="text-emerald-500">{t('readyGuidance').split(' ').slice(2).join(' ')}</span></h3>
             <p className="text-slate-400 font-medium max-w-md">{t('pharmaGuideDesc')}</p>
             <a href="tel:+919113766681" className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all w-full sm:w-max">
                <PhoneCall size={20} />
                {t('connectNow')}
             </a>
          </div>
        </div>

        <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl shadow-slate-900/5">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">{t('storeLocation')}</h3>
              <div className="bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 uppercase">{t('runnisaidpur')}</div>
           </div>
           
           <div className="w-full h-48 bg-slate-100 rounded-[2rem] overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer border border-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14339.2319343336!2d85.45447781744385!3d26.21639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed10257e5e3a89%3A0xc6c76ab8a729e92!2sRunni%20Saidpur%2C%20Bihar!5e0!3m2!1sen!2sin!4v1711545678901!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
           </div>
           <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
              <MapPin className="text-emerald-500" />
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{t('addressShort')}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export { DeliveryTrustSection, TrustBuildingSection };
