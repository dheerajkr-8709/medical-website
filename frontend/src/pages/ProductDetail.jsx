import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Clock, 
  MessageCircle, 
  Star, 
  ChevronRight, 
  Info, 
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../config';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t, lang } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/medicines/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.image);
      } catch (err) {
        toast.error(lang === 'hi' ? "दवा का विवरण नहीं मिला" : "Medicine details not found");
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.primary(lang === 'hi' ? `${product.name} कार्ट में जोड़ा गया!` : `${product.name} added to cart!`);
  };

  const currentPrice = product?.price * (1 - (product?.discount || 0) / 100);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 overflow-x-auto no-scrollbar">
          <span className="cursor-pointer hover:text-emerald-500" onClick={() => navigate('/')}>{t('home')}</span>
          <ChevronRight size={12} />
          <span className="cursor-pointer hover:text-emerald-500" onClick={() => navigate('/products')}>{t('medicines')}</span>
          <ChevronRight size={12} />
          <span className="text-slate-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Images Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-900/5 relative group overflow-hidden"
            >
              <img 
                src={getImageUrl(activeImage)} 
                className="w-full h-auto max-h-[400px] object-contain transition-transform duration-500 group-hover:scale-105" 
                alt={product.name}
              />
              {product.discount > 0 && (
                <div className="absolute top-8 left-8 bg-rose-500 text-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg uppercase">
                  -{product.discount}% {t('saveMsg')}
                </div>
              )}
            </motion.div>

            {/* Additional Images Thumbnails */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
               {[product.image, ...(product.additionalImages || [])].map((img, i) => (
                 <button 
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl p-2 border-2 transition-all ${activeImage === img ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                 >
                   <img src={getImageUrl(img)} className="w-full h-full object-contain" />
                 </button>
               ))}
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                 {product.prescriptionRequired ? (
                    <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <FileText size={10} /> {t('rxRequired')}
                    </span>
                 ) : (
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{t('noPrescription')}</span>
                 )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{product.name}</h1>
              <p className="text-slate-400 font-bold text-sm tracking-tight italic">
                {lang === 'hi' ? 'द्वारा' : 'By'} <span className="text-slate-600 underline cursor-pointer">{product.manufacturer || 'Shree Ram Medical'}</span>
              </p>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-900/5 flex flex-wrap items-center justify-between gap-6">
               <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-emerald-600 italic">₹{currentPrice.toFixed(0)}</span>
                    {product.discount > 0 && <span className="text-lg text-slate-300 line-through font-bold">₹{product.price}</span>}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'hi' ? 'सभी करों सहित' : 'Inclusive of all taxes'}</p>
               </div>
               
               <div className="flex items-center bg-slate-100 p-2 rounded-2xl gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-xl bg-white text-slate-900 font-bold shadow-sm active:scale-95">-</button>
                  <span className="font-black text-slate-800 w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-xl bg-white text-slate-900 font-bold shadow-sm active:scale-95">+</button>
               </div>
            </div>

            {/* Key Med Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
                  <Layers size={20} className="text-emerald-500 mx-auto mb-2" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('composition')}</p>
                  <p className="text-xs font-black text-slate-700 line-clamp-1">{product.composition || (lang === 'hi' ? 'मानक संरचना' : 'Standard formulation')}</p>
               </div>
               <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center">
                  <Calendar size={20} className="text-blue-500 mx-auto mb-2" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('expiry')}</p>
                  <p className="text-xs font-black text-slate-700">{product.expDate || '12/2026'}</p>
               </div>
               <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-center col-span-2 md:col-span-1">
                  <ShieldCheck size={20} className="text-amber-500 mx-auto mb-2" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{t('status')}</p>
                  <div className="flex items-center justify-center gap-1">
                     {product.stock ? <CheckCircle2 size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-rose-500" />}
                     <p className={`text-xs font-black ${product.stock ? 'text-emerald-600' : 'text-rose-600'}`}>{product.stock ? t('addToCart').replace('Add to', 'In').replace('कार्ट में जोड़ें', 'स्टॉक में है') : t('outOfStock')}</p>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <button 
                onClick={handleAddToCart}
                disabled={!product.stock}
                className="flex-1 bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
               >
                  <ShoppingCart size={20} className="group-hover:-translate-y-1 transition-transform" />
                  {t('addToCart')}
               </button>
               <button 
                disabled={!product.stock}
                onClick={() => { handleAddToCart(); navigate('/cart'); }}
                className="flex-1 bg-emerald-500 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
               >
                  <Zap size={20} className="fill-white" />
                  {t('buyNow')}
               </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl text-emerald-500 shadow-sm"><Clock size={24} /></div>
                <div>
                   <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">{lang === 'hi' ? 'सुपरफास्ट लोकल डिलीवरी' : 'Superfast Local Delivery'}</h4>
                   <p className="text-xs font-bold text-slate-800">{lang === 'hi' ? 'रुन्नीसैदपुर में डिलीवरी' : 'Delivering in Runnisaidpur within'} <span className="text-emerald-600 italic underline">{lang === 'hi' ? '15-45 मिनट' : '15-45 mins'}</span></p>
                </div>
            </div>

            {/* Detail Tabs / Sections */}
            <div className="space-y-6 pt-6">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-slate-900 italic tracking-tight flex items-center gap-3 uppercase">
                    <Info size={20} className="text-slate-400" />
                    {t('medicalDescription')}
                 </h3>
                 <p className="text-slate-500 font-medium leading-relaxed text-sm bg-white p-6 rounded-3xl border border-slate-100">
                    {product.description || (lang === 'hi' ? 'यह दवा प्रमाणित निर्माताओं से ली गई है और इसकी प्रभावकारिता बनाए रखने के लिए तापमान-नियंत्रित वातावरण में संग्रहीत की जाती है।' : 'This medicine is sourced from certified manufacturers and is stored in a temperature-controlled environment to maintain its efficacy.')}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t('mainUses')}</h4>
                    <ul className="space-y-2">
                       {(product.uses || (lang === 'hi' ? 'दर्द से राहत, बुखार कम करना' : 'Relieving Pain, Reducing Fever')).split(',').map((use, i) => (
                         <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white p-3 rounded-xl border border-slate-50">
                            <CheckCircle2 size={12} className="text-emerald-500" /> {use.trim()}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t('sideEffects')}</h4>
                    <ul className="space-y-2">
                       {(product.sideEffects || (lang === 'hi' ? 'मतली, चक्कर आना' : 'Nausea, Minor Dizziness')).split(',').map((se, i) => (
                         <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white p-3 rounded-xl border border-slate-50">
                            <AlertTriangle size={12} className="text-amber-500" /> {se.trim()}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <button 
              onClick={() => window.open(`https://wa.me/${shopNumber}?text=I want to ask about ${product.name}`, '_blank')}
              className="w-full bg-[#25D366] text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-500/10 active:scale-95 transition-all flex items-center justify-center gap-3 mt-10"
            >
               <MessageCircle size={20} fill="white" />
               {t('askPharmacist')}
            </button>

          </div>
        </div>

        {/* Ratings Section */}
        <div className="mt-20 pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 text-left">
               <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">{t('ratingsReviews').split(' & ')[0]} <span className="text-emerald-500">& {t('ratingsReviews').split(' & ')[1]}</span></h3>
                  <div className="flex items-center gap-4">
                     <div className="flex text-amber-500">
                        {[1,2,3,4,5].map(i => <Star key={i} fill={i <= 4 ? "currentColor" : "none"} size={20} />)}
                     </div>
                     <span className="font-black text-slate-800">{product.ratings?.average || 4.5} {lang === 'hi' ? '5 में से' : 'out of 5'}</span>
                  </div>
               </div>
               <button className="bg-white border-2 border-slate-900 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all uppercase">{lang === 'hi' ? 'समीक्षा लिखें' : 'Write a Review'}</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[1,2].map(i => (
                 <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">L</div>
                          <div>
                             <p className="text-sm font-black text-slate-800">{lang === 'hi' ? 'स्थानीय सत्यापित खरीदार' : 'Local Verified Buyer'}</p>
                             <p className="text-[10px] text-slate-400 font-bold">{lang === 'hi' ? '2 महीने पहले' : '2 Months Ago'}</p>
                          </div>
                       </div>
                       <div className="flex text-amber-500"><Star fill="currentColor" size={14} /> 5.0</div>
                    </div>
                     <p className="text-sm text-slate-500 font-medium italic">"{lang === 'hi' ? 'रुन्नीसैदपुर में असाधारण डिलीवरी गति। दवा अच्छी तरह से पैक की गई थी और असली थी। अत्यधिक अनुशंसित!' : 'Exceptional delivery speed in Runnisaidpur. The medicine was well-packed and genuine. Highly recommended!'}"</p>
                 </div>
               ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
