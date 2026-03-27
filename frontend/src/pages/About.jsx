import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Heart, Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden bg-slate-900 flex items-center justify-center text-center px-4">
         <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=2070" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white italic tracking-tight"
            >
              About <span className="text-emerald-500">Shree Ram</span>
            </motion.h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Empowering Runnisaidpur with authentic healthcare, genuine medicines, and lightning-fast local delivery.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Our Journey
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  Your Trusted Local <br /> Pharmacy <span className="text-emerald-500 italic">Partner.</span>
               </h2>
               <p className="text-slate-500 leading-relaxed font-semibold">
                 At SHREE RAM MEDICAL, we believe healthcare should be accessible, reliable, and personal. Founded in the heart of Runnisaidpur, we've grown from a small neighborhood shop to a digital-first pharmacy that never loses its human touch.
                 <br /><br />
                 We source directly from authorized manufacturers like Sun Pharma, Cipla, and Dr. Reddy's to ensure that every pill you receive is 100% genuine.
               </p>
               
               <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                     <h4 className="text-3xl font-black text-emerald-500">5000+</h4>
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Satisfied Customers</p>
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-3xl font-black text-blue-500">100%</h4>
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Genuine Medicines</p>
                  </div>
               </div>
            </div>
            
            <div className="relative">
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
               <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069" className="relative z-10 rounded-[3rem] shadow-2xl border-8 border-white" />
            </div>
         </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 py-24">
         <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16 space-y-4">
               <h3 className="text-3xl md:text-5xl font-black text-slate-900 italic uppercase">Our Core <span className="text-emerald-500">Values</span></h3>
               <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">The pillars of our pharmacy</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: <ShieldCheck size={32} />, title: "Trust", desc: "Every medicine we sell is verified for quality and authenticity.", color: "bg-emerald-50 text-emerald-600" },
                 { icon: <Truck size={32} />, title: "Speed", desc: "Our local network ensures delivery across Runnisaidpur in under 60 mins.", color: "bg-blue-50 text-blue-600" },
                 { icon: <Heart size={32} />, title: "Care", desc: "Your health is our priority. We offer free consultation for all orders.", color: "bg-rose-50 text-rose-600" }
               ].map((val, i) => (
                 <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className={`${val.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                       {val.icon}
                    </div>
                    <h4 className="text-xl font-black text-slate-800 mb-3">{val.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{val.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;
