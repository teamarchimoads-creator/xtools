'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/product/ProductCard';
import { Product } from '../../../types';

export default function ScannersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    (p.status === 'published' || p.status === 'out_of_stock') && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-7xl pt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b pb-4">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Explore Scanners</h2>
            <p className="text-sm text-slate-500 mt-1">Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="w-full md:w-72 relative">
            <input 
              type="text" 
              placeholder="Filter by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#418AF2] focus:bg-white transition-colors text-sm font-medium"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-lg">No scanners found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
