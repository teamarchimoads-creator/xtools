'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Copy, Upload, CheckCircle } from 'lucide-react';
import { PageSpinner } from '../../../../../components/Spinner';

export default function PaymentPage() {
  const { orderId } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.error) {
          alert(resData.error);
          router.push('/');
        } else {
          setData(resData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId, router]);

  const handleWhatsAppRedirect = async () => {
    setSubmitting(true);
    try {
      await fetch(`/api/orders/${orderId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: 'Sent via WhatsApp' })
      });
      
      const productDetails = data.order.items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ');
      const message = `Hello, I have done the payment on QR and I am sending the screenshot.\nOrder Number: ${data.order.orderNumber}\nName: ${data.order.customer.name}\nPhone: ${data.order.customer.phone}\nProduct Details: ${productDetails}`;
      
      const whatsappUrl = `https://wa.me/918708057398?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setSuccess(true);
    } catch (err: any) {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  if (loading) {
    return <PageSpinner />;
  }

  if (!data) return null;

  const { order, paymentSettings } = data;

  if (success) {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-sm border p-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Details Submitted</h1>
            <p className="text-slate-600 mb-8">{paymentSettings?.confirmationMessage || 'Your payment details have been submitted successfully. Our team will verify your payment and process your order.'}</p>
            
            <div className="bg-slate-50 p-6 rounded-lg text-left mb-8 space-y-3">
              <p><span className="font-semibold text-slate-700">Order Number:</span> {order.orderNumber}</p>
              <p><span className="font-semibold text-slate-700">Amount:</span> ₹{order.total.toLocaleString('en-IN')}</p>
              <p><span className="font-semibold text-slate-700">Payment Status:</span> <span className="text-orange-600 font-medium">Verification Pending via WhatsApp</span></p>
            </div>

            <Link href="/" className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const upiLink = paymentSettings?.upiId ? `upi://pay?pa=${paymentSettings.upiId}&pn=${encodeURIComponent(paymentSettings.accountName || '')}&am=${order.total}&cu=INR` : '#';

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-sm tracking-widest text-slate-500 uppercase font-semibold mb-2">Secure Your Order</h2>
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Payment Details</h1>
          <p className="text-slate-600 max-w-2xl">
            {paymentSettings?.instructions || `Please complete the payment of ₹${order.total.toLocaleString('en-IN')} via UPI first, then submit the form with your transaction / UTR number and screenshot to confirm your order.`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - QR Code Card */}
          <div className="lg:w-5/12">
            <div className="bg-[#f9f8f4] rounded-2xl p-8 border shadow-sm sticky top-24">
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
                  <img src={paymentSettings?.qrCodeUrl || "/assets/qrcode.png"} alt="Payment QR Code" className="w-56 h-56 object-contain" />
                </div>
              </div>
              
              <p className="text-center text-sm text-slate-600 mb-6">
                Scan with any UPI app — amount ₹{order.total.toLocaleString('en-IN')} is pre-filled
              </p>

              <a 
                href={upiLink}
                className="block w-full bg-[#b8954d] hover:bg-[#a3823d] text-white text-center font-bold py-4 px-6 rounded-lg shadow transition-colors mb-8 uppercase tracking-wide text-sm"
              >
                Pay ₹{order.total.toLocaleString('en-IN')} Now Via UPI
              </a>

              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">UPI ID</span>
                  <div className="flex items-center text-slate-800 font-medium">
                    {paymentSettings?.upiId || '-'}
                    <button onClick={() => copyToClipboard(paymentSettings?.upiId || '')} className="ml-3 text-slate-400 hover:text-slate-700" title="Copy UPI ID">
                      {copiedUpi ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-6 mt-6">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Bank Details</h4>
                <div className="bg-white p-4 rounded-lg space-y-2 text-sm text-slate-700 border shadow-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Account Holder:</span> <span className="font-medium text-right">R.C.S ENTERPRISES</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Account Number:</span> <span className="font-medium">921020028277985</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">IFSC:</span> <span className="font-medium">UTIB0004555</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Bank:</span> <span className="font-medium">AXIS BANK</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - WhatsApp Confirmation */}
          <div className="lg:w-7/12">
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <h3 className="text-xl font-serif text-slate-900 mb-6 uppercase tracking-widest text-sm">Confirm Payment via WhatsApp</h3>
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Send Payment Screenshot</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                After making the payment via QR code or Bank Transfer, click the button below to send us the screenshot on WhatsApp.
              </p>
              
              <div className="bg-[#f9f8f4] p-4 rounded-lg mb-8 flex justify-between items-center border border-[#e8e4d9]">
                <span className="text-sm font-semibold text-slate-700 uppercase">Total to Pay</span>
                <span className="text-xl font-bold text-slate-900">₹{order.total.toLocaleString('en-IN')}</span>
              </div>

              <button 
                onClick={handleWhatsAppRedirect}
                disabled={submitting}
                className="w-full bg-[#25D366] hover:bg-[#1ebd57] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors tracking-wide flex items-center justify-center gap-3"
              >
                {submitting ? 'PROCESSING...' : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    SEND SCREENSHOT ON WHATSAPP
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
