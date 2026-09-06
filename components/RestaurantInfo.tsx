'use client';

import React from 'react';
import { MapPin, Clock3, Phone, ExternalLink } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

export const RestaurantInfo: React.FC = () => {
  const { setIsReservationOpen } = useRestaurant();

  return (
    <section
      id="about"
      aria-label="Restaurant Information"
      className="mx-6 sm:mx-12 lg:mx-16 mb-8 rounded-2xl bg-[#fff4dc] py-5 px-6 sm:px-10 flex flex-col md:flex-row justify-between shrink-0 gap-6 md:gap-4"
    >
      {/* Location */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#f3942d] shrink-0 shadow-xs">
          <MapPin size={18} strokeWidth={2} />
        </div>
        <div>
          <h5 className="text-xs font-bold text-stone-900">Visit Us</h5>
          <p className="text-[10px] text-gray-500">24 Food St, New York</p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#f3942d] shrink-0 shadow-xs">
          <Clock3 size={18} strokeWidth={2} />
        </div>
        <div>
          <h5 className="text-xs font-bold text-stone-900">Contact Us</h5>
          <p className="text-[10px] text-gray-500">hello@foodie.com</p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#f3942d] shrink-0 shadow-xs">
          <Phone size={18} strokeWidth={2} />
        </div>
        <div>
          <h5 className="text-xs font-bold text-stone-900">Phone</h5>
          <p className="text-[10px] text-gray-500">+1 800 123 456</p>
        </div>
      </div>
    </section>
  );
};
