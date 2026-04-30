import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Bell, Settings, User } from 'lucide-react';
import { selectUI, toggleSidebar } from '../../store';
import { useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/':
    case '/dashboard':
      return 'Overview';
    case '/transactions':
      return 'Transactions';
    case '/subscriptions':
      return 'Subscriptions';
    case '/budgets':
      return 'Budgets';
    default:
      return 'Overview';
  }
};

const Navbar = () => {
  const { sidebarOpen } = useSelector(selectUI);
  const dispatch = useDispatch();
  const location = useLocation();

  const title = getPageTitle(location.pathname);

  return (
    <header className="h-24 bg-transparent flex items-center justify-between px-8 sticky top-0 z-10 pt-4">
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleSidebar())} className="text-gray-500 hover:text-gray-700 lg:hidden">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-orange-200">
          <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
