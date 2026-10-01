'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CustomerOrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/customer?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentBadge = (status: string) => {
    const map: any = {
      pending: 'bg-slate-100 text-slate-800',
      verification_pending: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800'
    };
    return <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${map[status] || 'bg-slate-100'}`}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <form onSubmit={fetchOrders} className="flex gap-4 max-w-md">
            <input 
              type="email" 
              required 
              placeholder="Enter your email address" 
              className="flex-1 border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium disabled:opacity-70">
              {loading ? 'Searching...' : 'Find Orders'}
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-2">Since you are not logged in, please enter the email you used during checkout to view your orders.</p>
        </div>

        {searched && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No orders found for this email address.</div>
            ) : (
              <div className="divide-y">
                {orders.map(order => (
                  <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-blue-600">
                        <Link href={`/account/orders/${order.id}`}>#{order.orderNumber}</Link>
                      </h3>
                      <p className="text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                      <div className="mt-2 text-sm text-slate-700">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • <span className="font-bold">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="text-sm">
                        <span className="text-slate-500 mr-2">Payment Status:</span>
                        {getPaymentBadge(order.paymentStatus)}
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500 mr-2">Order Status:</span>
                        <span className="font-semibold text-slate-800 uppercase text-xs">{order.orderStatus.replace('_', ' ')}</span>
                      </div>
                      <Link href={`/account/orders/${order.id}`} className="mt-2 text-sm font-medium text-blue-600 hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
