import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import SocialButtons from './SocialButtons';
import PasswordStrength from './PasswordStrength';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

const inputClass = (touched, error) =>
  `w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all duration-200 ${
    touched && error
      ? 'border-red-400 bg-red-50'
      : 'border-gray-200 focus:border-green-700 focus:ring-2 focus:ring-green-100'
  }`;

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: { fullName: '', email: '', password: '', terms: false },
    validationSchema,
    onSubmit: (values) => {
      console.log('Register payload:', values);
    },
  });

  const f = formik;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-3xl font-bold mb-1" style={{ color: '#111827' }}>
        Create Account
      </h2>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
        Start your journey to better financial health today.
      </p>

      <SocialButtons mode="signup" />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
        <span className="text-xs uppercase tracking-widest" style={{ color: '#9ca3af' }}>
          or continue with email
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#e5e7eb' }} />
      </div>

      <form onSubmit={f.handleSubmit} className="flex flex-col gap-4" noValidate>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
            Full Name
          </label>
          <input
            id="register-fullname"
            type="text"
            placeholder="John Doe"
            {...f.getFieldProps('fullName')}
            className={inputClass(f.touched.fullName, f.errors.fullName)}
          />
          {f.touched.fullName && f.errors.fullName && (
            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{f.errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
            Email Address
          </label>
          <input
            id="register-email"
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
          <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="••••••••"
            {...f.getFieldProps('password')}
            className={inputClass(f.touched.password, f.errors.password)}
          />
          <PasswordStrength password={f.values.password} />
          {f.touched.password && f.errors.password && (
            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{f.errors.password}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <input
            id="register-terms"
            type="checkbox"
            {...f.getFieldProps('terms')}
            className="mt-0.5 accent-green-700 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="register-terms" className="text-xs cursor-pointer" style={{ color: '#6b7280' }}>
            By signing up, you agree to our{' '}
            <a href="#" className="font-medium hover:underline" style={{ color: '#15803d' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="font-medium hover:underline" style={{ color: '#15803d' }}>Privacy Policy</a>.
          </label>
        </div>
        {f.touched.terms && f.errors.terms && (
          <p className="text-xs -mt-2" style={{ color: '#ef4444' }}>{f.errors.terms}</p>
        )}

        {/* Submit */}
        <button
          id="register-submit-btn"
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#14532d' }}
        >
          Create Account
        </button>
      </form>

      {/* Security badge */}
      <div className="mt-5 p-4 rounded-xl flex gap-3" style={{ backgroundColor: '#f0fdf4' }}>
        <Lock size={18} style={{ color: '#15803d', marginTop: '2px', flexShrink: 0 }} />
        <div>
          <p className="text-xs font-semibold" style={{ color: '#15803d' }}>Secure & Encrypted</p>
          <p className="text-xs mt-0.5" style={{ color: '#166534' }}>
            Your connection is secured using industry-standard TLS encryption. We never share your data.
          </p>
        </div>
      </div>

      <p className="text-center text-sm mt-6" style={{ color: '#6b7280' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-semibold hover:underline" style={{ color: '#15803d' }}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
