'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Phone, MessageCircle, Sparkles, Tag, ChevronRight } from 'lucide-react';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const adminWhatsApp = '918708057398';
  const supportPhone = '+918708057398';
  const offerMessage = encodeURIComponent(
    'Hello! I saw the Diwali Dhamaka Offer on your website for XTOOL XT80 (Price ₹80,000/- with Free X2Prog, Videoscope, Pens & T-shirt). Please share full details.'
  );
  const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${offerMessage}`;

  const closePopup = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('xtool_diwali_offer_dismissed', 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    try {
      const dismissed = sessionStorage.getItem('xtool_diwali_offer_dismissed');
      if (!dismissed) {
        // Auto open after brief delay when entering the site
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closePopup]);

  if (!isMounted) return null;

  return (
    <>
      {/* Floating Trigger Pill when closed (allows reopening) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-white px-4 py-2.5 rounded-full shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 text-xs sm:text-sm font-bold border border-amber-300/40 animate-pulse group cursor-pointer"
          aria-label="View Diwali Dhamaka Offer"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>Diwali Dhamaka Offer!</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Modal Backdrop & Popup Container */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-title"
        >
          <div
            className="relative w-full max-w-md sm:max-w-lg bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl shadow-[0_15px_60px_rgba(245,158,11,0.35)] border-2 border-amber-400/80 overflow-hidden transform transition-all duration-300 scale-100 animate-in zoom-in-95 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Festive Header Ribbon */}
            <div className="bg-gradient-to-r from-red-700 via-amber-600 to-red-800 text-amber-100 px-4 py-2 sm:py-2.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span id="offer-title" className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-amber-200 drop-shadow">
                  Festive Special Offer • 17 - 26 Oct
                </span>
              </div>
              <button
                onClick={closePopup}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Close offer popup"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Poster Image Container */}
            <div className="relative w-full bg-amber-100/30 flex items-center justify-center p-2 sm:p-3 overflow-hidden">
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-amber-300/40">
                <img
                  src="/assets/diwali-offer.jpg"
                  alt="Deewali Dhamaka Offer - XTOOL XT80 Price ₹80,000/- with Free X2Prog, Videoscope, Pens & T-shirt"
                  className="w-full h-auto object-contain max-h-[58vh] sm:max-h-[62vh] mx-auto block hover:scale-[1.01] transition-transform duration-300"
                  loading="eager"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-b from-amber-50 to-amber-100/80 border-t border-amber-200/80">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-stretch sm:items-center">
                {/* WhatsApp Claim Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd59] active:bg-[#1ca84e] text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base group cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                  <span>Claim Offer on WhatsApp</span>
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${supportPhone}`}
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold py-2.5 px-4 rounded-xl shadow-md border border-slate-200 hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Subtitle / Urgency note */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-amber-900/80 font-medium px-1">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  Special Diwali Festive Discount
                </span>
                <button
                  onClick={closePopup}
                  className="text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Continue to Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
