import React from 'react';
import { Shield, HelpCircle } from 'lucide-react';

const AuthLayout = ({ heroContent, formContent }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f3f4f6' }}>

      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-between shadow-sm">
        <span
          className="font-bold text-xl tracking-tight"
          style={{ color: '#1a6b45' }}
        >
          PlainPay
        </span>
        <div className="flex items-center gap-4" style={{ color: '#9ca3af' }}>
          <button
            id="help-btn"
            className="hover:text-gray-600 transition"
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>
          <button
            id="security-btn"
            className="hover:text-gray-600 transition"
            aria-label="Security"
          >
            <Shield size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-10 items-center">

          {/* Left: Hero */}
          <div className="flex-1 w-full max-w-lg">
            {heroContent}
          </div>

          {/* Right: Form */}
          <div className="flex-1 w-full max-w-md">
            {formContent}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 px-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-2"
        style={{ color: '#9ca3af' }}
      >
        <span>© 2024 PlainPay Financial Inc. All rights reserved.</span>
        <div className="flex gap-6">
          {['Security', 'Privacy', 'Support'].map((link) => (
            <a
              key={link}
              href="#"
              id={`footer-${link.toLowerCase()}`}
              className="hover:text-gray-600 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default AuthLayout;
