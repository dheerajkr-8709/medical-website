import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Percent, Clock } from 'lucide-react';

const MedicineMarquee = () => {
  const items = [
    { name: "Dolo 650", price: "₹45", discount: "15%", icon: <Zap size={10} /> },
    { name: "Becosules", price: "₹38", discount: "10%", icon: <Percent size={10} /> },
    { name: "Zincovit", price: "₹120", discount: "20%", icon: <Clock size={10} /> },
    { name: "Crocin", price: "₹18", discount: "5%", icon: <Zap size={10} /> },
    { name: "Omez 20", price: "₹99", discount: "25%", icon: <Percent size={10} /> },
    { name: "Azithral", price: "₹145", discount: "12%", icon: <Zap size={10} /> },
    { name: "Calpol", price: "₹24", discount: "8%", icon: <Clock size={10} /> },
    { name: "Combiflam", price: "₹42", discount: "30%", icon: <Percent size={10} /> },
  ];

  // Double the items for infinite scroll
  const scrollItems = [...items, ...items];

  return (
    <div className="bg-slate-900 border-b border-white/5 overflow-hidden h-9 flex items-center">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-12 px-6 items-center"
        >
          {scrollItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                 {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase text-white/90 tracking-widest">{item.name}</span>
              <span className="text-[10px] font-bold text-emerald-400">{item.price}</span>
              <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md leading-none">{item.discount} OFF</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MedicineMarquee;
