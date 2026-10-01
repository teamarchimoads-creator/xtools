import React from 'react';
import { CheckCircle2, Truck, FileText, Wrench, BadgeIndianRupee, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Why Us | Auto Diagnostic Store',
  description: 'Learn why Auto Diagnostic Store is India\'s trusted destination for professional XTOOL automotive diagnostic scanners and tools.'
};

export default function WhyUsPage() {
  const features = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      title: "100% Genuine Products",
      description: "We are an authorised dealer of XTOOL diagnostic scanners. Every product comes with official warranty and genuine accessories."
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      title: "Pan-India Delivery",
      description: "We ship to every corner of India. Fast and reliable delivery with tracking so you know exactly where your order is."
    },
    {
      icon: <FileText className="w-8 h-8 text-slate-400" />,
      title: "GST Invoice Available",
      description: "Get proper GST invoices for all purchases. Perfect for businesses, garages, and professionals who need tax documentation."
    },
    {
      icon: <Wrench className="w-8 h-8 text-rose-500" />,
      title: "Expert Technical Support",
      description: "Our team of diagnostic tool experts helps you choose the right scanner and provides pre & post-sale technical assistance."
    },
    {
      icon: <BadgeIndianRupee className="w-8 h-8 text-amber-500" />,
      title: "Best Prices Guaranteed",
      description: "Competitive pricing on all XTOOL models. We offer the best value for professional-grade diagnostic equipment in India."
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-blue-500" />,
      title: "Easy Returns & Warranty",
      description: "Hassle-free return policy and manufacturer warranty support. We stand behind every product we sell."
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Served" },
    { number: "8+", label: "XTOOL Models" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Auto Diagnostic Store?</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            India's trusted destination for professional XTOOL automotive diagnostic scanners and tools.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-transparent py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Our Numbers Speak</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">{stat.number}</div>
                <div className="text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
            Browse our range of XTOOL diagnostic scanners or talk to our experts for a personalised recommendation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/scanners" 
              className="px-8 py-4 rounded-full font-bold text-blue-600 border-2 border-blue-100 hover:bg-blue-50 transition-colors flex items-center justify-center w-full sm:w-auto"
            >
              Browse Scanners <span className="ml-2 font-normal">→</span>
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
