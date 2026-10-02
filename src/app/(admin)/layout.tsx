'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Grid, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="text-white font-bold text-xl mb-1 flex items-center gap-3">
            <img src="/assets/xtool-logo.webp" alt="XTOOL Logo" className="h-8 w-auto object-contain bg-white rounded p-1" />
            Admin
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-6 mb-4">Menu</div>
          <nav className="space-y-1">
            <Link href="/admin" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname === '/admin' ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <LayoutDashboard className={`w-5 h-5 ${pathname === '/admin' ? 'text-blue-500' : ''}`} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/products" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/admin/products') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Package className={`w-5 h-5 ${pathname.startsWith('/admin/products') ? 'text-blue-500' : ''}`} />
              <span>Products</span>
            </Link>
            <Link href="/admin/categories" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/admin/categories') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <Grid className={`w-5 h-5 ${pathname.startsWith('/admin/categories') ? 'text-blue-500' : ''}`} />
              <span>Categories</span>
            </Link>
            <Link href="/admin/orders" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/admin/orders') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <ShoppingBag className={`w-5 h-5 ${pathname.startsWith('/admin/orders') ? 'text-blue-500' : ''}`} />
              <span>Orders</span>
            </Link>

          </nav>
        </div>
        <div className="mt-auto p-6">

          <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>View Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-medium text-slate-700">Welcome, Admin</span>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
