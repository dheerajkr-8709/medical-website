import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-900/5 transition-all">
        <h1 className="text-4xl font-black text-slate-800 leading-none tracking-tight mb-8 italic uppercase">Terms of <span className="text-emerald-500 underline underline-offset-8 decoration-8 decoration-emerald-500/10">Service</span></h1>
        
        <div className="space-y-8 text-slate-500 font-medium leading-relaxed">
          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <span>Binding Agreement</span>
             </h3>
             <p>By using the SHREE RAM MEDICAL platform in Runnisaidpur, you agree to comply with these terms. We provide pharmacy dispensing and local delivery services for authorized medicines only.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <span>Eligibility & Orders</span>
             </h3>
             <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 18 years old to place an order.</li>
                <li>Prescription medicines (RX) cannot be dispensed without a valid upload.</li>
                <li>SHREE RAM MEDICAL reserves the right to cancel orders based on suspected abuse.</li>
             </ul>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                <span>Pricing & Fees</span>
             </h3>
             <p>All prices are inclusive of local taxes in Bihar. We offer free delivery within a 5km radius of Madhopur Sultanpur for orders above ₹500.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
                <span>Liability Limitation</span>
             </h3>
             <p>SHREE RAM MEDICAL is not liable for allergic reactions resulting from patient misuse or failure to consult with a medical professional before consumption.</p>
          </section>

          <div className="pt-10 border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Updated: March 2026 | Shree Ram Medical Compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
