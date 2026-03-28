import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package, Truck, CheckCircle2, MoreVertical, Search, Filter, Clock, MapPin, ChevronRight, LayoutGrid, RotateCcw, MessageSquare, Star, Zap, ShoppingBag, Eye, PhoneCall, AlertTriangle, ArrowUpRight, Activity, Phone } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getImageUrl } from '../../config';

const ManageOrders = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [orders, setOrders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState(new Date());

  const fetchData = async () => {
    try {
      const [ordersRes, presRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/prescriptions')
      ]);
      
      const newOrders = ordersRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const newPres = presRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Check for new orders or prescriptions to play sound
      if ((orders.length > 0 && newOrders.length > orders.length) || 
          (prescriptions.length > 0 && newPres.length > prescriptions.length)) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log("Audio play blocked: ", e));
        toast.success("New Notification!", { icon: '🔔', duration: 5000 });
      }
      
      setOrders(newOrders);
      setPrescriptions(newPres);
    } catch (err) {
      console.error("Fetch Data Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [orders.length, prescriptions.length]);

  const updateOrderStatus = async (id, currentStatus) => {
    const statuses = ["Placed", "Packed", "Out for Delivery", "Delivered"];
    const nextIndex = statuses.indexOf(currentStatus) + 1;
    if (nextIndex >= statuses.length) return;

    try {
      toast.loading("Updating status...", { id: 'update' });
      await axios.put(`/api/orders/${id}/status`, { status: statuses[nextIndex] });
      toast.success("Status updated!", { id: 'update' });
      fetchData();
    } catch (err) {
      toast.error("Update failed", { id: 'update' });
    }
  };

  const updatePresStatus = async (id, status) => {
    try {
      toast.loading("Updating...", { id: 'pres-update' });
      await axios.put(`/api/prescriptions/${id}/status`, { status });
      toast.success("Status updated!", { id: 'pres-update' });
      fetchData();
    } catch (err) {
      toast.error("Failed to update status", { id: 'pres-update' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20';
      case 'Packed': return 'bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-500/20';
      case 'Out for Delivery': return 'bg-blue-500 text-white border-blue-600 shadow-lg shadow-blue-500/20';
      case 'Delivered': return 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/20';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Order Placed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-100 pt-10 pb-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none tracking-[0.4em]">LIVE MONITOR: ACTIVE</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic uppercase">
                     Manage <span className="text-emerald-500 not-italic border-b-8 border-emerald-500/10">{activeTab}</span>
                  </h1>
               </div>

               <div className="flex bg-slate-100 p-2 rounded-2xl border border-slate-200 overflow-x-auto">
                  {['Active', 'Prescriptions', 'Completed', 'Cancelled'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white shadow-xl text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        
        {/* Real-time Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {activeTab === 'Prescriptions' ? (
             prescriptions.map((pres, idx) => (
               <motion.div
                 key={pres._id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`bg-white rounded-[3rem] p-8 shadow-2xl border-4 ${pres.status === 'Pending' ? 'border-amber-200 animate-pulse' : 'border-transparent'}`}
               >
                 <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-300 uppercase">Uploaded on {new Date(pres.createdAt).toLocaleDateString()}</span>
                          <span className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest ${getStatusColor(pres.status)}`}>
                             {pres.status}
                          </span>
                       </div>
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">{pres.phoneNumber}</h3>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => window.open(`tel:${pres.phoneNumber}`)} className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                          <Phone size={24} />
                       </button>
                    </div>
                 </div>

                 <div className="relative group overflow-hidden rounded-[2rem] border-4 border-slate-100 mb-6 h-64">
                    <img src={getImageUrl(pres.imageUrl)} alt="Prescription" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer" onClick={() => window.open(getImageUrl(pres.imageUrl), '_blank')} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                       <button onClick={() => window.open(getImageUrl(pres.imageUrl), '_blank')} className="bg-white text-slate-900 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">View Full Image</button>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    {['Reviewed', 'Order Placed', 'Rejected'].map(status => (
                      <button 
                        key={status}
                        onClick={() => updatePresStatus(pres._id, status)}
                        className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${pres.status === status ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                      >
                        {status}
                      </button>
                    ))}
                 </div>
               </motion.div>
             ))
           ) : (
             orders
               .filter(o => activeTab === 'Active' ? o.status !== 'Delivered' && o.status !== 'Cancelled' : activeTab === 'Completed' ? o.status === 'Delivered' : o.status === 'Cancelled')
               .map((order, idx) => (
               <motion.div
                 key={order._id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className={`bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl shadow-slate-900/5 border-4 transition-all flex flex-col justify-between group ${order.status === 'Placed' ? 'border-rose-100 animate-pulse' : 'border-transparent'}`}
               >
                  <div className="flex justify-between items-start mb-8">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">ID: {order._id.slice(-6).toUpperCase()}</span>
                           <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest ${getStatusColor(order.status)} animate-pulse`}>
                              {order.status}
                           </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">{order.customerName}</h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 italic bg-slate-50 px-4 py-2 rounded-xl w-max">
                           <div className="flex items-center gap-2"><Clock size={16} /> <span>{new Date(order.createdAt).toLocaleTimeString()}</span></div>
                           <div className="flex items-center gap-2 text-emerald-600"><Phone size={16} /> <span>{order.phone}</span></div>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                         <button 
                          onClick={() => window.open(`https://wa.me/${order.phone.includes('91') ? order.phone : '91'+order.phone}?text=Hello ${order.customerName}, this is regarding your order from SHREE RAM MEDICAL.`, '_blank')}
                          className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
                         >
                           <MessageSquare size={24} />
                         </button>
                         <button className="p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-slate-900 transition-all"><Eye size={24} /></button>
                     </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-[2.5rem] p-6 mb-8 border border-white relative overflow-hidden">
                     <div className="space-y-4">
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-white rounded-xl text-emerald-500 shadow-sm"><MapPin size={18} /></div>
                           <div className="text-[11px] font-black text-slate-600 leading-relaxed uppercase tracking-widest">{order.address}</div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white rounded-xl text-blue-500 shadow-sm"><Package size={18} /></div>
                           <div className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                              {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
                     <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Grand Total</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{order.totalAmount}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.paymentMethod === 'UPI' ? 'bg-indigo-600 text-white' : 'bg-amber-100 text-amber-700'}`}>
                              {order.paymentMethod}
                           </span>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button onClick={() => window.open(`tel:${order.phone}`)} className="flex-grow sm:flex-none p-5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
                           <Phone size={24} />
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order._id, order.status)}
                          className="flex-grow sm:flex-none bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                           <span>Update Status</span>
                           <ArrowUpRight size={18} />
                        </button>
                     </div>
                  </div>
               </motion.div>
             ))
           )}

           {(activeTab === 'Prescriptions' ? prescriptions.length === 0 : orders.length === 0) && (
              <div className="col-span-full py-20 text-center">
                 <ShoppingBag size={80} className="mx-auto text-slate-200 mb-6" />
                 <h3 className="text-2xl font-black text-slate-300 italic uppercase">No Data in Pipeline</h3>
              </div>
           )}

           {/* Quick Action Dashboard Tool */}
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group col-span-1 lg:col-span-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                 <div className="space-y-6 max-w-lg text-center md:text-left">
                    <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10">
                       <Zap size={18} fill="currentColor" className="text-amber-400" />
                       <span>Live Broadcast Tools</span>
                    </div>
                    <h2 className="text-4xl font-black italic tracking-tight leading-none">
                       Optimize <span className="text-primary-500 not-italic opacity-50">Local Delivery</span> Routes
                    </h2>
                    <p className="text-slate-400 font-medium leading-relaxed">
                       Automatically group orders by Sitamarhi districts like Madhopur, Sultanpur, and Chak Mahila for rapid delivery dispatch.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <button className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-4 group/btn">
                       <LayoutGrid size={32} className="text-primary-400 group-hover/btn:scale-125 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
                    </button>
                    <button className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-4 group/btn">
                       <Activity size={32} className="text-blue-400 group-hover/btn:scale-125 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Live Stats</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default ManageOrders;
