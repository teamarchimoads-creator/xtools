'use client';
import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState({
    enabled: true,
    upiId: '',
    accountName: '',
    qrCodeUrl: '',
    instructions: '',
    confirmationMessage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings/payment')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to save');
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setSettings({ ...settings, qrCodeUrl: data.url });
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Payment Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow border border-slate-200">
        <form onSubmit={handleSave} className="p-6 space-y-6">
          
          <div className="flex items-center space-x-3 pb-4 border-b">
            <input 
              type="checkbox" 
              id="enabled" 
              checked={settings.enabled}
              onChange={(e) => setSettings({...settings, enabled: e.target.checked})}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <label htmlFor="enabled" className="text-slate-700 font-medium text-lg">
              Enable Manual QR Payment
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">UPI ID</label>
              <input 
                type="text" 
                required
                value={settings.upiId}
                onChange={(e) => setSettings({...settings, upiId: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder Name</label>
              <input 
                type="text" 
                required
                value={settings.accountName}
                onChange={(e) => setSettings({...settings, accountName: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">QR Code Image</label>
            <div className="flex items-center space-x-6">
              {settings.qrCodeUrl && (
                <div className="w-32 h-32 border rounded p-2 flex items-center justify-center bg-slate-50">
                  <img src={settings.qrCodeUrl} alt="QR Code" className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <div className="flex-1">
                <label className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-slate-300 rounded shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload New QR Code'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Instructions</label>
            <textarea 
              rows={3}
              value={settings.instructions}
              onChange={(e) => setSettings({...settings, instructions: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Confirmation Message</label>
            <textarea 
              rows={3}
              value={settings.confirmationMessage}
              onChange={(e) => setSettings({...settings, confirmationMessage: e.target.value})}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
