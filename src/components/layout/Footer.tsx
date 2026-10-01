import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/assets/xtool-logo.webp" alt="XTOOL Logo" className="h-10 w-auto object-contain bg-white rounded p-1" />
            </div>
            <p className="text-sm leading-relaxed mt-4">
              Auto Diagnostic Store brings professional-level automotive diagnostic tools to customers across India.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scanners" className="hover:text-white transition-colors">XTOOL Scanners</Link></li>
              <li><Link href="/categories/obd2-scanners" className="hover:text-white transition-colors">OBD2 Scanners</Link></li>
              <li><Link href="/categories/ecu-diagnostics" className="hover:text-white transition-colors">ECU Diagnostics</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Warranty</Link></li>
              <li><Link href="/tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>© 2026 Auto Diagnostic Store. Demo website concept.</p>
        </div>
      </div>
    </footer>
  );
}
