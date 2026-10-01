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
  const [categoriesLoading, setCategoriesLoading] = useState(true);

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
      } finally {
        setCategoriesLoading(false);
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
            
            {/* Right side floating elements */}
            <div className="hidden lg:flex relative z-10 justify-center items-center h-[500px] w-full">
              <style>{`
                @keyframes float-complex {
                  0% { transform: translateY(0px) rotate(0deg) scale(1); filter: drop-shadow(0 30px 40px rgba(0,0,0,0.4)); }
                  33% { transform: translateY(-20px) rotate(3deg) scale(1.05); filter: drop-shadow(0 40px 50px rgba(0,0,0,0.3)); }
                  66% { transform: translateY(-10px) rotate(-2deg) scale(0.98); filter: drop-shadow(0 20px 30px rgba(0,0,0,0.45)); }
                  100% { transform: translateY(0px) rotate(0deg) scale(1); filter: drop-shadow(0 30px 40px rgba(0,0,0,0.4)); }
                }
                @keyframes float-text {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                }
                @keyframes pulse-glow {
                  0%, 100% { opacity: 0.3; transform: scale(1) translate(-50%, -50%); }
                  50% { opacity: 0.6; transform: scale(1.2) translate(-50%, -50%); }
                }
                .animate-float-complex {
                  animation: float-complex 8s ease-in-out infinite;
                }
                .animate-float-text {
                  animation: float-text 6s ease-in-out infinite;
                }
                .glow-effect {
                  animation: pulse-glow 4s ease-in-out infinite;
                  transform-origin: top left;
                }
              `}</style>
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px] glow-effect -z-10 pointer-events-none"></div>
              
              {/* Huge Scanner Image */}
              <div className="absolute z-10 w-[600px] h-[600px] flex items-center justify-center animate-float-complex -right-10">
                <img src="/assets/heroimage.png" alt="XTOOL Diagnostic Scanner" className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]" />
              </div>

              {/* Floating Text Element */}
              <div className="absolute bottom-16 left-0 z-20 max-w-xs animate-float-text drop-shadow-2xl" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                  </span>
                  <div className="text-amber-400 font-extrabold text-xs tracking-widest uppercase shadow-black">FEATURED</div>
                </div>
                <h3 className="text-4xl font-black text-white mb-3 leading-tight drop-shadow-md">XTOOL<br/>Diagnostic Series</h3>
                <p className="text-blue-50 text-base leading-relaxed font-medium drop-shadow-md">Advanced tools for technicians, garages and serious car owners.</p>
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
            {categoriesLoading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="snap-start shrink-0 w-[180px] flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse">
                  <div className="w-16 h-16 mb-4 bg-slate-200 rounded-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                </div>
              ))
            ) : (
              categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.id} className="snap-start shrink-0 w-[180px] flex flex-col items-center justify-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-center group">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <img src={`/api/categories/${category.id}/image`} alt={category.name} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                    <div className="text-4xl hidden">
                      {getCategoryIcon(category.slug)}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1 leading-snug">{category.name}</h3>
                  <p className="text-xs text-slate-400">{getCategorySubtitle(category.slug)}</p>
                </Link>
              ))
            )}
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
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse"></div>
              ))
            ) : (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-medium text-slate-900 mb-2">See XTOOL in Action</h2>
            <p className="text-slate-500">Watch our diagnostic tools perform real-world tasks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black flex items-center justify-center aspect-video">
              <video src="/assets/1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black flex items-center justify-center aspect-video">
              <video src="/assets/2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black flex items-center justify-center aspect-video">
              <video src="/assets/3.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
