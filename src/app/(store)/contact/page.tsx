'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const adminWhatsApp = '918708057398';
  const handleWhatsApp = () => {
    if (!name || !phone) {
      alert('Please fill out your name and phone number.');
      return;
    }
    const text = `Hello! My name is ${name} (${phone}, ${email}).\nI am interested in: ${interest}\n\nMessage:\n${message}`;
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDirectWhatsApp = () => {
    window.open(`https://wa.me/${adminWhatsApp}?text=Hello! I need some help.`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-16 max-w-7xl">
        <h1 className="text-4xl font-semibold text-slate-900 mb-3">Contact Auto Diagnostic Store</h1>
        <p className="text-slate-500 mb-12">
          Have questions about XTOOL diagnostic scanners? Reach out to us and our experts will help you find the right tool.
        </p>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="text-pink-500 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">Call Us</h3>
            <p className="text-slate-600 mb-1">+91 8708057398</p>
            <p className="text-slate-400 text-sm">Mon – Sat, 10AM – 7PM</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col cursor-pointer hover:border-green-300 transition-colors" onClick={handleDirectWhatsApp}>
            <div className="text-purple-400 mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">WhatsApp</h3>
            <p className="text-slate-600 mb-1">Chat with our diagnostic expert</p>
            <p className="text-slate-400 text-sm">Quick response within minutes</p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="text-indigo-400 mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-1">Email</h3>
            <p className="text-slate-600 mb-1">support@rcsenterprises.com</p>
            <p className="text-slate-400 text-sm">We reply within 24 hours</p>
          </div>
        </div>

        {/* Form and Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="border border-slate-200 rounded-2xl p-8 shadow-sm bg-white">
            <h3 className="text-2xl font-medium text-slate-800 mb-6">Send us a Message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="+91 XXXXX-XXXXX" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Interested In</label>
                <select value={interest} onChange={e => setInterest(e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="XTOOL H6 Elite">XTOOL H6 Elite</option>
                  <option value="XTOOL D8BT">XTOOL D8BT</option>
                  <option value="XTOOL D7S">XTOOL D7S</option>
                  <option value="Other Scanners">Other Scanners</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)} className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Tell us about your requirements..."></textarea>
              </div>
              <button type="button" onClick={handleWhatsApp} className="w-full md:w-[180px] bg-[#1C3E6D] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-4">
                Send Message
              </button>
            </form>
          </div>

          {/* Location Area */}
          <div>
            <h3 className="text-2xl font-medium text-slate-800 mb-6">Our Location</h3>
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-sm border border-slate-200 mb-8 bg-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111664.13783777085!2d76.51659714304899!3d28.891157945532598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d84c311111111%3A0x6b4f74d092fcd628!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Store Address</h4>
                <p className="text-slate-600 font-medium">R.C.S ENTERPRISES (Prop: GAURAV)</p>
                <p className="text-slate-600">Shop No. 4 Anchinwal Dharamshala</p>
                <p className="text-slate-600">Near Subhash Cinema Hall & Civil Hospital</p>
                <p className="text-slate-600">Rohtak, Haryana, 124001, India</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Business Hours</h4>
                <p className="text-slate-600">Monday – Saturday: 10:00 AM – 7:00 PM</p>
                <p className="text-slate-500">Sunday: Closed</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
