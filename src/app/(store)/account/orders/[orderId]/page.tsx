'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function CustomerOrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          router.push('/account/orders');
        } else {
          setOrder(data.order);
        }
        setLoading(false);
      });
  }, [orderId, router]);

  const getPaymentBadge = (status: string) => {
    const map: any = {
      pending: 'bg-slate-100 text-slate-800',
      verification_pending: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800'
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${map[status] || 'bg-slate-100'}`}>{status.replace('_', ' ')}</span>;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  if (!order) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        
        <div className="flex items-center space-x-4 mb-2">
          <Link href="/account/orders" className="text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Order #{order.orderNumber}</h1>
          <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {order.orderStatus.replace('_', ' ')}
          </span>
        </div>
        
        {order.paymentStatus === 'rejected' && order.payment?.rejectionReason && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold">Payment Rejected</h3>
              <p className="text-sm mt-1">Reason: {order.payment.rejectionReason}</p>
              <div className="mt-3">
                <Link href={`/checkout/payment/${order._id}`} className="text-sm font-bold bg-red-600 text-white px-4 py-2 rounded shadow-sm hover:bg-red-700">
                  Resubmit Payment Details
                </Link>
              </div>
            </div>
          </div>
        )}

        {order.paymentStatus === 'pending' && (
          <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-bold">Payment Pending</h3>
              <p className="text-sm mt-1">You have not submitted your payment details yet.</p>
            </div>
            <Link href={`/checkout/payment/${order._id}`} className="text-sm font-bold bg-orange-600 text-white px-4 py-2 rounded shadow-sm hover:bg-orange-700">
              Pay Now
            </Link>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Payment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-semibold text-slate-500">Payment Status</span>
              <div className="mt-1">{getPaymentBadge(order.paymentStatus)}</div>
            </div>
            {order.payment?.transactionId && (
              <>
                <div>
                  <span className="block text-sm font-semibold text-slate-500">Transaction / UTR</span>
                  <div className="mt-1 font-medium text-slate-900">{order.payment.transactionId}</div>
                </div>
                <div>
                  <span className="block text-sm font-semibold text-slate-500">Payment Date & Time</span>
                  <div className="mt-1 font-medium text-slate-900">{order.payment.paymentDate} at {order.payment.paymentTime}</div>
                </div>
                {order.payment.screenshotUrl && (
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 mb-1">Receipt Uploaded</span>
                    <a href={order.payment.screenshotUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                      View Screenshot
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 text-sm">
            <div>
              <span className="font-semibold block text-slate-500">Contact Details</span>
              {order.customer.name}<br/>
              {order.customer.email}<br/>
              {order.customer.phone}
              {order.customer.companyName && <><br/>{order.customer.companyName}</>}
              {order.customer.gstNumber && <><br/>GST: {order.customer.gstNumber}</>}
            </div>
            <div>
              <span className="font-semibold block text-slate-500">Delivery Address</span>
              {order.shippingAddress.address}<br/>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="text-lg font-bold text-slate-800 p-6 border-b">Order Items</h2>
          <div className="divide-y">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="p-6 flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center p-1">
                  <img src={item.image || '/placeholder.svg'} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <Link href={`/scanners/${item.productId}`} className="font-bold text-slate-800 hover:text-blue-600">
                    {item.name}
                  </Link>
                  <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">₹{item.total.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-6 border-t text-right space-y-2">
            <div className="flex justify-end gap-8 text-sm"><span className="text-slate-500">Subtotal</span> <span className="font-medium">₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-end gap-8 text-sm"><span className="text-slate-500">Shipping</span> <span className="font-medium">₹{order.shippingCost}</span></div>
            <div className="flex justify-end gap-8 text-sm"><span className="text-slate-500">GST (18%)</span> <span className="font-medium">₹{order.gst.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-end gap-8 text-lg font-bold pt-2 border-t mt-2"><span>Total</span> <span>₹{order.total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}
