'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1C3E6D] text-white text-[11px] py-1.5 px-4 flex justify-between items-center max-w-full">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-0 text-center">
          <span className="font-medium tracking-wide uppercase">IN Pan-India Delivery • GST Invoice Available</span>
          <span className="font-medium">Support: +91 8708057398</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/xtool-logo.webp" alt="XTOOL Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-[22px] tracking-tight text-[#0B254E]">Auto Diagnostic Store</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 ml-4">
              <Link href="/scanners" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Scanners</Link>
              <Link href="/categories" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Categories</Link>
              <Link href="/reviews" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Reviews</Link>
              <Link href="/why-us" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Why Us</Link>
              <Link href="/contact" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Contact</Link>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Search */}
            <div className="hidden md:flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:border-[#418AF2] focus-within:ring-1 focus-within:ring-[#418AF2] transition-all w-64 shadow-sm h-10">
              <input 
                type="text" 
                placeholder="Search scanners..." 
                className="px-3 py-2 w-full text-sm outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                suppressHydrationWarning
              />
              <button suppressHydrationWarning className="bg-[#F0F6FF] h-full px-3 text-[#418AF2] hover:bg-blue-100 transition-colors border-l border-slate-200 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Account & Cart */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col pt-6 px-6 lg:hidden shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
              <img src="/assets/xtool-logo.webp" alt="XTOOL Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-[20px] tracking-tight text-[#0B254E]">XTOOL Store</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-600 hover:text-blue-600 bg-slate-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 text-xl font-medium text-slate-800">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Home</Link>
            <Link href="/scanners" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Scanners</Link>
            <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Categories</Link>
            <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Reviews</Link>
            <Link href="/why-us" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Why Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-100 pb-4 hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      )}
    </>
  );
}
