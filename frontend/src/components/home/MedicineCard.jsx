import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, Heart, Star, ShoppingBag, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getImageUrl } from '../../config';

const MedicineCard = ({ product, layout = 'grid' }) => {
  const { addToCart, updateQuantity } = useCart();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product?.name || 'Item'} ${lang === 'hi' ? 'कार्ट में जोड़ा गया!' : 'added to cart!'}`, {
      icon: '🛒',
      style: {
        borderRadius: '16px',
        background: '#10b981',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
    setQuantity(1);
  };

  const isGrid = layout === 'grid';

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-300 ${
        isHovered ? 'shadow-2xl shadow-emerald-500/10 -translate-y-1' : 'shadow-sm'
      } ${!isGrid ? 'flex gap-4 p-4' : 'p-4 flex flex-col h-full'}`}
    >
      {/* Discount Tag */}
      {product?.discount > 0 && (
        <div className="absolute top-4 left-4 z-20 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-rose-500/30 uppercase tracking-tighter animate-bounce">
          {t('saveMsg')} {product.discount}%
        </div>
      )}

      {/* Best Seller Badge */}
      {product?.isBestSeller && (
        <div className="absolute top-4 right-4 z-20 bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-tight">
          <Star size={10} fill="currentColor" /> {lang === 'hi' ? 'सबसे ज्यादा बिकने वाला' : 'Best Seller'}
        </div>
      )}

      {/* Image Container */}
      <div 
        onClick={() => navigate(`/product/${product?._id}`)}
        className={`relative overflow-hidden rounded-3xl bg-slate-50 cursor-pointer group-hover:bg-white transition-colors ${
          isGrid ? 'aspect-square mb-4' : 'w-28 h-28 flex-shrink-0'
        }`}
      >
        <motion.img
          src={getImageUrl(product?.image)}
          alt={product?.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400';
          }}
          className="w-full h-full object-contain p-4 transition-transform duration-500"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />
        
        {/* Out of Stock Overlay */}
        {product?.status === 'Out of Stock' && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] border border-rose-200">
              {t('outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div 
          onClick={() => navigate(`/product/${product?._id}`)}
          className="space-y-1.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">{product?.category || 'General'}</span>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${product?.status === 'In Stock' ? 'text-emerald-500' : 'text-rose-400'}`}>
               • {product?.status === 'In Stock' ? (lang === 'hi' ? 'स्टॉक में है' : 'In Stock') : t('outOfStock')}
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
            {product?.name || 'Medicine Name'}
          </h3>
          {isGrid && <p className="text-[10px] text-slate-400 line-clamp-1 font-bold uppercase tracking-widest">{product?.brand || (lang === 'hi' ? 'विश्वसनीय आपूर्ति' : 'Trusted Supply')}</p>}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              ₹{product?.discount ? (product.price * (1 - product.discount/100)).toFixed(0) : product?.price || 199}
            </span>
            {product?.discount > 0 && (
              <span className="text-[11px] text-slate-400 line-through font-bold mt-0.5">₹{product.price}</span>
            )}
          </div>

          <div className="flex-shrink-0">
            {quantity === 0 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={product?.status === 'Out of Stock'}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:grayscale group/btn"
              >
                <Plus size={16} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">{lang === 'hi' ? 'जोड़ें' : 'Add'}</span>
              </motion.button>
            ) : (
              <div className="flex items-center bg-slate-900 rounded-2xl p-1 shadow-xl shadow-slate-900/20">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = quantity - 1;
                    updateQuantity(product._id || product.id, newQty);
                    setQuantity(newQty);
                    if (newQty > 0) toast.success(lang === 'hi' ? '1 हटाया गया' : 'Removed 1', { duration: 1000 });
                  }}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <Minus size={14} strokeWidth={4} />
                </button>
                <span className="px-3 text-white text-xs font-black min-w-[1.5rem] text-center">{quantity}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newQty = quantity + 1;
                    updateQuantity(product._id || product.id, newQty);
                    setQuantity(newQty);
                    toast.success(lang === 'hi' ? 'और जोड़ा गया' : 'Added more', { duration: 1000 });
                  }}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <Plus size={14} strokeWidth={4} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicineCard;
