import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeAddTransactionModal, selectUI } from '../../store';

const AddTransactionModal = ({ onTransactionAdded }) => {
  const dispatch = useDispatch();
  const { isAddTransactionModalOpen } = useSelector(selectUI);
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Groceries',
    account: 'Wallet • PlainPay',
    type: 'expense'
  });
  
  const [loading, setLoading] = useState(false);

  if (!isAddTransactionModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert amount to negative if it's an expense
    const finalAmount = formData.type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount));
    
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, amount: finalAmount })
      });
      
      if (response.ok) {
        setFormData({ name: '', amount: '', category: 'Groceries', account: 'Wallet • PlainPay', type: 'expense' });
        dispatch(closeAddTransactionModal());
        if (onTransactionAdded) onTransactionAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-slate-800">Add Transaction</h2>
          <button 
            onClick={() => dispatch(closeAddTransactionModal())}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${formData.type === 'expense' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setFormData({...formData, type: 'expense'})}
            >
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${formData.type === 'income' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setFormData({...formData, type: 'income'})}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Merchant / Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Starbucks"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  required
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white"
              >
                <option>Groceries</option>
                <option>Dining Out</option>
                <option>Transport</option>
                <option>Travel</option>
                <option>Bills</option>
                <option>Transfer</option>
                <option>Misc</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account</label>
            <select 
              name="account"
              value={formData.account}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none bg-white"
            >
              <option>Wallet • PlainPay</option>
              <option>Visa • Corporate</option>
              <option>Amex • Gold Card</option>
              <option>UPI • HDFC Bank</option>
              <option>ACH • Chase Checking</option>
            </select>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-semibold py-3.5 rounded-xl shadow-sm disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? 'Adding...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
