'use client';

import React from 'react';
import { RestaurantProvider } from '@/context/RestaurantContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PopularDishes } from '@/components/PopularDishes';
import { MenuSection } from '@/components/MenuSection';
import { AboutSection } from '@/components/AboutSection';
import { GallerySection } from '@/components/GallerySection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ReservationSection } from '@/components/ReservationSection';
import { RestaurantInfo } from '@/components/RestaurantInfo';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

// Modals & Drawers
import { ReservationModal } from '@/components/ReservationModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { LeaveReviewModal } from '@/components/LeaveReviewModal';
import { SearchModal } from '@/components/SearchModal';
import { DishDetailModal } from '@/components/DishDetailModal';
import { AuthModal } from '@/components/AuthModal';
import { Toast } from '@/components/Toast';

export default function Home() {
  return (
    <RestaurantProvider>
      {/* Outer Warm Cream Ambient Canvas */}
      <div className="min-h-screen overflow-x-hidden bg-[#faf6ee] text-[#11142d] py-0 sm:py-6 lg:py-10 px-0 sm:px-4 lg:px-8">
        
        {/* =========================================================
            BACKGROUND AMBIENT DECORATION
        ========================================================= */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
          {/* Top-left soft warm glow */}
          <div className="absolute -left-36 -top-40 h-[560px] w-[560px] rounded-full bg-amber-200/30 blur-3xl" />

          {/* Top-right subtle delicate ring */}
          <div className="absolute -right-24 -top-20 h-[340px] w-[340px] rounded-full border border-amber-200/40 opacity-60" />

          {/* Bottom-left subtle delicate ring */}
          <div className="absolute -bottom-36 -left-20 h-[320px] w-[320px] rounded-full border border-amber-200/40 opacity-50" />

          {/* Background subtle line art watermark (top right culinary motif) */}
          <div className="absolute right-[4%] top-[12%] text-[#f6922d]/10 rotate-[25deg]">
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M50 15 L88 82 C65 92 35 92 12 82 Z" strokeLinejoin="round" />
              <path d="M12 82 C35 92 65 92 88 82" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="4" fill="currentColor" fillOpacity="0.1" />
              <circle cx="38" cy="65" r="4" fill="currentColor" fillOpacity="0.1" />
              <circle cx="62" cy="68" r="4" fill="currentColor" fillOpacity="0.1" />
            </svg>
          </div>

          {/* Background subtle line art watermark (bottom left roasted dish) */}
          <div className="absolute left-[3%] bottom-[8%] text-[#f6922d]/10 -rotate-[15deg]">
            <svg width="85" height="85" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
              <ellipse cx="40" cy="40" rx="26" ry="18" />
              <path d="M60 34 C68 31 71 38 66 45" strokeLinecap="round" />
              <circle cx="32" cy="38" r="2.5" fill="currentColor" fillOpacity="0.1" />
            </svg>
          </div>
        </div>

        {/* =========================================================
            MAIN FOODIE CANVAS CONTAINER
        ========================================================= */}
        <main
          id="main-restaurant-canvas"
          className="relative mx-auto min-h-screen max-w-[1400px] bg-[#fffdf8] border border-amber-100/80 shadow-[0_16px_50px_rgba(247,146,46,0.08)] rounded-none sm:rounded-[32px] overflow-hidden"
        >
          {/* Header & Sticky Navigation */}
          <Navbar />

          {/* 1. HOME: Hero Section */}
          <Hero />

          {/* Home Showcase: Our Popular Dishes */}
          <PopularDishes />

          {/* Quality & Trust Badges */}
          <RestaurantInfo />

          {/* 2. MENU: Complete Menu Page Section */}
          <MenuSection />

          {/* 5. RESERVATION: Complete Reservation In-Page Section */}
          <ReservationSection />

          {/* 6. ABOUT: Editorial Restaurant Story, Philosophy, Chefs, Values */}
          <AboutSection />

          {/* 7. GALLERY: Responsive Photography Gallery with Lightbox */}
          <GallerySection />

          {/* 8. REVIEWS: Elegant Testimonials & Write a Review */}
          <ReviewsSection />

          {/* 9. CONTACT: Hours, Address, Contact Form, and Map */}
          <ContactSection />

          {/* 10. FOOTER: Complete Editorial Footer */}
          <Footer />
        </main>

        {/* =========================================================
            INTERACTIVE MODALS & DRAWERS
        ========================================================= */}
        <ReservationModal />
        <CartDrawer />
        <CheckoutModal />
        <LeaveReviewModal />
        <SearchModal />
        <DishDetailModal />
        <AuthModal />
        <Toast />
      </div>
    </RestaurantProvider>
  );
}
