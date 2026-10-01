'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../../../../../components/admin/ProductForm';
import { Product } from '../../../../../../types';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Product not found</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-500">Update information for {product.name}</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
