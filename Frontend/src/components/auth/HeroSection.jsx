import React from 'react';
import heroImg from '../../assets/hero-finance.png';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const features = [
  {
    id: 'feature-security',
    Icon: ShieldCheck,
    title: 'Bank-Grade Security',
    desc: 'Your data is encrypted with 256-bit AES protocols.',
  },
  {
    id: 'feature-insights',
    Icon: TrendingUp,
    title: 'Smart Insights',
    desc: 'Real-time tracking of every dollar you spend or save.',
  },
];

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* Hero image card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ height: '320px' }}
      >
        <img
          src={heroImg}
          alt="Financial dashboard"
          className="w-full h-full object-cover"
        />
        {/* Dark green overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(20, 70, 45, 0.62)' }}
        />
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 p-7 text-white">
          <h1 className="text-3xl font-bold leading-snug mb-2">
            Financial Serenity<br />Starts Here
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
            Join over 2 million users managing their wealth with clarity and confidence.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 gap-4">
        {features.map(({ id, Icon, title, desc }) => (
          <div
            key={id}
            id={id}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <Icon
              size={22}
              className="mb-2"
              style={{ color: '#1a6b45' }}
            />
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>
              {title}
            </h3>
            <p className="text-xs" style={{ color: '#6b7280' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HeroSection;
