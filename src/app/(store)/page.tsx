'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Product, Category } from '../../types';

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'professional-scanners': return '🖥️';
    case 'obd2-scanners': return '🚗';
    case 'ecu-diagnostics': return '⚙️';
    case 'key-programming': return '🔑';
    case 'tpms': return '📡';
    case 'accessories': return '🧰';
    default: return '📦';
  }
};

const getCategorySubtitle = (slug: string) => {
  switch (slug) {
    case 'professional-scanners': return 'Workshop-grade';
    case 'obd2-scanners': return 'Car scanning';
    case 'ecu-diagnostics': return 'Advanced functions';
    case 'key-programming': return 'Immobilizer tools';
    case 'tpms': return 'Tyre monitoring';
    case 'accessories': return 'Cables & adapters';
    default: return 'Explore';
  }
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products?.filter((p: any) => p.status === 'published') || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#2B88F0] text-white py-10 lg:py-12 relative overflow-hidden">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="inline-block border border-blue-300 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider mb-6 bg-white/10 backdrop-blur-sm">
                AUTHORISED XTOOL DIAGNOSTIC SCANNER
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight text-white">
                Professional-Level<br/>Automotive Diagnostic Tools
              </h1>
              <p className="text-base text-blue-50 max-w-xl mb-8 leading-relaxed font-light">
                Shop XTOOL car diagnostic scanners for OBD2 scanning, ECU diagnostics, coding, live data and advanced workshop functions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/scanners" className="bg-white text-[#2B88F0] hover:bg-slate-50 font-bold py-3 px-6 rounded-lg transition-colors text-base shadow-lg">
                  Shop Scanners →
                </Link>
                <Link href="/contact" className="bg-[#1C3E6D] hover:bg-[#153155] text-white font-bold py-3 px-6 rounded-lg transition-colors text-base shadow-lg border border-[#1C3E6D]">
                  Talk to Expert
                </Link>
              </div>
            </div>
            
            {/* Right side floating card */}
            <div className="hidden lg:flex justify-end relative z-10">
              <div className="bg-white text-slate-800 rounded-2xl p-8 shadow-2xl flex items-center gap-8 w-full max-w-lg relative border-4 border-white/20 transform -translate-x-12 translate-y-4">
                <div className="absolute -inset-4 bg-white/20 rounded-3xl -z-10"></div>
                <div className="flex-1">
                  <div className="text-blue-500 font-bold text-xs tracking-wider mb-2 uppercase">Featured</div>
                  <h3 className="text-2xl font-semibold mb-3">XTOOL Diagnostic<br/>Series</h3>
                  <p className="text-slate-500 text-sm">Advanced tools for technicians, garages and serious car owners.</p>
                </div>
                <div className="w-32 h-40 bg-[#161C26] rounded-xl flex items-center justify-center shadow-inner flex-shrink-0 border-2 border-slate-700 relative overflow-hidden">
                   <div className="absolute inset-2 border border-slate-600 rounded-lg flex items-center justify-center p-2">
                     <span className="text-blue-400 font-bold text-center text-xs">XTOOL<br/>DIAGNOSTIC</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Genuine Products</h4>
                <p className="text-slate-500 text-xs mt-1">Original XTOOL products</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Pan-India Shipping</h4>
                <p className="text-slate-500 text-xs mt-1">Fast delivery options</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">GST Billing</h4>
                <p className="text-slate-500 text-xs mt-1">Business Invoices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Expert Support</h4>
                <p className="text-slate-500 text-xs mt-1">Pre & post-sale help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category Teaser */}
      <section className="py-12 border-b bg-slate-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-medium text-slate-900 mb-2">Shop by Category</h2>
          <p className="text-slate-500 mb-8">Choose the right diagnostic solution for your requirement.</p>

          <div className="flex overflow-x-auto pb-6 gap-4 snap-x hide-scrollbar">
            {categories.map((category) => (
              <Link href={`/categories/${category.slug}`} key={category.id} className="snap-start shrink-0 w-[180px] flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                  ) : null}
                  <div className={`text-4xl ${category.image ? 'hidden' : ''}`}>
                    {getCategoryIcon(category.slug)}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">{category.name}</h3>
                <p className="text-xs text-slate-400">{getCategorySubtitle(category.slug)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-medium text-slate-900 mb-2">Featured XTOOL Scanners</h2>
              <p className="text-slate-500">Popular products for garages and automotive professionals.</p>
            </div>
            <Link href="/scanners" className="text-[#2B88F0] font-semibold text-sm hover:underline flex items-center">
              View all <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
