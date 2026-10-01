'use client';
import React, { useState } from 'react';
import { useCartStore } from '../../../store/cartStore';
import Link from 'next/link';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotals, clearCart } = useCartStore();
  const { subtotal, shipping, gst, total } = getTotals();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: '123 Test Street',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    paymentMethod: 'COD'
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.pinCode,
      },
      items: items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        sku: item.product.sku,
        image: item.product.images[0]?.url || item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
      subtotal,
      shippingCost: shipping,
      gst,
      total,
      paymentMethod: formData.paymentMethod,
    };
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (!res.ok) throw new Error('Order failed');
      clearCart();
      setOrderSuccess(true);
      setIsCheckingOut(false);
    } catch (err) {
      console.error('Failed to create order', err);
      alert('Failed to process your order. Please try again.');
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <div className="bg-white rounded-2xl shadow-sm border p-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-slate-600 mb-8">Thank you for your purchase. Your order has been confirmed.</p>
          <Link href="/scanners" className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <ShoppingCart className="w-20 h-20 text-slate-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
        <p className="text-slate-600 mb-8">Looks like you haven't added any diagnostic scanners to your cart yet.</p>
        <Link href="/scanners" className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <img src={item.product.images[0]?.url || item.product.images[0] || '/placeholder.png'} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply p-2" onError={(e) => { e.currentTarget.src = '/placeholder.png'; }} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/scanners/${item.product.id}`} className="font-bold text-slate-900 hover:text-blue-600">
                        {item.product.name}
                      </Link>
                      <button onClick={() => removeItem(item.product.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{item.product.brand}</p>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1 hover:bg-slate-50 text-slate-600">-</button>
                          <span className="px-4 font-medium border-x">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1 hover:bg-slate-50 text-slate-600">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-slate-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          {!isCheckingOut ? (
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-slate-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Proceed to Checkout
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Checkout Details</h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full border rounded p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input required type="text" className="w-full border rounded p-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input required type="text" className="w-full border rounded p-2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input required type="text" className="w-full border rounded p-2" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code</label>
                    <input required type="text" className="w-full border rounded p-2" value={formData.pinCode} onChange={e => setFormData({...formData, pinCode: e.target.value})} />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg text-slate-900 mb-4">
                    <span>Amount to Pay</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center mb-2">
                    Place Order
                  </button>
                  <button type="button" onClick={() => setIsCheckingOut(false)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg transition-colors text-center">
                    Back to Cart
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
