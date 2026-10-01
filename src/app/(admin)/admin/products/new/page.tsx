'use client';
import React from 'react';
import ProductForm from '../../../../../components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
        <p className="text-slate-500">Create a new product to list on your store.</p>
      </div>
      <ProductForm />
    </div>
  );
}
