'use client';

import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { showToast, scrollToSection } = useRestaurant();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast('Thank you for subscribing to our culinary newsletter! 🥂');
    setEmail('');
  };

  return (
    <footer
      aria-label="Footer"
      className="border-t border-stone-200 px-6 sm:px-12 lg:px-16 py-16 bg-[#fffdf8]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-stone-200">
          {/* Col 1: Brand & Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              aria-label="Foodie Restaurant Home"
              className="flex items-center cursor-pointer text-left transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#f6922d]/40 rounded-lg py-1"
            >
              <Logo className="h-8 sm:h-9 w-auto" id="footer-brand-logo" />
            </button>
            <p className="text-xs leading-relaxed text-stone-500 max-w-sm font-medium">
              Authentic chef-crafted recipes with farm-fresh organic ingredients, artisan sauces, and signature hospitality in downtown Manhattan.
            </p>

            <div className="pt-2 flex items-center gap-3 text-stone-500">
              <button
                onClick={() => showToast('Opening Foodie Instagram page...')}
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 hover:border-[#f6922d] hover:text-[#f6922d] transition-colors cursor-pointer bg-white shadow-xs"
              >
                <Instagram size={15} />
              </button>
              <button
                onClick={() => showToast('Opening Foodie Facebook page...')}
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 hover:border-[#f6922d] hover:text-[#f6922d] transition-colors cursor-pointer bg-white shadow-xs"
              >
                <Facebook size={15} />
              </button>
              <button
                onClick={() => showToast('Opening Foodie Twitter / X page...')}
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 hover:border-[#f6922d] hover:text-[#f6922d] transition-colors cursor-pointer bg-white shadow-xs"
              >
                <Twitter size={15} />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-stone-500 font-medium">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Seasonal Menu' },
                { id: 'about', label: 'Our Story & Chefs' },
                { id: 'gallery', label: 'Atmosphere' },
                { id: 'reviews', label: 'Guest Reviews' },
                { id: 'reservation', label: 'Book a Table' },
                { id: 'contact', label: 'Location & Hours' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-[#f6922d] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Dining Hours & Contact
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-500 font-medium">
              <li>
                <span className="font-bold text-stone-800">Lunch:</span> 11:00 AM – 3:00 PM
              </li>
              <li>
                <span className="font-bold text-stone-800">Dinner:</span> 5:00 PM – 11:00 PM
              </li>
              <li>
                <span className="font-bold text-stone-800">Weekend Brunch:</span> 10:30 AM – 3:30 PM
              </li>
            </ul>

            <div className="pt-2 text-xs text-stone-500 space-y-1.5 font-medium">
              <p className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#f6922d]" />
                <span>24 Food Street, New York, NY</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone size={13} className="text-[#f6922d]" />
                <span>+1 800 123 4567</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail size={13} className="text-[#f6922d]" />
                <span>hello@foodie.com</span>
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Foodie Newsletter
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed font-medium">
              Receive secret off-menu releases, seasonal chef specials, and special discount vouchers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                aria-label="Your email address"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#f6922d] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f6922d] text-white transition-all hover:bg-[#e7821d] cursor-pointer shadow-xs"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row text-xs text-stone-500 font-medium">
          <p>© {new Date().getFullYear()} Foodie Restaurant Inc. All rights reserved.</p>

          <div className="flex gap-6">
            <button
              onClick={() => showToast('Foodie Privacy Policy: We safeguard diner data.')}
              className="hover:text-[#f6922d] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showToast('Foodie Dining Terms: Table hold is 15 minutes.')}
              className="hover:text-[#f6922d] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => showToast('Accessibility statement: ADA compliant dining room.')}
              className="hover:text-[#f6922d] transition-colors cursor-pointer"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
