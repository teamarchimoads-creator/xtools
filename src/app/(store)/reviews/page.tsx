'use client';
import React from 'react';
import Link from 'next/link';

export default function ReviewsPage() {
  // Assuming cs1 to cs9. If cs2 is missing it will just use onError to hide it or we can hardcode the ones provided in the screenshot.
  const reviews = [
    'cs1.jpeg', 'cs3.jpeg', 'cs4.jpeg', 'cs5.jpeg', 
    'cs6.jpeg', 'cs7.jpeg', 'cs8.jpeg', 'cs9.jpeg'
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#1C3E6D] text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            See what our customers are saying about our authentic XTOOL diagnostic scanners and our service.
          </p>
        </div>
      </div>

      {/* Reviews Gallery */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reviews.map((imgName, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow aspect-[3/4]">
              <img 
                src={`/assets/${imgName}`} 
                alt={`Customer Review ${idx + 1}`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Ready to upgrade your workshop?</h3>
          <Link href="/scanners" className="bg-[#2B88F0] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
            Shop Scanners Now
          </Link>
        </div>
      </div>
    </div>
  );
}
