import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, PhoneCall } from 'lucide-react';

const QuickActionButtons = () => {
  const shopNumber = "9113766681";
  const whatsappNumber = "919113766681";

  return (
    <div className="md:hidden fixed bottom-[88px] left-0 right-0 z-[90] px-4 flex gap-3 pointer-events-none">
      <motion.a
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I want to order medicine from SHREE RAM MEDICAL")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 font-black text-sm uppercase tracking-wider pointer-events-auto active:scale-95 transition-all"
      >
        <MessageCircle size={20} fill="currentColor" />
        Order on WhatsApp
      </motion.a>
      <motion.a
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        href={`tel:+91${shopNumber}`}
        className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 pointer-events-auto active:scale-95 transition-all"
      >
        <PhoneCall size={20} />
      </motion.a>
    </div>
  );
};

export default QuickActionButtons;
