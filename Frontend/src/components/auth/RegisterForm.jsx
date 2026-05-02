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

import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { fullName: '', email: '', password: '', terms: false },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        const response = await fetch('https://plainpay.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.fullName,
            email: values.email,
            password: values.password
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          dispatch(loginSuccess(data));
          navigate('/dashboard');
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-1 text-gray-900">
        Create Account
      </h2>
      <p className="text-xs mb-4 text-gray-500">
        Start your journey to better financial health today.
      </p>

      <SocialButtons mode="signup" />

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] uppercase tracking-widest text-gray-400">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <form onSubmit={f.handleSubmit} className="flex flex-col gap-3" noValidate>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-700">
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
            <p className="text-[10px] mt-1 text-red-500">{f.errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-700">
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
            <p className="text-[10px] mt-1 text-red-500">{f.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-700">
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
            <p className="text-[10px] mt-1 text-red-500">{f.errors.password}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="register-terms"
            type="checkbox"
            {...f.getFieldProps('terms')}
            className="mt-0.5 accent-emerald-700 w-3.5 h-3.5 cursor-pointer"
          />
          <label htmlFor="register-terms" className="text-[10px] leading-relaxed cursor-pointer text-gray-500">
            I agree to the <a href="#" className="text-emerald-700 font-medium hover:underline">Terms</a> and <a href="#" className="text-emerald-700 font-medium hover:underline">Privacy</a>.
          </label>
        </div>

        {/* Submit */}
        <button
          id="register-submit-btn"
          type="submit"
          className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:bg-emerald-900 active:scale-95 bg-emerald-800"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-xs mt-4 text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
