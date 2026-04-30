import React, { useState, useEffect } from 'react';
import { Coffee, Train, Utensils, Tv, Target, Calendar, ShieldCheck } from 'lucide-react';

const iconMap = {
  'Food & Drink': Utensils,
  'Transport': Train,
  'Entertainment': Tv,
  'Coffee': Coffee, // Will map 'Blue Bottle Coffee' to Coffee if possible
};

const getIconForTransaction = (name, category) => {
  if (name.includes('Coffee')) return Coffee;
  return iconMap[category] || Utensils;
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard data", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const { summary, weeklyTrend, recentTransactions, savingsGoal, upcomingPayment, securityControls } = data;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      {/* Top Card */}
      <div className="bg-white rounded-3xl p-8 flex justify-between items-center shadow-sm">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Good morning, Alex.</h2>
          <p className="text-slate-500 text-lg">
            You've spent <span className="font-bold text-emerald-600">${summary.spentToday}</span> today, mostly on your <span className="font-bold text-slate-700">{summary.topExpenses[0]}</span> and <span className="font-bold text-slate-700">{summary.topExpenses[1]}</span>. You have <span className="font-bold text-blue-600">${summary.remainingBudget}</span> left in your daily budget.
          </p>
        </div>
        
        <div className="bg-[#f3f7fa] rounded-2xl p-6 min-w-[200px] text-center">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase">Daily Remaining</p>
          <p className="text-4xl font-bold text-emerald-600 mb-4">${summary.remainingBudget}</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${(summary.remainingBudget / summary.dailyBudget) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Weekly Trend + Savings) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Trend */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Weekly Trend</h3>
                <p className="text-slate-400 text-sm">Spending across main categories</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-slate-400 font-medium">Food</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span>
                  <span className="text-xs text-slate-400 font-medium">Transport</span>
                </div>
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-2 mt-4 pt-4">
              {weeklyTrend.map((dayData, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full flex flex-col-reverse justify-start h-40 group">
                    <div className="w-full bg-emerald-400 rounded-t-sm transition-all group-hover:opacity-80" style={{ height: `${dayData.food}%` }}></div>
                    <div className="w-full bg-blue-300 rounded-t-md transition-all group-hover:opacity-80 -mb-1" style={{ height: `${dayData.transport}%` }}></div>
                    <div className="w-full bg-slate-100 rounded-t-md transition-all group-hover:opacity-80 -mb-1" style={{ height: `${100 - dayData.food - dayData.transport}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-slate-300">{dayData.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Goals */}
          <div className="bg-[#0f764a] rounded-3xl p-8 text-white relative overflow-hidden shadow-sm">
            {/* Background design elements */}
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full -mr-10 -mb-10 pointer-events-none"></div>
            <div className="absolute right-10 bottom-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Target size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Savings Goals</h3>
              <p className="text-emerald-100 text-sm mb-8 w-2/3">You are {savingsGoal.progressPercentage}% of the way to your {savingsGoal.name}.</p>
              
              <div className="flex justify-between items-end mb-3">
                <span className="text-3xl font-bold">${savingsGoal.currentAmount.toLocaleString()}</span>
                <span className="text-emerald-200 text-sm mb-1">of ${savingsGoal.targetAmount.toLocaleString()}</span>
              </div>
              
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: `${savingsGoal.progressPercentage}%` }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Recent + Upcoming + Security) */}
        <div className="space-y-6">
          
          {/* Recent */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Recent</h3>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">View all</button>
            </div>
            
            <div className="space-y-5">
              {recentTransactions.map((tx) => {
                const Icon = getIconForTransaction(tx.name, tx.category);
                return (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{tx.name}</p>
                        <p className="text-xs text-slate-400">{tx.time} • {tx.category}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700 text-sm">
                      {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 bg-[#f2f8fc] rounded-2xl p-4 flex gap-3">
              <div className="text-emerald-500 mt-0.5">
                <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                  <span className="w-1 h-1 bg-current rounded-full"></span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Tip: You spend 15% more on dining than similar users. Try meal prepping two days a week!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Upcoming Payment */}
            <div className="bg-[#e4ebfd] rounded-3xl p-6 col-span-1 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Upcoming</p>
                <Calendar size={16} className="text-slate-500" />
              </div>
              <p className="text-slate-800 font-bold mb-4">{upcomingPayment.name}</p>
              <p className="text-xs text-slate-500 mb-1">Due in {upcomingPayment.dueInDays} days</p>
              <p className="text-2xl font-bold text-slate-700">${upcomingPayment.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>

            {/* Security Controls */}
            <div className="bg-white rounded-3xl p-6 col-span-1 shadow-sm border border-slate-50">
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Security</p>
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <ShieldCheck size={12} className="text-white" />
                </div>
              </div>
              <p className="text-slate-800 font-bold mb-4">Card Controls</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-600">Online Payments</span>
                  <div className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer ${securityControls.onlinePayments ? 'bg-emerald-400 justify-end' : 'bg-slate-200 justify-start'}`}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-600">Contactless</span>
                  <div className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer ${securityControls.contactless ? 'bg-emerald-400 justify-end' : 'bg-slate-200 justify-start'}`}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
