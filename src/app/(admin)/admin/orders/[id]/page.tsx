'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

export default function AdminOrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = () => {
    fetch(`/api/admin/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          router.push('/admin/orders');
        } else {
          setOrder(data.order);
        }
        setLoading(false);
      });
  };

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this payment?')) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_payment' })
      });
      if (!res.ok) throw new Error('Failed to approve');
      
      const message = `Hello ${order.customer.name},\n\nYour payment for order #${order.orderNumber} has been successfully approved! Your order is now confirmed.\n\nThank you for choosing XTOOL!`;
      const encodedMessage = encodeURIComponent(message);
      const phone = order.customer.phone.replace(/[^0-9+]/g, '');
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      
      fetchOrder();
    } catch (err) {
      alert('Error approving payment');
    } finally {
      setUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject_payment', rejectionReason })
      });
      if (!res.ok) throw new Error('Failed to reject');
      setShowRejectModal(false);
      fetchOrder();
    } catch (err) {
      alert('Error rejecting payment');
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', orderStatus: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      fetchOrder();
    } catch (err) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!order) return null;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center space-x-4">
        <Link href="/admin/orders" className="text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Order #{order.orderNumber}</h1>
        <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
          {order.orderStatus.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Customer Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div><span className="font-semibold block text-slate-500">Name</span> {order.customer.name}</div>
              <div><span className="font-semibold block text-slate-500">Phone</span> {order.customer.phone}</div>
              <div><span className="font-semibold block text-slate-500">Email</span> {order.customer.email}</div>
              <div><span className="font-semibold block text-slate-500">Company</span> {order.customer.companyName || '-'}</div>
              <div><span className="font-semibold block text-slate-500">GST Number</span> {order.customer.gstNumber || '-'}</div>
              <div className="col-span-2">
                <span className="font-semibold block text-slate-500">Shipping Address</span>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <h2 className="text-lg font-bold text-slate-800 p-6 border-b">Order Items</h2>
            <div className="divide-y">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="p-6 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-50 rounded border flex items-center justify-center p-1">
                    <img src={item.image || '/placeholder.svg'} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-500">SKU: {item.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">₹{item.price.toLocaleString('en-IN')} x {item.quantity}</div>
                    <div className="text-sm text-slate-500">Total: ₹{item.total.toLocaleString('en-IN')}</div>
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

        {/* Right Column - Payment & Actions */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Payment Details</h2>
            
            <div className="mb-4">
              <span className="block text-xs font-semibold text-slate-500 uppercase">Payment Status</span>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                order.paymentStatus === 'verification_pending' ? 'bg-orange-100 text-orange-800' :
                order.paymentStatus === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {order.paymentStatus.replace('_', ' ')}
              </span>
            </div>

            {order.payment?.transactionId && (
              <div className="space-y-3 text-sm border-t pt-4">
                <div><span className="font-semibold block text-slate-500">UTR / Transaction ID</span> {order.payment.transactionId}</div>
                <div><span className="font-semibold block text-slate-500">Date & Time</span> {order.payment.paymentDate} at {order.payment.paymentTime}</div>
                {order.payment.note && <div><span className="font-semibold block text-slate-500">Note</span> {order.payment.note}</div>}
                
                {order.payment.screenshotUrl && (
                  <div className="mt-4">
                    <span className="font-semibold block text-slate-500 mb-2">Payment Screenshot</span>
                    <a href={order.payment.screenshotUrl} target="_blank" rel="noreferrer" className="block border-2 border-slate-200 rounded overflow-hidden hover:border-blue-500 transition-colors">
                      <img src={order.payment.screenshotUrl} alt="Payment Proof" className="w-full h-auto object-contain" />
                      <div className="bg-slate-100 p-2 text-center text-xs font-medium text-slate-600">Click to enlarge</div>
                    </a>
                  </div>
                )}
              </div>
            )}

            {order.paymentStatus === 'verification_pending' && (
              <div className="mt-6 space-y-3 pt-4 border-t border-orange-100">
                <button onClick={handleApprove} disabled={updating} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded shadow flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Approve Payment
                </button>
                <button onClick={() => setShowRejectModal(true)} disabled={updating} className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-bold py-3 px-4 rounded border border-red-200 flex items-center justify-center">
                  <XCircle className="w-5 h-5 mr-2" /> Reject Payment
                </button>
              </div>
            )}

            {order.paymentStatus === 'rejected' && order.payment?.rejectionReason && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                <span className="font-bold block">Rejection Reason:</span>
                {order.payment.rejectionReason}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Order Management</h2>
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-600">Change Order Status</label>
              <select 
                value={order.orderStatus} 
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="payment_pending">Payment Pending</option>
                <option value="payment_verification">Payment Verification</option>
                <option value="payment_failed">Payment Failed</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Reject Payment</h2>
            <p className="text-sm text-slate-600 mb-4">Please provide a reason for rejecting this payment screenshot. The customer will see this message.</p>
            <textarea 
              className="w-full border rounded p-3 mb-4 focus:ring-2 focus:ring-red-500 outline-none"
              rows={4}
              placeholder="e.g., Screenshot is blurry, UTR does not match..."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded hover:bg-slate-200">Cancel</button>
              <button onClick={handleReject} disabled={updating} className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 shadow-sm flex items-center">
                {updating ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
