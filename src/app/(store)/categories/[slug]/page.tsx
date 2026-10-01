'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../../../components/product/ProductCard';
import { Category, Product } from '../../../../types';
import { PageSpinner } from '../../../../components/Spinner';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug ? decodeURIComponent(params.slug as string) : '';
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch(`/api/products?category=${encodeURIComponent(slug)}`)
        ]);
        
        const catData = await catRes.json();
        const prodData = await prodRes.json();
        
        const foundCategory = catData.categories?.find((c: any) => c.slug === slug);
        setCategory(foundCategory || null);
        
        setProducts(prodData.products?.filter((p: any) => p.status === 'published') || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  if (loading) {
    return <PageSpinner />;
  }

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Category Not Found</h1>
        <p className="text-slate-500 mb-6">The category "{slug}" doesn't exist or may have been deleted.</p>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Return Home</a>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-xl bg-slate-50 border p-2 flex items-center justify-center shadow-sm">
                <img src={`/api/categories/${category.id}/image`} alt={category.name} className="w-full h-full object-contain" onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }} />
              </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{category.name}</h1>
              <p className="text-slate-600 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center shadow-sm">
            <h3 className="text-lg font-medium text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500">There are currently no products available in this category. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
