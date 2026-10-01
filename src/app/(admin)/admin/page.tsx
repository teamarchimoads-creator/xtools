'use client';
import React, { useState, useEffect } from 'react';
import { DollarSign, Package, Users, ShoppingCart, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Product } from '../../../types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    totalOrders: 0,
    paymentPending: 0,
    paymentVerificationPending: 0,
    paidOrders: 0,
    rejectedPayments: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, prodRes, ordersRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/products'),
          fetch('/api/admin/orders?limit=5')
        ]);
        const statsData = await statsRes.json();
        const prodData = await prodRes.json();
        const ordersData = await ordersRes.json();
        
        if (statsData.stats) setStats(statsData.stats);
        if (prodData.products) setProducts(prodData.products);
        if (ordersData.orders) setOrders(ordersData.orders);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome to your store's admin panel.</p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Products</div>
            <div className="text-2xl font-bold text-slate-900">{stats.products}</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Orders</div>
            <div className="text-2xl font-bold text-slate-900">{stats.totalOrders}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Revenue</div>
            <div className="text-2xl font-bold text-slate-900">₹{stats.totalRevenue?.toLocaleString('en-IN') || 0}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Categories</div>
            <div className="text-2xl font-bold text-slate-900">{stats.categories}</div>
          </div>
        </div>
      </div>

      {/* Payment & Order Status Breakdown */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">Order & Payment Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-xs font-medium text-slate-500 uppercase mb-1">Pay Pending</div>
          <div className="text-xl font-bold text-slate-800">{stats.paymentPending}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 bg-orange-50 p-4 text-center">
          <div className="text-xs font-medium text-orange-600 uppercase mb-1">Verify Pending</div>
          <div className="text-xl font-bold text-orange-700">{stats.paymentVerificationPending}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-green-200 bg-green-50 p-4 text-center">
          <div className="text-xs font-medium text-green-600 uppercase mb-1">Paid</div>
          <div className="text-xl font-bold text-green-700">{stats.paidOrders}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-red-200 bg-red-50 p-4 text-center">
          <div className="text-xs font-medium text-red-600 uppercase mb-1">Rejected</div>
          <div className="text-xl font-bold text-red-700">{stats.rejectedPayments}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-xs font-medium text-slate-500 uppercase mb-1">Confirmed</div>
          <div className="text-xl font-bold text-slate-800">{stats.confirmedOrders}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-xs font-medium text-slate-500 uppercase mb-1">Processing</div>
          <div className="text-xl font-bold text-slate-800">{stats.processingOrders}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <div className="text-xs font-medium text-slate-500 uppercase mb-1">Shipped</div>
          <div className="text-xl font-bold text-slate-800">{stats.shippedOrders}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 bg-blue-50 p-4 text-center">
          <div className="text-xs font-medium text-blue-600 uppercase mb-1">Delivered</div>
          <div className="text-xl font-bold text-blue-700">{stats.deliveredOrders}</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h2>
          <div className="divide-y">
            {orders.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No orders yet.</div>
            ) : (
              orders.slice(0, 5).map(order => (
                <div key={order.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-900">{order.orderNumber}</div>
                    <div className="text-sm text-slate-500">{order.customer?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">₹{order.total?.toLocaleString('en-IN')}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'verification_pending' ? 'bg-orange-100 text-orange-800' :
                      order.paymentStatus === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {order.paymentStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Low Stock Alerts</h2>
          <div className="divide-y">
            {products.filter(p => p.stock <= p.lowStockThreshold).length === 0 ? (
              <div className="py-8 text-center text-slate-500">No low stock alerts.</div>
            ) : (
              products
                .filter(p => p.stock <= p.lowStockThreshold)
                .map(product => (
                <div key={product.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-50 rounded border flex items-center justify-center p-1">
                      <img src={product.images[0]?.url || product.images[0] || '/placeholder.svg'} alt={product.name} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg'; }} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="text-sm text-slate-500">{product.sku}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">{product.stock} left</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
