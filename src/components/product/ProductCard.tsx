import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    // Could add toast here
  };

  return (
    <div className="group block h-full">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col p-4 relative">
        
        {/* Image Area */}
        <Link href={`/scanners/${product.id}`} className="block">
          <div className="bg-[#F4F7FB] rounded-xl pt-8 pb-6 px-6 relative h-56 flex items-center justify-center mb-4 overflow-hidden">
            {!imageError ? (
              <img 
                src={product.images?.[0]?.url || product.images?.[0] || '/placeholder.svg'} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-32 h-44 bg-[#161C26] rounded-xl shadow-lg relative flex items-center justify-center border-4 border-slate-800 transition-transform duration-500 group-hover:scale-105">
                <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center border border-slate-700 rounded-lg m-1 p-2">
                   <span className="text-blue-500 font-bold text-[10px] tracking-widest text-center leading-tight">
                     XTOOL<br/>SCAN READY
                   </span>
                </div>
              </div>
            )}
            
            <div className="absolute top-3 left-3">
               <span className="text-blue-600 font-bold text-[10px] tracking-wider uppercase">XTOOL</span>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <div className="mb-1">
            <span className="text-[10px] font-bold text-blue-600 tracking-wider">
              XTOOL DIAGNOSTIC
            </span>
          </div>

          <Link href={`/scanners/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-1 mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} />
              ))}
            </div>
            <span className="text-xs text-slate-500 ml-1">
              (customer favourite)
            </span>
          </div>

          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-xl font-bold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">
            {product.shortDescription || 'Professional automotive diagnostic tool'}
          </p>

          <div className="mt-auto grid grid-cols-[3fr_2fr] gap-2">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#1C3E6D] hover:bg-[#153155] text-white font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm text-center"
            >
              Add to Cart
            </button>
            <Link 
              href={`/scanners/${product.id}`}
              className="w-full bg-[#F0F6FF] hover:bg-blue-100 text-blue-700 font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm text-center block"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
