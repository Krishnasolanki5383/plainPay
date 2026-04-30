import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import HeroSection from '../../components/auth/HeroSection';
import SocialButtons from '../../components/auth/SocialButtons';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const inputClass = (touched, error) =>
  `w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all duration-200 ${
    touched && error
      ? 'border-red-400 bg-red-50'
      : 'border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100'
  }`;

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store';

const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          dispatch(loginSuccess(data));
        } else {
          dispatch(loginFailure(data.message));
          alert(data.message);
        }
      } catch (error) {
        dispatch(loginFailure('Network error'));
        alert('Network error');
      }
    },
  });

  const f = formik;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-3xl font-bold mb-1" style={{ color: '#111827' }}>
        Welcome Back
      </h2>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
        Sign in to continue managing your finances.
      </p>

      <SocialButtons mode="signin" />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
        <span className="text-xs uppercase tracking-widest" style={{ color: '#9ca3af' }}>
          or continue with email
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
      </div>

      <form onSubmit={f.handleSubmit} className="flex flex-col gap-4" noValidate>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="john@example.com"
            {...f.getFieldProps('email')}
            className={inputClass(f.touched.email, f.errors.email)}
          />
          {f.touched.email && f.errors.email && (
            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{f.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium" style={{ color: '#374151' }}>
              Password
            </label>
            <a href="#" className="text-xs hover:underline" style={{ color: '#15803d' }}>
              Forgot password?
            </a>
          </div>
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            {...f.getFieldProps('password')}
            className={inputClass(f.touched.password, f.errors.password)}
          />
          {f.touched.password && f.errors.password && (
            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{f.errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          id="login-submit-btn"
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#14532d' }}
        >
          Sign In
        </button>
      </form>

      {/* Security badge */}
      <div className="mt-5 p-4 rounded-xl flex gap-3" style={{ backgroundColor: '#f0fdf4' }}>
        <Lock size={18} style={{ color: '#15803d', marginTop: '2px', flexShrink: 0 }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: '#15803d' }}>Secure & Encrypted</p>
          <p className="text-xs mt-0.5" style={{ color: '#166534' }}>
            Your connection is secured using industry-standard TLS encryption.
          </p>
        </div>
      </div>

      <p className="text-center text-sm mt-6" style={{ color: '#6b7280' }}>
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold hover:underline" style={{ color: '#15803d' }}>
          Create Account
        </Link>
      </p>
    </div>
  );
};

const LoginPage = () => (
  <HelmetProvider>
    <Helmet>
      <title>Sign In — PlainPay</title>
      <meta name="description" content="Sign in to your PlainPay account to manage expenses and budgets." />
    </Helmet>
    <AuthLayout heroContent={<HeroSection />} formContent={<LoginForm />} />
  </HelmetProvider>
);

export default LoginPage;
