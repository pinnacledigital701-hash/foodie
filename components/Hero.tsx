'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Clock3, Star, Sparkles } from 'lucide-react';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';
import { HERO_SALMON_DISH } from '@/data/dishes';
import { useRestaurant } from '@/context/RestaurantContext';

export const Hero: React.FC = () => {
  const { setIsReservationOpen, setIsCartOpen, setSelectedDish, addToCart } = useRestaurant();

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-[620px] px-7 pb-20 pt-8 sm:px-12 sm:pt-14 lg:px-[86px]"
    >
      {/* =========================================================
          DECORATIVE BOTANICAL & CULINARY ACCENTS (Subtle, editorial)
      ========================================================= */}

      {/* Subtle line-art culinary watermark (top-left) */}
      <div
        className="pointer-events-none absolute left-[4%] top-[45px] rotate-[-16deg] text-[#C86B3C]/12"
        aria-hidden="true"
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M50 15 L88 82 C65 92 35 92 12 82 Z" strokeLinejoin="round" />
          <path d="M12 82 C35 92 65 92 88 82" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="4.5" fill="currentColor" fillOpacity="0.1" />
          <circle cx="36" cy="68" r="4" fill="currentColor" fillOpacity="0.1" />
          <circle cx="62" cy="70" r="4.5" fill="currentColor" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Subtle organic herb sprig (top-center near heading) */}
      <div
        className="pointer-events-none absolute left-[28%] top-[60px] -rotate-12 text-[#716D66]/20"
        aria-hidden="true"
      >
        <svg width="36" height="36" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M25 45 C18 32 12 20 20 10 C28 0 42 8 38 25 C34 38 28 43 25 45 Z" />
          <path d="M25 45 C20 30 24 16 32 12" strokeLinecap="round" />
          <path d="M14 36 C10 28 12 20 18 14 C24 8 33 16 27 26" />
        </svg>
      </div>

      {/* Subtle organic branch watermark (bottom-left near copy) */}
      <div
        className="pointer-events-none absolute bottom-[40px] left-[32%] rotate-[15deg] text-[#C86B3C]/10"
        aria-hidden="true"
      >
        <svg width="44" height="44" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="30" cy="30" rx="20" ry="14" />
          <path d="M46 25 C52 23 54 28 50 34" strokeLinecap="round" />
        </svg>
      </div>

      {/* =========================================================
          HERO CONTENT (Left column)
      ========================================================= */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-20 pt-4 lg:col-span-7 lg:pt-6">
          {/* Welcome Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase mb-5">
            <Sparkles size={14} className="text-[#f6922d]" />
            <span>Welcome to Foodie Restaurant</span>
          </div>

          {/* Main Vibrant Headline with Hand-Drawn Loop */}
          <h1 className="mb-6 text-[42px] sm:text-[54px] lg:text-[62px] font-black leading-[1.08] tracking-tight text-[#11142d]">
            We Serve The Most
            <br />
            Delicious{' '}
            <span className="relative inline-block text-[#f3942d] px-1.5">
              Food
              <HandDrawnLoop strokeColor="#F5B83F">
                <span className="sr-only">Food</span>
              </HandDrawnLoop>
            </span>
          </h1>

          {/* Engaging Culinary Copy */}
          <p className="mb-8 max-w-[480px] text-[15px] leading-relaxed text-stone-600 font-medium">
            Savor authentic chef-crafted recipes with farm-fresh ingredients, fiery hearth grills, and artisan seasoning. Reserve your favorite table or order online in seconds.
          </p>

          {/* Action Buttons */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-reserve-btn"
              onClick={() => setIsReservationOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#f6922d] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-[#e7821d] hover:shadow-orange-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Reserve a Table</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <button
              id="hero-order-btn"
              onClick={() => setIsCartOpen(true)}
              className="rounded-xl border border-stone-300 bg-white px-7 py-3.5 text-sm font-bold text-stone-800 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Online Order
            </button>
          </div>

          {/* Opening Hours Info Badge */}
          <div className="flex items-center gap-3 text-xs font-semibold text-stone-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-[#f6922d]">
              <Clock3 size={15} strokeWidth={2.2} />
            </div>
            <span>Open Hours: 11:00 AM – 11:00 PM Daily</span>
          </div>
        </div>

        {/* =======================================================
            HERO FOOD COMPOSITION (Right column)
        ======================================================= */}
        <div className="relative mt-8 flex items-center justify-center lg:col-span-5 lg:mt-0">
          <div className="relative flex items-center justify-center h-[380px] w-[380px] sm:h-[460px] sm:w-[460px]">
            {/* Dashed Circular Food Ring */}
            <div
              className="absolute h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full border-[2.5px] border-dashed border-[#f6922d]/40"
              aria-hidden="true"
            />

            {/* Main Plate Image */}
            <div className="relative z-10 h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] overflow-hidden rounded-full border-[8px] border-white shadow-2xl shadow-orange-950/15 animate-float-slow">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                alt="Fresh delicious cuisine"
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Top-Right Signature Badge */}
            <div
              id="hero-best-food-badge"
              className="absolute top-[40px] sm:top-[70px] right-0 sm:-right-2 z-20 rounded-2xl bg-white border border-stone-100 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-stone-900 shadow-xl flex items-center gap-2"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-stone-900">
                <Star size={12} fill="currentColor" stroke="none" />
              </div>
              <span>Best Food</span>
            </div>

            {/* Floating Bottom-Left Card */}
            <div
              id="hero-floating-dish-card"
              onClick={() => setSelectedDish(HERO_SALMON_DISH)}
              tabIndex={0}
              role="button"
              aria-label="View Salmon Salad details"
              className="absolute bottom-6 sm:bottom-14 -left-4 sm:left-[-30px] z-20 flex w-[240px] cursor-pointer items-center gap-3.5 rounded-2xl bg-white border border-stone-100 p-3.5 shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              {/* Circular mini thumbnail */}
              <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full object-cover">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80"
                  alt="Salmon salad portion"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-bold text-stone-900">Salmon Salad</h4>
                <div className="my-0.5 flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={9} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="mb-1 text-[10px] leading-tight text-stone-400 line-clamp-1">
                  Crisp greens, wild salmon
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#f3942d]">$12.50</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(HERO_SALMON_DISH);
                    }}
                    className="rounded-md bg-[#f6922d] px-2 py-0.5 text-[10px] font-bold text-white hover:bg-[#e7821d]"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
