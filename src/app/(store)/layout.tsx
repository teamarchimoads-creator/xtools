import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FloatingCart from '../../components/cart/FloatingCart';
import WhatsAppBadge from '../../components/layout/WhatsAppBadge';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppBadge />
    </div>
  );
}
