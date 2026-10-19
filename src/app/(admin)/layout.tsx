'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ExternalLink,
  Loader2
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<string>('Admin');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;

    // Fetch current admin session user info
    fetch('/api/admin/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user?.username) {
          setAdminUser(data.user.username);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  // If on login page, render only the login screen without admin sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }


  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="text-white font-bold text-xl mb-1 flex items-center gap-3">
            <img 
              src="/assets/xtool-logo.webp" 
              alt="XTOOL Logo" 
              className="h-8 w-auto object-contain bg-white rounded p-1" 
            />
            <span>Admin</span>
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-6 mb-4">
            Menu
          </div>
          <nav className="space-y-1">
            <Link 
              href="/admin" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === '/admin' ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 ${pathname === '/admin' ? 'text-blue-500' : ''}`} />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/admin/products" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/admin/products') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Package className={`w-5 h-5 ${pathname.startsWith('/admin/products') ? 'text-blue-500' : ''}`} />
              <span>Products</span>
            </Link>
            <Link 
              href="/admin/categories" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/admin/categories') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Grid className={`w-5 h-5 ${pathname.startsWith('/admin/categories') ? 'text-blue-500' : ''}`} />
              <span>Categories</span>
            </Link>
            <Link 
              href="/admin/orders" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/admin/orders') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ShoppingBag className={`w-5 h-5 ${pathname.startsWith('/admin/orders') ? 'text-blue-500' : ''}`} />
              <span>Orders</span>
            </Link>
            <Link 
              href="/admin/settings/payment" 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/admin/settings') ? 'text-white bg-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className={`w-5 h-5 ${pathname.startsWith('/admin/settings') ? 'text-blue-500' : ''}`} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="mt-auto p-6 space-y-2 border-t border-slate-800/80">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm"
          >
            <span className="flex items-center space-x-3">
              <ExternalLink className="w-4 h-4" />
              <span>View Storefront</span>
            </span>
          </Link>

          <button 
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-400" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-xs">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Admin Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold uppercase shadow-sm">
                {adminUser.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block font-medium text-slate-800 text-sm">{adminUser}</span>
                <span className="block text-xs text-slate-400 capitalize">Administrator</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
