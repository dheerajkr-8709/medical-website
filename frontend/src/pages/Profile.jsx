import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Package, Heart, LogOut, ChevronRight, Star, ShieldCheck, Mail, Edit, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { label: t('myOrders'), icon: <Package size={20} />, to: '/orders', color: 'bg-blue-50 text-blue-600' },
    { label: t('savedAddresses'), icon: <MapPin size={20} />, to: '#', color: 'bg-emerald-50 text-emerald-600' },
    { label: t('prescriptions'), icon: <ShieldCheck size={20} />, to: '#', color: 'bg-purple-50 text-purple-600' },
    { label: t('wishlist'), icon: <Heart size={20} />, to: '#', color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-40" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
           <div className="relative group">
              <div className="w-28 h-28 bg-primary-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-105">
                 <User size={48} />
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-slate-900 text-white rounded-2xl border-4 border-white shadow-xl">
                 <Edit size={16} />
              </button>
           </div>
           <div className="mt-8 space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">{user.name}</h1>
              <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                 <Phone size={14} className="text-primary-500" />
                 <span>+91 {user.phone}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Quick Actions Side */}
            <div className="space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/5 space-y-6 border border-slate-100">
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] italic mb-2 uppercase">{t('accountSync')}</h3>
                   {menuItems.map((item, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => item.to !== '#' && navigate(item.to)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                      >
                         <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</div>
                            <span className="text-sm font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
                         </div>
                         <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </button>
                   ))}
                   <div className="pt-4 border-t border-slate-50">
                      <button 
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full flex items-center gap-4 p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group font-black uppercase text-[10px] tracking-widest"
                      >
                         <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                         <span>{t('terminalSession')}</span>
                      </button>
                   </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                   <div className="flex items-center gap-3 mb-4">
                      <Star size={20} className="text-amber-400" fill="currentColor" />
                      <h4 className="font-extrabold italic tracking-tight italic uppercase">{t('medicalElite').split(' ')[0]} <span className="text-primary-500">{t('medicalElite').split(' ')[1]}</span></h4>
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-4 opacity-70 uppercase">{t('privilegeStatus')}</p>
                   <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="text-[10px] font-black uppercase uppercase">{t('pointsSync')}</span>
                      <span className="font-black italic text-primary-500 tracking-tighter text-xl">1,245 XP</span>
                   </div>
                </div>
            </div>

            {/* Address & Settings Main */}
            <div className="md:col-span-2 space-y-6 text-left">
                <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-slate-900/5 space-y-8 border border-slate-50">
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase italic">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500"><MapPin size={20} /></div>
                            <span>{t('activeWarehouseAddress')}</span>
                         </h3>
                         <button className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-2 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-all uppercase">
                            <Edit size={14} />
                            <span>{t('modify')}</span>
                         </button>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-primary-100 relative group cursor-pointer hover:bg-white transition-all">
                         <div className="absolute top-6 right-6 text-primary-500 group-hover:scale-110 transition-transform"><Zap size={24} fill="currentColor" /></div>
                         <p className="text-slate-800 font-extrabold text-lg leading-relaxed max-w-[200px]">
                            {user.address}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">{lang === 'hi' ? 'सीतामढ़ी, बिहार 843328' : 'Sitamarhi, Bihar 843328'}</p>
                      </div>
                   </div>

                   <div className="space-y-6 pt-10 border-t border-slate-50">
                      <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3 uppercase italic">
                         <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Mail size={20} /></div>
                         <span>{t('digitalNotifications')}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {[
                           { label: t('orderUpdates'), state: true },
                           { label: t('offersRefills'), state: false },
                         ].map((notif, idx) => (
                           <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                              <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{notif.label}</span>
                              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notif.state ? 'bg-primary-500' : 'bg-slate-200'}`}>
                                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notif.state ? 'translate-x-6' : 'translate-x-0'}`} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default Profile;
