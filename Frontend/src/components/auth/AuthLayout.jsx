import React from 'react';
import { Shield, HelpCircle } from 'lucide-react';

const AuthLayout = ({ heroContent, formContent }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* Header */}
      <header className="bg-white shadow-sm z-10 shrink-0">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight text-emerald-800">
            PlainPay
          </span>
          <div className="flex items-center gap-4 text-gray-400">
            <HelpCircle size={16} />
            <Shield size={16} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 overflow-hidden relative">
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 transform scale-[0.85] sm:scale-90 lg:scale-[0.95] xl:scale-100 transition-transform origin-center">
          
          {/* Left: Hero */}
          <div className="hidden lg:block w-full max-w-md shrink-0">
            {heroContent}
          </div>

          {/* Right: Form */}
          <div className="w-full max-w-sm shrink-0">
            {formContent}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 shrink-0">
        <div className="max-w-5xl mx-auto px-6 h-10 flex items-center justify-between text-[10px] text-gray-400">
          <span>© 2024 PlainPay Financial Inc.</span>
          <div className="flex gap-4">
            {['Security', 'Privacy', 'Support'].map((link) => (
              <a key={link} href="#" className="hover:text-emerald-700">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AuthLayout;
