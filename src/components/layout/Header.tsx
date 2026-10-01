'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';

export default function Header() {

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#1C3E6D] text-white text-[11px] py-1.5 px-4 flex justify-between items-center max-w-full">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <span className="font-medium tracking-wide uppercase">IN Pan-India Delivery • GST Invoice Available</span>
          <span className="font-medium">Support: +91 98XX-XXXXXX</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/assets/xtool-logo.webp" alt="XTOOL Logo" width={32} height={32} className="h-8 w-auto object-contain" />
              <span className="font-bold text-[22px] tracking-tight text-[#0B254E]">Auto Diagnostic Store</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 ml-4">
              <Link href="/scanners" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Scanners</Link>
              <Link href="/categories" className="text-slate-800 font-semibold hover:text-[#418AF2] transition-colors text-[15px]">Categories</Link>
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
              />
              <button className="bg-[#F0F6FF] h-full px-3 text-[#418AF2] hover:bg-blue-100 transition-colors border-l border-slate-200 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Account & Cart */}
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 shadow-sm h-10">
                Account
              </Link>
              
              <button className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
