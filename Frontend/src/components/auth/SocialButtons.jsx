import React from 'react';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.2 33.6 29.7 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6-6C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3 0 5.7 1.1 7.8 2.9l6-6C34.5 6.5 29.5 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
    <path fill="#FBBC05" d="M24 44c5.4 0 10.2-1.8 13.9-4.9l-6.5-5.3C29.4 35.6 26.8 36.5 24 36.5c-5.6 0-10.4-3.8-12.1-9l-7 5.4C8.2 40.1 15.5 44 24 44z"/>
    <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1 2.7-2.8 4.9-5.2 6.3l6.5 5.3C41.1 36.8 44.5 30.8 44.5 24c0-1.3-.1-2.7-.2-4z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const SocialButtons = ({ mode = 'signup' }) => {
  const label = mode === 'signup' ? 'Sign up' : 'Sign in';

  return (
    <div className="flex flex-col gap-3">
      <button
        id="google-auth-btn"
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border text-sm font-medium transition-all hover:bg-gray-50 active:scale-95"
        style={{ borderColor: '#e5e7eb', color: '#374151', background: '#fff' }}
      >
        <GoogleIcon />
        {label} with Google
      </button>

      <button
        id="apple-auth-btn"
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border text-sm font-medium transition-all hover:bg-gray-50 active:scale-95"
        style={{ borderColor: '#e5e7eb', color: '#374151', background: '#fff' }}
      >
        <AppleIcon />
        {label} with Apple
      </button>
    </div>
  );
};

export default SocialButtons;
