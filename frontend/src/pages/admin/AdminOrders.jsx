import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Box,
  MapPin,
  Phone,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Search
} from 'lucide-react';
import { getImageUrl } from '../../config';

// Admin Secret for the basic security check we added to backend
const ADMIN_SECRET = 'shreeram-admin-2024';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/orders', {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders. Check your admin credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      toast.loading("Updating order...", { id: 'status' });
      await axios.put(`/api/orders/${orderId}`, 
        { status: newStatus },
        { headers: { 'x-admin-secret': ADMIN_SECRET } }
      );
      toast.success(`Order set to ${newStatus}`, { id: 'status' });
      // Refresh list
      fetchOrders();
    } catch (err) {
      toast.error("Status update failed.", { id: 'status' });
    }
  };

  // Stats calculation
  const totalOrders = orders.length;
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  }).length;

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm) ||
    o._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Placed': return <Package className="text-blue-500" />;
      case 'Packed': return <Box className="text-amber-500" />;
      case 'Out for Delivery': return <Truck className="text-indigo-500" />;
      case 'Delivered': return <CheckCircle className="text-emerald-500" />;
      default: return <AlertCircle className="text-slate-400" />;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic">
              <ShoppingBag className="text-primary-500" size={32} />
              ADMIN <span className="text-primary-500">ORDERS</span> DASHBOARD
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
              Manage medicine deliveries and status
            </p>
          </div>

          <div className="flex bg-white rounded-3xl p-4 shadow-xl shadow-slate-900/5 items-center gap-8 border border-slate-100">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 text-primary-500 rounded-2xl"><TrendingUp size={24} /></div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Orders</p>
                   <p className="text-2xl font-black text-slate-900 leading-none">{totalOrders}</p>
                </div>
             </div>
             <div className="w-px h-10 bg-slate-100" />
             <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl"><Clock size={24} /></div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Today's Orders</p>
                   <p className="text-2xl font-black text-slate-900 leading-none">{todayOrders}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-slate-900/5 flex flex-col md:flex-row gap-4 items-center border border-slate-100">
           <div className="flex-grow relative w-full">
              <input 
                type="text" 
                placeholder="Search by name, phone or order ID..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           </div>
           <button onClick={fetchOrders} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all active:scale-95">
             Refresh Data
           </button>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Info</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Items</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Full Address</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Financials</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                  <motion.tr 
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Customer */}
                    <td className="p-6 align-top">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-black text-xs">
                          {order.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 uppercase text-xs">{order.customerName}</p>
                          <div className="flex items-center gap-2 text-slate-400 mt-1">
                            <Phone size={12} />
                            <p className="text-[10px] font-bold">{order.phone}</p>
                          </div>
                          <p className="text-[9px] text-slate-300 font-bold mt-1 uppercase tracking-tighter">ID: {order._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="p-6 align-top">
                      <div className="space-y-2 max-w-[200px]">
                         {order.items.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-center text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                             <span className="font-black text-slate-800 line-clamp-1 truncate">{item.name}</span>
                             <span className="text-primary-600 font-black ml-2">x{item.quantity}</span>
                           </div>
                         ))}
                      </div>
                    </td>

                    {/* Address */}
                    <td className="p-6 align-top max-w-[250px]">
                      <div className="flex gap-2">
                        <MapPin size={14} className="text-slate-300 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase">{order.address}</p>
                          {order.landmark && <p className="text-[9px] font-black text-amber-500 mt-1 italic uppercase tracking-widest">Near: {order.landmark}</p>}
                        </div>
                      </div>
                    </td>

                    {/* Financials */}
                    <td className="p-6 align-top">
                       <div className="space-y-1">
                          <p className="text-lg font-black text-slate-900 tracking-tighter italic">₹{order.totalAmount}</p>
                          <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full w-max ${order.paymentMethod === 'UPI' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                             {order.paymentMethod}
                          </div>
                       </div>
                    </td>

                    {/* Status Display */}
                    <td className="p-6 align-top">
                       <div className="flex items-center gap-2">
                          <div className="p-2 bg-slate-50 rounded-lg">{getStatusIcon(order.status)}</div>
                          <div>
                             <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{order.status}</p>
                             <p className="text-[9px] font-bold text-slate-400">{new Date(order.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</p>
                          </div>
                       </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 align-top">
                       <div className="flex flex-col gap-2">
                          <select 
                            value={order.status}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            className="bg-slate-100 border-none rounded-xl py-2 px-3 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary-500/20 outline-none cursor-pointer"
                          >
                             <option value="Placed">Placed</option>
                             <option value="Packed">Packed</option>
                             <option value="Out for Delivery">Out for Delivery</option>
                             <option value="Delivered">Delivered</option>
                             <option value="Cancelled">Cancelled</option>
                          </select>
                       </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-slate-400">
                      <Box className="mx-auto mb-4 opacity-20" size={64} />
                      <p className="font-black uppercase tracking-widest text-xs">No orders found in pipeline</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-lg text-center md:text-left">
                 <h3 className="text-2xl font-black italic tracking-tight">Need to contact the <span className="text-primary-500">customer?</span></h3>
                 <p className="text-slate-400 font-medium text-sm">Use the provided phone numbers for delivery coordination. All orders are processed in real-time.</p>
              </div>
              <div className="flex gap-4">
                 <button className="flex items-center gap-3 bg-white/10 px-8 py-4 rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-widest">
                    Export CSV
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
