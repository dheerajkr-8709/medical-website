import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Percent, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Banner = () => {
  const navigate = useNavigate();

  const handleBannerBtn = (banner) => {
    if (banner.id === 1) {
      navigate('/products');
      toast.success("Flat ₹100 Off Applied at Checkout!");
    } else if (banner.id === 2) {
      navigate('/products');
      toast.success(`${banner.offer} offer activated!`);
    } else if (banner.id === 3) {
      navigate('/orders');
    }
  };

  const banners = [
    {
      id: 1,
      title: "Up to ₹100 OFF",
      subtitle: "On your first order above ₹500",
      color: "bg-emerald-600",
      accent: "bg-emerald-500",
      icon: <Percent className="text-white" size={32} />,
      btnText: "Order Now",
      offer: "WELCOME100"
    },
    {
      id: 2,
      title: "Flat ₹500 OFF",
      subtitle: "On orders above ₹2000",
      color: "bg-blue-600",
      accent: "bg-blue-500",
      icon: <Zap className="text-white" size={32} />,
      btnText: "Redeem Offer",
      offer: "SHREERAM500"
    },
    {
      id: 3,
      title: "60 Min Delivery",
      subtitle: "Fastest medical delivery in Runnisaidpur",
      color: "bg-amber-600",
      accent: "bg-amber-500",
      icon: <Clock className="text-white" size={32} />,
      btnText: "Track Now",
      offer: "SUPERFAST"
    }
  ];

  const scrollRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const scrollAmount = 350; // Scroll by one card roughly
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="relative overflow-hidden pt-8 pb-12">
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-4"
      >
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`min-w-[85vw] md:min-w-[400px] lg:min-w-[500px] h-56 rounded-3xl ${banner.color} relative overflow-hidden flex flex-col justify-center p-8 shadow-2xl group`}
          >
            {/* Decor */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${banner.accent} rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500 blur-2xl opacity-50`} />
            <div className="absolute bottom-4 right-10 opacity-20 group-hover:scale-125 transition-transform duration-700">
               {banner.icon}
            </div>

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mb-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Limited Offer</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white leading-tight">{banner.title}</h2>
              <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[200px]">{banner.subtitle}</p>
              
              <button 
                onClick={() => handleBannerBtn(banner)}
                className="mt-4 flex items-center space-x-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-black/10"
              >
                <span>{banner.btnText}</span>
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute top-8 right-8 text-white font-mono text-xs opacity-40 transform rotate-90 origin-right tracking-[0.4em] uppercase">
                {banner.offer}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
