import React from 'react';

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const LABELS = ['', 'Weak', 'Fair', 'Fairly Strong', 'Strong'];

const BAR_COLORS = {
  1: '#ef4444',
  2: '#f59e0b',
  3: '#22c55e',
  4: '#15803d',
};

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const score = getStrength(password);
  const color = BAR_COLORS[score] || '#e5e7eb';

  return (
    <div className="mt-2 flex items-center gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{ backgroundColor: i <= score ? color : '#e5e7eb' }}
        />
      ))}
      <span
        className="text-xs whitespace-nowrap ml-1"
        style={{ color: '#6b7280', minWidth: '76px', textAlign: 'right' }}
      >
        {LABELS[score]}
      </span>
    </div>
  );
};

export default PasswordStrength;
