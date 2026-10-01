'use client';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingCart() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  // Don't show floating cart on cart or checkout pages
  if (pathname === '/cart' || pathname === '/checkout' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Link 
      href="/cart"
      className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center group"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
