import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Subscriptions from '../pages/Subscriptions';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            {/* Add more private routes here */}
          </Route>
        </Route>

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
