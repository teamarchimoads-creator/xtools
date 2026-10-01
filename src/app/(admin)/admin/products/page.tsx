'use client';
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (err) {
        console.error('Failed to delete', err);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your store's inventory and products.</p>
        </div>
        <Link href="/admin/products/new" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Product</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Price</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Stock</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded border flex items-center justify-center p-1">
                      <img src={product.images[0]?.url || product.images[0] || '/placeholder.svg'} alt={product.name} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.sku}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > product.lowStockThreshold ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Published' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-slate-400 hover:text-blue-600" title="Edit">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-red-600" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
