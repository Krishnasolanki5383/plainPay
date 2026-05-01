import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUI, setSidebar } from '../../store';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AddTransactionModal from '../common/AddTransactionModal';

const DashboardLayout = () => {
  const { sidebarOpen } = useSelector(selectUI);
  const dispatch = useDispatch();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      dispatch(setSidebar(false));
    }
  }, [location.pathname, dispatch]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setSidebar(true));
      } else {
        dispatch(setSidebar(false));
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f8f9fd] flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => dispatch(setSidebar(false))}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        <Navbar />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <AddTransactionModal />
    </div>
  );
};

export default DashboardLayout;
