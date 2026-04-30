import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingBag, Banknote, Plane, Car, Zap, MoreHorizontal, ArrowUpRight, Plus } from 'lucide-react';

const categoryConfig = {
  'Groceries': { icon: ShoppingBag, color: 'bg-orange-50 text-orange-500' },
  'Transfer': { icon: Banknote, color: 'bg-green-50 text-green-500' },
  'Travel': { icon: Plane, color: 'bg-blue-50 text-blue-500' },
  'Transport': { icon: Car, color: 'bg-purple-50 text-purple-500' },
  'Bills': { icon: Zap, color: 'bg-red-50 text-red-500' },
  'Dining Out': { icon: ShoppingBag, color: 'bg-orange-50 text-orange-500' },
  'Misc': { icon: MoreHorizontal, color: 'bg-gray-50 text-gray-500' },
};

const Transactions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  const fetchTransactions = () => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch transactions", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
    
    // Listen to custom event for refetching if modal adds a transaction
    // Or we could use Redux, but keeping it simple for now
    const interval = setInterval(fetchTransactions, 5000); // Poll every 5s for demo
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const { summary, transactions } = data;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-2">Transactions</h1>
          <p className="text-slate-500">Monitor your financial flow across all linked accounts.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search merchants..." 
              className="pl-10 pr-4 py-3 bg-white rounded-full text-sm border-none shadow-sm focus:ring-2 focus:ring-emerald-100 outline-none w-64 text-slate-700"
            />
          </div>
          <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-full text-sm font-semibold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Spent */}
        <div className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
            <Banknote size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Spent (Monthly)</p>
            <h3 className="text-4xl font-bold text-slate-800 mb-6">${summary.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
            <div className="flex items-center gap-1 text-red-500 text-sm font-bold">
              <ArrowUpRight size={16} />
              <span>12.5% vs last month</span>
            </div>
          </div>
        </div>

        {/* Highest Category */}
        <div className="bg-emerald-400 rounded-3xl p-8 shadow-sm text-white relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 text-emerald-300 opacity-30 group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-2">Highest Category</p>
            <h3 className="text-4xl font-bold mb-6">{summary.highestCategory}</h3>
            <p className="text-emerald-100 text-sm font-medium">{summary.highestCategoryPercentage}% of total spend</p>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Connected Accounts</p>
          <h3 className="text-4xl font-bold text-slate-800 mb-8">{summary.connectedAccounts < 10 ? `0${summary.connectedAccounts}` : summary.connectedAccounts}</h3>
          
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-white shadow-sm"><Banknote size={14} /></div>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-white shadow-sm -ml-3"><Banknote size={14} /></div>
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center border border-white shadow-sm -ml-3"><Banknote size={14} /></div>
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center border border-white shadow-sm -ml-3 text-[10px] font-bold">+5</div>
          </div>
        </div>

      </div>

      {/* Unified Feed */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
          <h2 className="text-2xl font-bold text-slate-800">Unified Feed</h2>
          
          <div className="flex bg-gray-50 p-1 rounded-full">
            {['All', 'UPI', 'Cards'].map(type => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === type ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => {
            const config = categoryConfig[tx.category] || categoryConfig['Misc'];
            const Icon = config.icon;
            const isPositive = tx.amount > 0;
            
            return (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-0.5">{tx.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <Banknote size={12} />
                      <span>{tx.account}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold text-lg ${isPositive ? 'text-emerald-500' : 'text-slate-800'}`}>
                    {isPositive ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{tx.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
            Load more transactions v
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Transactions;
