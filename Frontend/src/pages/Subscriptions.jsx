import React, { useState, useEffect } from 'react';
import { Calendar, PlaySquare, Plus, Lightbulb } from 'lucide-react';
import SubscriptionCard from '../components/common/SubscriptionCard';
import AddSubscriptionModal from '../components/common/AddSubscriptionModal';

const Subscriptions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://plainpay.onrender.com/api/subscriptions');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch subscriptions data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://plainpay.onrender.com/api/subscriptions/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error("Failed to delete subscription", err);
    }
  };

  if (loading || !data) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const { summary, subscriptions } = data;

  return (
    <div className="max-w-6xl mx-auto pb-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Renewals</h1>
      </div>

      {/* Top Banner section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Expenditure */}
        <div className="lg:col-span-2 bg-emerald-400 rounded-3xl p-8 relative overflow-hidden text-white shadow-sm flex flex-col justify-between min-h-[220px]">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/30 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
            <PlaySquare size={120} strokeWidth={1.5} />
          </div>
          
          <div className="relative z-10">
            <p className="text-sm font-semibold tracking-wider text-emerald-100 uppercase mb-2">Monthly Expenditure</p>
            <p className="text-lg text-emerald-50 mb-8">Total Monthly Subscriptions: <span className="font-bold">${summary.totalMonthlyCost.toFixed(2)}</span></p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center gap-3 w-full sm:w-1/2">
                <Calendar className="text-white shrink-0" size={24} />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-wider text-emerald-100 uppercase truncate">Next Renewal</p>
                  <p className="text-sm font-semibold truncate">{summary.nextRenewal.name} on {summary.nextRenewal.date}</p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center gap-3 w-full sm:w-1/2">
                <div className="rotate-45 shrink-0">
                  <Plus className="text-white" size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-wider text-emerald-100 uppercase truncate">Savings Identified</p>
                  <p className="text-sm font-semibold truncate">${summary.savingsIdentified.toFixed(2)} vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Split */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-2">Category Split</h3>
          <p className="text-slate-500 text-sm mb-6 pr-4">You're spending mostly on {summary.categorySplit[0]?.name}.</p>
          
          <div className="space-y-6">
            {summary.categorySplit.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">{cat.name}</span>
                  <span className="text-sm font-bold text-slate-800">${cat.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Subscriptions Header */}
      <div className="flex justify-between items-center mt-10 mb-6">
        <h2 className="text-xl font-bold text-slate-800">Active Subscriptions</h2>
      </div>

      {/* Grid of Subscriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subscriptions.map((sub) => (
          <SubscriptionCard key={sub.id} sub={sub} onDelete={handleDelete} />
        ))}
        
        {/* Add New Subscription Empty State */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all min-h-[250px] group h-full"
        >
          <div className="w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} className="text-slate-400 group-hover:text-emerald-500" />
          </div>
          <span className="font-bold">Add New Subscription</span>
        </button>
      </div>

      {/* Tip Banner */}
      <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-50 flex items-center justify-center relative shrink-0">
          <Lightbulb size={28} className="text-indigo-400 sm:w-8 sm:h-8" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold border-2 border-white">!</div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 mb-2">Did you know?</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            We've noticed you have two music streaming services active. By canceling one, you could save up to <span className="font-bold text-emerald-500">$120.00 per year</span>. Would you like to review these services?
          </p>
        </div>
        <button className="w-full sm:w-auto bg-slate-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors shrink-0 mt-4 sm:mt-0">
          Review Now
        </button>
      </div>

      <AddSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={fetchData} 
      />
    </div>
  );
};

export default Subscriptions;
