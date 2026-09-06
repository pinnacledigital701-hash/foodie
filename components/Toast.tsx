'use client';

import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useRestaurant();

  if (!toastMessage) return null;

  return (
    <div
      id="restaurant-toast-notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#11142d] px-4.5 py-3 text-xs font-semibold text-white shadow-2xl ring-1 ring-white/10 animate-in slide-in-from-bottom-5 duration-300"
    >
      <CheckCircle2 size={16} className="text-[#f39a2e]" />
      <span>{toastMessage}</span>
    </div>
  );
};
