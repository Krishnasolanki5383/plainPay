import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import AuthLayout from '../../components/auth/AuthLayout';
import HeroSection from '../../components/auth/HeroSection';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Create Account — PlainPay</title>
        <meta
          name="description"
          content="Sign up for PlainPay and start managing your expenses and budget with clarity."
        />
      </Helmet>
      <AuthLayout
        heroContent={<HeroSection />}
        formContent={<RegisterForm />}
      />
    </HelmetProvider>
  );
};

export default RegisterPage;
