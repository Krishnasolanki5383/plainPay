import React from 'react';

const Card = ({ children, title, subtitle, footer, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-50">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      
      <div className="flex-1 p-6">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
