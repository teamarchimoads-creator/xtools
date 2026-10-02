'use client';
import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../../../store/cartStore';
import { useParams, notFound } from 'next/navigation';
import { Star, Shield, Truck, Settings } from 'lucide-react';
import Link from 'next/link';
import { Product } from '../../../../types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/scanners" className="text-blue-600 hover:underline">Return to Scanners</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center relative w-full">
                {product.discount > 0 && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white font-bold px-3 py-1 rounded z-10">
                    {product.discount}% OFF
                  </div>
                )}
                <img src={(product.images[activeImageIndex] as any)?.url || product.images[activeImageIndex] || '/placeholder.svg'} alt={product.name} className="w-full h-auto max-h-[600px] object-contain transition-opacity duration-300 transform scale-110" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }} />
              </div>
              
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                  {product.images.map((img: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-24 h-24 flex-shrink-0 rounded-lg border-2 p-2 bg-slate-50 flex items-center justify-center transition-all ${activeImageIndex === idx ? 'border-blue-600' : 'border-transparent hover:border-blue-300'}`}
                    >
                      <img src={img?.url || img || '/placeholder.svg'} alt={`${product.name} thumbnail ${idx + 1}`} className="max-w-full max-h-full object-contain mix-blend-multiply" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content section */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
              


              {product.shortDescription && (
                <p className="text-slate-700 font-medium text-lg mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              <div className="flex items-end space-x-3 mb-6">
                <span className="text-4xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-slate-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="mb-1.5 inline-flex items-center bg-blue-50 text-blue-700 text-sm font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <div className="text-slate-600 mb-8 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => addItem(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg text-center"
                >
                  Add to Cart
                </button>
                <Link href="/cart" onClick={() => addItem(product)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg text-center">
                  Buy Now
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 border-t pt-8">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>{product.warranty || '1 Year Warranty'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Free Shipping Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-600" />
              Key Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="mt-1 bg-blue-100 text-blue-600 rounded-full p-1 mr-3 flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Specifications</h2>
            <div className="divide-y">
              {Array.isArray(product.specifications) 
                ? product.specifications.map((spec: any, i: number) => {
                    if (!spec.name || !spec.value) return null;
                    return (
                      <div key={i} className="py-3 flex">
                        <span className="w-1/3 font-medium text-slate-500">{spec.name}</span>
                        <span className="w-2/3 text-slate-900">{spec.value}</span>
                      </div>
                    );
                  })
                : Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="py-3 flex">
                      <span className="w-1/3 font-medium text-slate-500">{key}</span>
                      <span className="w-2/3 text-slate-900">{String(value)}</span>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
