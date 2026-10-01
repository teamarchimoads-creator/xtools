'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    name: '', sku: '', brand: 'XTOOL', category: '',
    slug: '', shortDescription: '', description: '',
    price: 0, originalPrice: 0, discount: 0,
    images: ['/placeholder.svg'], rating: 5, reviewCount: 0,
    stock: 0, lowStockThreshold: 5, status: 'in_stock',
    features: [''], specifications: {}, compatibility: [''],
    inTheBox: [''], warranty: '1 Year Warranty'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };
  
  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        const data = await res.json();
        
        if (res.ok && data.url) {
          uploadedUrls.push(data.url);
        } else {
          alert('Upload failed: ' + (data.error || 'Unknown error'));
        }
      }
      
      setFormData(prev => {
        const currentImages = prev.images || [];
        const filtered = currentImages.filter(img => img !== '/placeholder.svg');
        return { ...prev, images: [...filtered, ...uploadedUrls] };
      });
    } catch (err) {
      console.error('Failed to upload:', err);
      alert('An error occurred during file upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const parsedValue = ['price', 'originalPrice', 'discount', 'stock'].includes(name) ? Number(value) : value;
      const updatedData = { ...prev, [name]: parsedValue };
      
      if (name === 'price' || name === 'originalPrice') {
        const p = name === 'price' ? Number(value) : prev.price || 0;
        const op = name === 'originalPrice' ? Number(value) : prev.originalPrice || 0;
        if (op > 0 && p > 0 && op > p) {
          updatedData.discount = Math.round(((op - p) / op) * 100);
        } else {
          updatedData.discount = 0;
        }
      }
      return updatedData;
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => setFormData(prev => ({ ...prev, features: [...(prev.features || []), ''] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.images && payload.images.length > 0) {
        payload.images = payload.images.map((img, index) => ({
          url: typeof img === 'string' ? img : (img as any).url,
          isMain: index === 0
        })) as any;
      }

      let res;
      if (initialData?.id) {
        res = await fetch(`/api/admin/products/${initialData.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
    } catch (err: any) {
      console.error('Failed to save product:', err);
      alert(err.message || 'Error saving product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
            <input required type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
              <input required type="text" name="sku" value={formData.sku || ''} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
              <input required type="text" name="brand" value={formData.brand || ''} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select name="category" value={formData.category as string || ''} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" required>
              <option value="">Select a Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
            <textarea name="shortDescription" value={formData.shortDescription || ''} onChange={handleChange} className="w-full border rounded-lg p-2 h-20 text-slate-900 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full border rounded-lg p-2 h-20 text-slate-900 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" value={formData.status || 'Draft'} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white">
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Pricing & Inventory</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price (₹)</label>
              <input required type="number" name="price" value={formData.price || 0} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (₹)</label>
              <input required type="number" name="originalPrice" value={formData.originalPrice || 0} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount (%)</label>
              <input readOnly type="number" name="discount" value={formData.discount || 0} className="w-full border rounded-lg p-2 text-slate-900 bg-slate-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
              <input required type="number" name="stock" value={formData.stock || 0} onChange={handleChange} className="w-full border rounded-lg p-2 text-slate-900 bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Features</label>
            {formData.features?.map((feature, i) => (
              <input key={i} type="text" value={feature} onChange={(e) => handleFeatureChange(i, e.target.value)} className="w-full border rounded-lg p-2 mb-2 text-slate-900 bg-white" placeholder={`Feature ${i + 1}`} />
            ))}
            <button type="button" onClick={addFeature} className="text-blue-600 text-sm font-medium mt-1">+ Add Feature</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Product Images</h3>
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:bg-slate-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="text-slate-500">
            {isUploading ? (
              <p className="font-medium text-blue-600">Uploading images...</p>
            ) : (
              <>
                <p className="font-medium text-slate-700">Click to upload, drag and drop, or Ctrl+V to paste images</p>
                <p className="text-sm mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </>
            )}
          </div>
        </div>
        
        {formData.images && formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
            {formData.images.map((img, i) => {
              const imgSrc = typeof img === 'string' ? img : (img as any).url;
              if (imgSrc === '/placeholder.svg') return null;
              
              return (
                <div key={i} className="relative group aspect-square border rounded-lg overflow-hidden bg-slate-50">
                  <img src={imgSrc} alt={`Product ${i+1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t pt-6 flex justify-end space-x-4">
        <button type="button" onClick={() => router.push('/admin/products')} className="px-6 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 font-medium">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          {initialData ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
