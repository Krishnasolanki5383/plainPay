import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AddTransactionModal from '../common/AddTransactionModal';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fd] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Navbar />

        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
      
      <AddTransactionModal />
    </div>
  );
};

export default DashboardLayout;
