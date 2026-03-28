import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Lock, Smartphone, User, MapPin, X, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.error(lang === 'hi' ? 'कृपया 10-अंकों का वैध नंबर दर्ज करें' : 'Please enter a valid 10-digit number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      toast.success(lang === 'hi' ? 'OTP भेजा गया: 123456' : 'Magic OTP sent: 123456');
    }, 1500);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp !== '123456') {
      toast.error(lang === 'hi' ? 'अमान्य OTP' : 'Invalid OTP');
      return;
    }
    setLoading(true);
    try {
        const response = await axios.post('/api/users/login', {
            phone: phoneNumber,
            name: 'Runnisaidpur Local User', // In a real app, this would be collected from a registration form
            address: { street: 'Madhopur Sultanpur', city: 'Runnisaidpur', state: 'Bihar', zip: '843328' }
        });
        
        login(response.data);
        toast.success(lang === 'hi' ? 'श्री राम मेडिकल में आपका स्वागत है!' : 'Welcome Back to Shree Ram Medical!');
        
        // Check if admin and redirect accordingly
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
    } catch (error) {
        console.error("Login verify error:", error);
        toast.error(lang === 'hi' ? 'लॉगिन विफल रहा' : 'Login failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -ml-32 -mb-32 opacity-50" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-primary-900/10 relative overflow-hidden group border border-primary-50/50"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500" />
        
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 shadow-inner group-hover:scale-110 transition-all">
            {isOtpSent ? <Lock size={40} /> : <Smartphone size={40} />}
          </div>

          <div className="space-y-3">
             <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-none tracking-tight italic uppercase">
                {t('userAccess').split(' ')[0]} <span className="text-primary-500 not-italic border-b-6 border-primary-500/10">{t('userAccess').split(' ')[1]}</span>
             </h1>
             <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
                {isOtpSent ? t('secureOtp') : t('welcomeToStore')}
             </p>
          </div>

          <AnimatePresence mode="wait">
            {!isOtpSent ? (
              <motion.form
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOtp}
                className="w-full space-y-6"
              >
                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 font-black">+91</div>
                   <input
                     type="number"
                     placeholder={t('phoneNumber')}
                     className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-20 pr-6 focus:ring-4 focus:ring-primary-500/10 focus:bg-white text-lg font-black tracking-widest outline-none transition-all placeholder:text-slate-300"
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                   />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-primary-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 group"
                >
                   <span>{loading ? t('sendingRequest') : t('getOtp')}</span>
                   {!loading && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /> }
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="w-full space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                     <input
                        type="number"
                        placeholder={t('enterCode')}
                        className="w-full text-center bg-slate-50 border-none rounded-2xl py-6 px-6 focus:ring-4 focus:ring-primary-500/10 focus:bg-white text-2xl font-black tracking-[0.5em] outline-none transition-all placeholder:text-slate-300 placeholder:text-xs placeholder:tracking-[0.2em]"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                  </div>
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[10px] font-black text-slate-400 uppercase">{t('didntReceive')}</span>
                     <button type="button" onClick={() => setIsOtpSent(false)} className="text-[10px] font-black text-primary-600 uppercase underline uppercase">{t('changeNumber')}</button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 group uppercase"
                >
                   <span>{loading ? t('authenticating') : t('verifyContinue')}</span>
                   <ShieldCheck size={20} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          
          <div className="pt-8 flex flex-col items-center gap-4 opacity-50 select-none">
             <div className="flex items-center gap-6">
                <CheckCircle2 size={16} className="text-primary-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('safeSecuredSync')}</span>
             </div>
             <div className="flex gap-2">
                {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-200 rounded-full" />)}
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
