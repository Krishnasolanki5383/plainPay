import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Calendar, Wallet, HelpCircle, LogOut, Plus } from 'lucide-react';
import { selectUI, logout, openAddTransactionModal } from '../../store';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: Calendar, label: 'Subscriptions', path: '/subscriptions' },
  { icon: Wallet, label: 'Budgets', path: '/budgets' },
];

const Sidebar = () => {
  const { sidebarOpen } = useSelector(selectUI);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside 
      className={`bg-white text-gray-600 fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 transform border-r border-gray-100 overflow-hidden ${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
              <div className="w-4 h-4 bg-transparent border-2 border-white rounded-sm flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className={`transition-opacity ${!sidebarOpen && 'lg:hidden'}`}>
              <h1 className="font-bold text-xl text-emerald-600 leading-tight">PlainPay</h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider">FINANCIAL SERENITY</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600 font-medium' 
                    : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className={`text-sm transition-opacity ${!sidebarOpen && 'lg:hidden'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 flex flex-col gap-2">
          <button 
            onClick={() => dispatch(openAddTransactionModal())}
            className={`w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl transition-colors mb-4 ${!sidebarOpen && 'lg:px-0 lg:justify-center'}`}
            title="Add Transaction"
          >
            <Plus size={20} />
            <span className={`text-sm font-medium transition-opacity ${!sidebarOpen && 'lg:hidden'}`}>
              Add Transaction
            </span>
          </button>

          <Link 
            to="/help" 
            className={`flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group ${!sidebarOpen && 'lg:justify-center lg:px-0'}`}
            title="Help"
          >
            <HelpCircle size={20} className="flex-shrink-0" />
            <span className={`text-sm font-medium transition-opacity ${!sidebarOpen && 'lg:hidden'}`}>
              Help
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group ${!sidebarOpen && 'lg:justify-center lg:px-0'}`}
            title="Logout"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`text-sm font-medium transition-opacity ${!sidebarOpen && 'lg:hidden'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
