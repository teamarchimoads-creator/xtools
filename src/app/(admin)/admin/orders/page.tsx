'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye, Filter } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    paymentStatus: 'all',
    sort: 'newest'
  });

  const fetchOrders = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (filters.search) query.append('search', filters.search);
    if (filters.status !== 'all') query.append('status', filters.status);
    if (filters.paymentStatus !== 'all') query.append('paymentStatus', filters.paymentStatus);
    query.append('sort', filters.sort);
    query.append('limit', '50');

    fetch(`/api/admin/orders?${query.toString()}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const getPaymentStatusBadge = (status: string) => {
    const map: any = {
      pending: 'bg-slate-100 text-slate-800',
      verification_pending: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800'
    };
    const css = map[status] || 'bg-slate-100 text-slate-800';
    return <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${css}`}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Name, Email, UTR..." 
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <div className="flex space-x-4">
            <select className="border rounded py-2 px-3 focus:outline-none" value={filters.paymentStatus} onChange={e => setFilters({...filters, paymentStatus: e.target.value})}>
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="verification_pending">Verification Pending</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select className="border rounded py-2 px-3 focus:outline-none" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
              <option value="all">All Statuses</option>
              <option value="payment_pending">Payment Pending</option>
              <option value="payment_verification">Payment Verification</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select className="border rounded py-2 px-3 focus:outline-none" value={filters.sort} onChange={e => setFilters({...filters, sort: e.target.value})}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Payment Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No orders found.</td></tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-blue-600">
                      <Link href={`/admin/orders/${order.id}`}>#{order.orderNumber}</Link>
                    </td>
                    <td className="p-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-600">
                      <div className="font-medium text-slate-800">{order.customer.name}</div>
                      <div className="text-xs">{order.customer.email}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">{getPaymentStatusBadge(order.paymentStatus)}</td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-1.5 px-3 rounded shadow-sm">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
