import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#1C3E6D] text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Have questions about our diagnostic scanners? Need support? We're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                As an authorized seller of professional XTOOL diagnostic equipment, we provide complete sales and technical support to our customers across India.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Office Address</h3>
                  <p className="text-slate-600 font-medium">R.C.S ENTERPRISES (Prop: GAURAV)</p>
                  <p className="text-slate-600">415/15, Sanjay Nagar, Rohtak</p>
                  <p className="text-slate-600">Haryana, 124001, India</p>
                  <p className="text-slate-500 text-sm mt-1">GSTIN: 06BVNPG6757K1ZZ</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Phone</h3>
                  <p className="text-slate-600">+91 98XX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Email</h3>
                  <p className="text-slate-600">support@rcsenterprises.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">Business Hours</h3>
                  <p className="text-slate-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p className="text-slate-500 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea rows={5} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" onClick={() => alert('Thanks for your message! We will get back to you soon.')} className="w-full bg-[#2B88F0] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors mt-4 shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
