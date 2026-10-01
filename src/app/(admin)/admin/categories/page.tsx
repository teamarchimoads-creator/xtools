'use client';
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Category } from '../../../../types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) handleImageFile(file);
        }
      }
    };
    
    if (isEditing) {
      window.addEventListener('paste', handlePaste);
      return () => window.removeEventListener('paste', handlePaste);
    }
  }, [isEditing]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setIsEditing(category.id);
    setFormData(category);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
        fetchCategories();
      } catch (err) {
        console.error('Failed to delete', err);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing === 'new') {
        await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else if (isEditing) {
        await fetch(`/api/admin/categories/${isEditing}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsEditing(null);
      setFormData({});
      fetchCategories();
    } catch (err) {
      console.error('Failed to save category', err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500">Manage product categories and collections.</p>
        </div>
        <button 
          onClick={() => { setIsEditing('new'); setFormData({ status: 'Active', name: '', slug: '', description: '' }); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">{isEditing === 'new' ? 'Add New Category' : 'Edit Category'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
                <input required type="text" className="w-full border rounded-lg p-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Professional Scanners" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
                <input required type="text" className="w-full border rounded-lg p-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. professional-scanners" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea className="w-full border rounded-lg p-2.5 h-24 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm resize-y" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Enter a helpful description for this category..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select className="w-full border rounded-lg p-2.5 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm" value={formData.status || 'Active'} onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Category Image</label>
                <div 
                  className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => document.getElementById('category-image-upload')?.click()}
                >
                  <input 
                    id="category-image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0]);
                    }} 
                  />
                  {formData.image ? (
                    <div className="flex flex-col items-center">
                       <img src={formData.image} alt="Preview" className="h-24 w-auto object-contain mb-2 rounded shadow-sm border" />
                       <span className="text-sm text-blue-600 font-medium">Click or drop to replace image</span>
                    </div>
                  ) : (
                    <div className="text-slate-500 flex flex-col items-center">
                      <svg className="w-10 h-10 mb-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium text-slate-700">Drag & drop an image here</span>
                      <span className="text-sm mt-1">or click to browse, or <kbd className="bg-slate-200 px-1 rounded text-xs">Ctrl+V</kbd> to paste</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 border rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Category</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Category Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Description</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  {category.image ? (
                    <div className="h-10 w-10 shrink-0 rounded bg-slate-100 flex items-center justify-center border overflow-hidden">
                      <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 shrink-0 rounded bg-slate-100 flex items-center justify-center border text-slate-400 text-xs text-center p-1 leading-none">
                      No<br/>Img
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-slate-900">{category.name}</div>
                    <div className="text-xs text-slate-500">/{category.slug}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                  {category.description}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button onClick={() => handleEdit(category)} className="text-slate-400 hover:text-blue-600">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="text-slate-400 hover:text-red-600">
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
  );
}
