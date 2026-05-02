import React, { useState, useEffect } from 'react';
import { Wallet, Settings, TrendingUp, PieChart } from 'lucide-react';
import EditBudgetModal from '../components/common/EditBudgetModal';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://plainpay.onrender.com/api/budgets');
      if (res.ok) {
        const data = await res.json();
        setBudgets(data);
      }
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleEditClick = (budget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  if (loading && budgets.length === 0) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const overallPercentage = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto pb-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Monthly Budgets</h1>
        <button className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
          <Settings size={16} />
          Manage Categories
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-400 rounded-full -mr-10 -mt-10 pointer-events-none opacity-50"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-400/50 rounded-xl">
                <Wallet size={24} className="text-white" />
              </div>
              <p className="font-semibold text-emerald-50 tracking-wide">Safe to Spend</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">${Math.max(0, totalBudgeted - totalSpent).toFixed(2)}</p>
              <p className="text-emerald-100 text-sm">Remaining across all categories</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <TrendingUp size={24} className="text-blue-500" />
            </div>
            <p className="font-semibold text-slate-600 tracking-wide">Total Budgeted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-800 mb-1">${totalBudgeted.toFixed(2)}</p>
            <p className="text-slate-500 text-sm">For this month</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-xl">
              <PieChart size={24} className="text-orange-500" />
            </div>
            <p className="font-semibold text-slate-600 tracking-wide">Total Spent</p>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1">
              <p className="text-3xl font-bold text-slate-800">${totalSpent.toFixed(2)}</p>
              <span className="text-sm font-semibold text-slate-500 mb-1">{overallPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-slate-800 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, overallPercentage)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Budgets List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-50">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Category Breakdown</h2>
        
        <div className="space-y-8">
          {budgets.map((budget) => {
            const percentage = (budget.spentAmount / budget.totalAmount) * 100;
            const remaining = budget.totalAmount - budget.spentAmount;
            
            return (
              <div key={budget.id} className="group">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${budget.color} bg-opacity-20`}>
                       {/* Abstract icon based on category logic could go here, fallback to general icon */}
                       <div className={`w-4 h-4 rounded-full ${budget.color}`}></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{budget.category}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {percentage.toFixed(0)}% of ${budget.totalAmount.toFixed(2)} used
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <p className="font-bold text-slate-800 text-lg">
                        ${Math.max(0, remaining).toFixed(2)} <span className="text-sm font-semibold text-slate-500">left</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => handleEditClick(budget)}
                      className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-100 hover:text-emerald-600 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden relative">
                  <div 
                    className={`absolute top-0 left-0 h-full ${budget.color} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EditBudgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        budget={selectedBudget}
        onUpdate={fetchBudgets}
      />
    </div>
  );
};

export default Budgets;
