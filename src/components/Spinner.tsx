import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
