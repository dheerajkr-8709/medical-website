import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Plus, Search, Filter, Edit, Trash2, X, Image as ImageIcon, CheckCircle2, AlertCircle, ArrowUpRight, ChevronRight, LayoutGrid, Activity, DollarSign } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageMedicines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    price: '',
    discount: '0',
    category: 'Tablets',
    description: '',
    image: 'https://via.placeholder.com/150',
    dosage: '1 Tab Daily',
    usage: 'After Food',
    ingredients: 'Standard'
  });

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load medicines from master database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    if (!newMedicine.name || !newMedicine.price) {
        toast.error("Name and Price are required.");
        return;
    }
    try {
      await axios.post('/api/medicines', newMedicine);
      toast.success('Medicine added into system successfully!');
      setIsModalOpen(false);
      setNewMedicine({
        name: '', price: '', discount: '0', category: 'Tablets', description: '',
        image: 'https://via.placeholder.com/150', dosage: '1 Tab Daily', usage: 'After Food', ingredients: 'Standard'
      });
      fetchMedicines();
    } catch (err) {
      toast.error('Failed to add medicine. Check connection.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this medicine from inventory?')) {
      try {
        await axios.delete(`/api/medicines/${id}`);
        toast.success('Inventory Updated: Medicine Removed');
        fetchMedicines();
      } catch (err) {
        toast.error('Failed to delete medicine');
      }
    }
  };

  const stats = [
    { label: "Inventory Size", value: medicines.length, icon: <Package size={24} />, color: "bg-blue-500 shadow-blue-500/20" },
    { label: "Out of Stock", value: medicines.filter(m => m.status === 'Out of Stock').length, icon: <Activity size={24} />, color: "bg-rose-500 shadow-rose-500/20" },
    { label: "Admin Status", value: "Verified", icon: <DollarSign size={24} />, color: "bg-emerald-500 shadow-emerald-500/20" },
    { label: "Email Support", value: "Active", icon: <Users size={24} />, color: "bg-amber-500 shadow-amber-500/20" },
  ];

  const filteredMedicines = medicines.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none tracking-[0.4em]">ADMIN CONSOLE v2.0</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic">
                     Medicine <span className="text-primary-500 not-italic border-b-8 border-primary-500/10">Control</span>
                  </h1>
               </div>

               <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-4 active:scale-95 transition-all group"
                  >
                     <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                     <span>Register New Pack</span>
                  </button>
               </div>
            </div>

            {/* Admin Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
               {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-xl shadow-slate-900/5 group hover:border-primary-100 transition-all">
                     <div className={`p-4 rounded-2xl text-white ${stat.color} transition-transform group-hover:scale-110`}>{stat.icon}</div>
                     <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{stat.label}</div>
                        <div className="text-2xl font-black text-slate-900 tracking-tight leading-none italic">{stat.value}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        
        {/* Inventory Actions Row */}
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-4 flex flex-col md:flex-row items-center gap-4 sticky top-24 z-40 border border-slate-100 shadow-xl shadow-slate-900/5 mb-10">
           <div className="flex-grow max-w-lg relative group w-full">
              <input 
                type="text" 
                placeholder="Search master inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none font-bold"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-grow md:flex-none flex items-center justify-center gap-3 bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                 <Filter size={18} />
                 <span>Categories</span>
              </button>
              <button onClick={fetchMedicines} className="flex-grow md:flex-none flex items-center justify-center gap-3 bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                 <RotateCcw size={18} />
                 <span>Sync Master</span>
              </button>
           </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-50 group min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Medical Database</span>
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Medicine & Details</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Price (MRP)</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Deal (OFF)</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Availability</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicines.map((med, idx) => (
                    <tr key={idx} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors group/row">
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl p-3 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm">
                               <img src={med.image} className="w-full h-full object-contain" />
                            </div>
                            <div>
                               <p className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1 group-hover/row:text-primary-600 transition-colors uppercase">{med.name}</p>
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  <span className="text-primary-500">{med.category}</span>
                               </div>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <p className="text-xl font-black text-slate-900 tracking-tighter italic">₹{med.price}</p>
                      </td>
                      <td className="px-10 py-8">
                         <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                            <TrendingUp size={12} />
                            <span>-{med.discount}% OFF</span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                         <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest ${med.status === 'In Stock' ? 'bg-primary-50 text-primary-600 border border-primary-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${med.status === 'In Stock' ? 'bg-primary-500' : 'bg-rose-500'}`} />
                            <span>{med.status}</span>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete(med._id || med.id)} className="p-3 bg-white text-slate-400 border border-slate-100 rounded-2xl hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95"><Trash2 size={18} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="bg-slate-50 p-10 text-center">
             <button onClick={fetchMedicines} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-slate-600 transition-colors italic leading-none">Registered Master Database (Sitamarhi Hub)</button>
          </div>
        </div>
      </div>

      {/* Modal - Medicine Add Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 40 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 40 }}
               className="relative bg-white w-full max-w-2xl rounded-[3.5rem] p-10 md:p-14 shadow-3xl overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-50 rounded-full blur-3xl -mr-24 -mt-24" />
                
                <div className="flex items-center justify-between mb-10 relative z-10">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black text-slate-800 tracking-tight italic">New <span className="text-primary-500 not-italic">Stock</span></h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Add Entry to SRM Sitamarhi Inventory</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors transition-transform hover:rotate-90"><X size={24} /></button>
                </div>

                <form onSubmit={handleAddMedicine} className="space-y-8 relative z-10">
                   <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-grow space-y-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Medicine Name</label>
                           <input 
                                required
                                value={newMedicine.name} 
                                onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})} 
                                placeholder="e.g. Paracetamol IP 500mg" 
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold placeholder:text-slate-300" 
                           />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Price (MRP)</label>
                               <input 
                                    required
                                    type="number" 
                                    value={newMedicine.price} 
                                    onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})} 
                                    placeholder="40" 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold" 
                                />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Discount (%)</label>
                               <input 
                                    type="number" 
                                    value={newMedicine.discount} 
                                    onChange={(e) => setNewMedicine({...newMedicine, discount: e.target.value})} 
                                    placeholder="10" 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold" 
                                />
                            </div>
                         </div>
                      </div>
                      <div className="w-full md:w-56 space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Details Ref</label>
                         <textarea 
                            value={newMedicine.description} 
                            onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})} 
                            placeholder="Usage info..." 
                            className="w-full h-44 bg-slate-50 rounded-3xl border-none p-4 focus:ring-2 focus:ring-primary-500 outline-none font-bold text-xs" 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Inventory Category</label>
                     <div className="flex flex-wrap gap-2">
                        {['Tablets', 'Capsules', 'Syrups', 'Ointment', 'Injection'].map(cat => (
                           <button 
                                key={cat} 
                                type="button"
                                onClick={() => setNewMedicine({...newMedicine, category: cat})}
                                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${newMedicine.category === cat ? 'bg-primary-500 text-white shadow-lg' : 'bg-slate-50 text-slate-500'}`}
                           >
                            {cat}
                           </button>
                        ))}
                     </div>
                   </div>

                   <button type="submit" className="w-full bg-slate-900 group-hover:bg-primary-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4">
                       <CheckCircle2 size={20} />
                       <span>Register into Master Sync</span>
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ManageMedicines;
