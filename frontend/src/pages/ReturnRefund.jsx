import React from 'react';

const ReturnRefund = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-900/5 transition-all">
        <h1 className="text-4xl font-black text-slate-800 leading-none tracking-tight mb-8 italic uppercase">Return & <span className="text-emerald-500 underline underline-offset-8 decoration-8 decoration-emerald-500/10">Refund</span></h1>
        
        <div className="space-y-8 text-slate-500 font-medium leading-relaxed">
          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <span>Standard Policy</span>
             </h3>
             <p>Medicines are temperature-sensitive products. As a local pharmacy in Runnisaidpur, we prioritize health safety. Returns are accepted only for manufacturing defects or mismatched items within 24 hours of delivery.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <span>Eligibility for Return</span>
             </h3>
             <ul className="list-disc pl-5 space-y-2">
                <li>Original packaging and bill/receipt must be present.</li>
                <li>Medicine strips must be uncut and untampered with.</li>
                <li>Refunds are not given for change-of-mind or leftover medications.</li>
             </ul>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                <span>Refund Processing</span>
             </h3>
             <p>Refunds are processed within 48 hours to your original payment method. For Cash on Delivery (COD) orders, local store credit or UPI refunds are provided.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
                <span>Non-Returnable Items</span>
             </h3>
             <p>Syrup bottles with broken seals, injections, and refrigerated items like Insulin are strictly non-returnable once dispatched from SHREE RAM MEDICAL.</p>
          </section>

          <div className="pt-10 border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Updated: March 2026 | Shree Ram Medical Compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefund;
