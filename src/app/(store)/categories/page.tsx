'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Monitor, Car, Settings, Bluetooth, Wrench, RefreshCcw } from 'lucide-react';
import { Category, Product } from '../../../types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ]);
        
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        
        setCategories(catData.categories?.filter((c: any) => c.isActive) || []);
        setProducts(prodData.products?.filter((p: any) => p.status === 'published') || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getCategoryModels = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId).map(p => p.name);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading categories...</div>;
  }

  const getCategoryIcon = (slug: string) => {
    switch(slug) {
      case 'professional-diagnostic-scanners': return <Monitor className="w-12 h-12 text-blue-500 mb-2" />;
      case 'obd2-scanners': return <Car className="w-12 h-12 text-red-500 mb-2" />;
      case 'ecu-diagnostic-tools': return <Settings className="w-12 h-12 text-purple-500 mb-2" />;
      case 'bluetooth-diagnostic-tools': return <Bluetooth className="w-12 h-12 text-blue-400 mb-2" />;
      case 'workshop-diagnostic-equipment': return <Wrench className="w-12 h-12 text-amber-500 mb-2" />;
      case 'service-and-reset-tools': return <RefreshCcw className="w-12 h-12 text-green-500 mb-2" />;
      default: return <Monitor className="w-12 h-12 text-slate-500 mb-2" />;
    }
  };

  const getCategorySubtitle = (slug: string) => {
    switch(slug) {
      case 'professional-diagnostic-scanners': return 'Workshop-grade diagnostic platforms';
      case 'obd2-scanners': return 'Essential car scanning tools';
      case 'ecu-diagnostic-tools': return 'Advanced coding and programming';
      default: return 'Diagnostic equipment';
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Blue Banner */}
      <div className="bg-blue-500 text-white py-6 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-medium tracking-wide">
            Find the right XTOOL diagnostic solution for your specific requirement.
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-6">
        {categories.map((category) => {
          const models = getCategoryModels(category.id);
          return (
            <div key={category.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Icon & Title */}
              <div className="w-full md:w-64 bg-slate-50 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 flex-shrink-0">
                {getCategoryIcon(category.slug)}
                <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1">{category.name}</h2>
                <p className="text-xs text-slate-500">{getCategorySubtitle(category.slug)}</p>
              </div>

              {/* Right Side: Description & Models */}
              <div className="flex-1 p-8">
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {category.description || 'Full-featured diagnostic tools designed for professional workshops and garages. These scanners offer complete system coverage, advanced coding, and ECU programming capabilities.'}
                </p>
                
                {models.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 mb-3 tracking-wider">MODELS:</h3>
                    <div className="flex flex-wrap gap-2">
                      {models.map((model, idx) => (
                        <span key={idx} className="inline-block bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow hover:border-slate-300 transition-all cursor-default">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
