import React from 'react';
import { Trash2 } from 'lucide-react';

const SubscriptionCard = ({ sub, onDelete }) => {
  const getLogoColors = (colorStr) => {
    // some predefined styles for mock data
    if (colorStr === 'bg-black') return 'bg-black text-red-600';
    if (colorStr === 'bg-green-500') return 'bg-[#1ed760] text-black';
    if (colorStr === 'bg-blue-600') return 'bg-blue-600 text-white';
    if (colorStr === 'bg-red-600') return 'bg-red-600 text-white';
    if (colorStr === 'bg-blue-400') return 'bg-blue-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex flex-col hover:shadow-md transition-shadow h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${getLogoColors(sub.color)} shadow-sm`}>
          {getInitials(sub.name)}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${sub.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
          {sub.status}
        </div>
      </div>
      
      <div className="mb-6 flex-1">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{sub.name}</h3>
        <p className="text-sm text-slate-400">{sub.plan}</p>
      </div>
      
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">Next Renewal</p>
          <p className={`text-sm font-semibold ${sub.status === 'ACTIVE' ? 'text-slate-800' : 'text-slate-400'}`}>{sub.nextRenewal}</p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${sub.status === 'ACTIVE' ? 'text-emerald-500' : 'text-slate-400'}`}>${sub.amount.toFixed(2)}</p>
          <p className="text-[10px] text-slate-400 font-medium">per month</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${sub.status === 'ACTIVE' ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
          {sub.status === 'ACTIVE' ? 'Manage' : 'Reactivate'}
        </button>
        <button 
          onClick={() => onDelete(sub.id)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete Subscription"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
