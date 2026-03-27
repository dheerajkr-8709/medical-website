import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-slate-900/5 transition-all">
        <h1 className="text-4xl font-black text-slate-800 leading-none tracking-tight mb-8 italic uppercase">Privacy <span className="text-emerald-500 underline underline-offset-8 decoration-8 decoration-emerald-500/10">Policy</span></h1>
        
        <div className="space-y-8 text-slate-500 font-medium leading-relaxed">
          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <span>Introduction</span>
             </h3>
             <p>Welcome to SHREE RAM MEDICAL. Your privacy is paramount. This policy details how we collect, use, and safeguard your health information and personal data when using our platform in Runnisaidpur.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                <span>Information We Collect</span>
             </h3>
             <ul className="list-disc pl-5 space-y-2">
                <li>Personal details (Name, Phone, Address) for local delivery.</li>
                <li>Health data (Prescriptions) solely for dispensing medicines.</li>
                <li>Usage data to improve your pharmacy experience.</li>
             </ul>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                <span>Medical Confidentiality</span>
             </h3>
             <p>All prescriptions uploaded are encrypted and accessed only by our licensed pharmacists. We never sell your health history to third parties.</p>
          </section>

          <section className="space-y-3">
             <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-rose-500 rounded-full" />
                <span>Your Rights</span>
             </h3>
             <p>You have the right to request deletion of your data, update your address, or opt-out of notifications at any point via our Contact section.</p>
          </section>

          <div className="pt-10 border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last Updated: March 2026 | Shree Ram Medical Compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
