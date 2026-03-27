import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Activity, DollarSign, ChevronRight, Clock, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = [
        { label: "Total Orders", value: "1,245", icon: <ShoppingCart />, color: "bg-blue-500", trend: "+12.5%" },
        { label: "Revenue", value: "₹45,280", icon: <DollarSign />, color: "bg-emerald-500", trend: "+8.2%" },
        { label: "Active Users", value: "854", icon: <Users />, color: "bg-purple-500", trend: "+5.1%" },
        { label: "Inventory", value: "245 Items", icon: <Package />, color: "bg-amber-500", trend: "Normal" }
    ];

    const recentOrders = [
        { id: "SRM-2024-0001", customer: "Amit Sharma", status: "Out for Delivery", total: "₹540" },
        { id: "SRM-2024-0002", customer: "Suresh Prasad", status: "Packed", total: "₹1,250" },
        { id: "SRM-2024-0003", customer: "Mehul Kumar", status: "Placed", total: "₹450" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Admin Header */}
            <div className="bg-white border-b border-slate-100 pt-10 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full">
                                <Activity size={14} className="text-primary-500 animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">SYSTEM OPERATIONAL</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.8] tracking-tight italic">
                                Admin <span className="text-primary-500 not-italic border-b-8 border-primary-500/10">Dashboard</span>
                            </h1>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 group hover:border-primary-100 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-4 rounded-2xl text-white ${stat.color} shadow-lg shadow-black/5`}>{stat.icon}</div>
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight italic">{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders Overview */}
                    <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 shadow-2xl shadow-slate-900/5 border border-slate-50">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight italic">Live <span className="text-primary-500 font-black not-italic">Orders</span></h3>
                            <Link to="/admin/orders" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                                View Pipeline <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map((order, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-primary-100 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors"><Zap size={18} /></div>
                                        <div>
                                            <p className="font-black text-slate-800 leading-none mb-1">{order.customer}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {order.id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900 leading-none mb-1">{order.total}</p>
                                        <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{order.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="text-lg font-black italic mb-6">Quick <span className="text-primary-500">Actions</span></h3>
                            <div className="space-y-4">
                                <Link to="/admin/medicines" className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-primary-500/50">
                                    <Package size={20} className="text-primary-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Manage Inventory</span>
                                </Link>
                                <button className="w-full flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-primary-500/50">
                                    <Users size={20} className="text-blue-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Customer Support</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary-900/20 relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mb-16" />
                            <div className="flex items-center gap-3 mb-4">
                                <Activity size={20} className="text-primary-200" />
                                <h4 className="font-black italic text-sm tracking-tight">Real-time Performance</h4>
                            </div>
                            <p className="text-[10px] font-bold text-primary-100 leading-relaxed uppercase tracking-widest opacity-80 mb-6">
                                Your shop is performing 15% better than last week. Keep managing inventory effectively.
                            </p>
                            <div className="bg-white/20 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase">Service Radius</span>
                                <span className="font-black italic">10 KM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
