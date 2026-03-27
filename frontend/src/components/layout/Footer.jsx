import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ShieldCheck, Truck, Package, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, lang } = useLanguage();

  const promises = [
    { icon: <ShieldCheck size={28} />, title: t('genuineMeds'), desc: lang === 'hi' ? 'शीर्ष ब्रांडों से प्राप्त' : 'Sourced from top brands', color: 'text-primary-500' },
    { icon: <Truck size={28} />, title: lang === 'hi' ? 'स्थानीय सुपरफास्ट' : 'Local Superfast', desc: lang === 'hi' ? '10 किमी के भीतर डिलीवरी' : 'Delivery within 10km', color: 'text-blue-500' },
    { icon: <Package size={28} />, title: lang === 'hi' ? 'सुरक्षित पैकेजिंग' : 'Safe Packaging', desc: lang === 'hi' ? 'नैदानिक रूप से स्वच्छ' : 'Clinically hygiened', color: 'text-amber-500' },
    { icon: <RotateCcw size={28} />, title: lang === 'hi' ? 'आसान रिफिल' : 'Easy Refills', desc: lang === 'hi' ? 'स्वचालित प्रिस्क्रिप्शन' : 'Automatic prescriptions', color: 'text-emerald-500' },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-400 pt-20 pb-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600" />
      <div className="absolute -top-24 -left-20 w-64 h-64 bg-primary-900/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl transition-all duration-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Quality Promises Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-12 border-b border-slate-800">
          {promises.map((p, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`p-3 bg-slate-800 rounded-2xl ${p.color}`}>
                {p.icon}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{p.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Shop Column */}
          <div className="space-y-6 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-primary-900/20 shadow-xl">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight">SHREE RAM</span>
                <span className="text-primary-500 font-bold text-xs tracking-widest">MEDICAL</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              {lang === 'hi' ? 'वर्षों से गुणवत्तापूर्ण दवाएं और स्वास्थ्य सेवा प्रदान कर रहे हैं। अब रुन्नीसैदपुर में सीधे आपके दरवाजे पर खुशियां पहुंचा रहे हैं।' : 'Providing quality medicines and healthcare for years. Now delivering happiness directly to your doorstep in Runnisaidpur.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-left">
            <h4 className="text-white font-bold text-lg">{lang === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-emerald-500 transition-colors">{t('home')}</Link></li>
              <li><Link to="/products" className="hover:text-emerald-500 transition-colors">{t('medicines')}</Link></li>
              <li><Link to="/orders" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'ऑर्डर की स्थिति' : 'Order Status'}</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'पूछताछ / संपर्क' : 'Inquiry / Contact'}</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'हमारे बारे में' : 'About Us'}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6 text-left">
            <h4 className="text-white font-bold text-lg">{lang === 'hi' ? 'सहायता और समर्थन' : 'Help & Support'}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? '24/7 हेल्प डेस्क' : '24/7 Help Desk'}</Link></li>
              <li><Link to="/return-refund" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'वापसी और रिफंड' : 'Return & Refund'}</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">{lang === 'hi' ? 'स्टोर लोकेटर' : 'Store Locator'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6 text-left">
            <h4 className="text-white font-bold text-lg">{lang === 'hi' ? 'स्टोर से संपर्क करें' : 'Contact Store'}</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                <span>{t('addressLong')}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-emerald-500 flex-shrink-0" size={18} />
                <span>+91 91137 66681</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-emerald-500 flex-shrink-0" size={18} />
                <span>dheerajroy3030@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-20 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-slate-500 order-2 md:order-1">
            © {currentYear} Shree Ram Medical. {lang === 'hi' ? 'रुन्नीसैदपुर के लिए 💚 के साथ डिज़ाइन किया गया।' : 'Designed with 💚 for Runnisaidpur.'}
          </p>
          <div className="flex items-center gap-6 order-1 md:order-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-700">{lang === 'hi' ? 'रेजरपे द्वारा भुगतान सुरक्षित' : 'Payment Secured By Razorpay'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
