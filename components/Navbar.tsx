'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu as MenuIcon, X } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const {
    cartTotalCount,
    favorites,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    setIsReservationOpen,
    scrollToSection,
  } = useRestaurant();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'Menu', sectionId: 'menu' },
    { label: 'About Us', sectionId: 'about' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Reviews', sectionId: 'reviews' },
    { label: 'Reservation', sectionId: 'reservation' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const handleNavClick = (label: string, sectionId: string) => {
    setActiveItem(label);
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <header className="relative z-50 flex h-20 items-center justify-between px-6 sm:px-10 lg:px-16 shrink-0 bg-[#fffdf8]/95 backdrop-blur-md sticky top-0 border-b border-stone-200/70">
      {/* Brand Logo */}
      <button
        id="navbar-brand-link"
        onClick={() => handleNavClick('Home', 'home')}
        aria-label="Foodie Restaurant Home"
        className="group flex items-center outline-none cursor-pointer rounded-lg py-1 transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#f6922d]/40"
      >
        <Logo className="h-8 sm:h-9 md:h-10 w-auto" />
      </button>

      {/* Desktop Navigation Links */}
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main Navigation">
        {navLinks.map((item) => {
          const isActive = activeItem.toLowerCase() === item.label.toLowerCase();
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label, item.sectionId)}
              className={`relative text-[14px] tracking-wide transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'font-bold text-[#f3942d]'
                  : 'font-semibold text-stone-600 hover:text-[#f3942d]'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#f6922d]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Navigation Actions */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Search Trigger */}
        <button
          id="navbar-search-btn"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search dishes and menu"
          className="relative flex items-center justify-center text-stone-600 hover:text-[#f3942d] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-stone-100"
        >
          <Search size={19} strokeWidth={2} />
        </button>

        {/* Shopping Cart Trigger with Counter Badge */}
        <button
          id="navbar-cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Shopping cart with ${cartTotalCount} items`}
          className="relative flex items-center justify-center text-stone-600 hover:text-[#f3942d] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-stone-100"
        >
          <ShoppingCart size={19} strokeWidth={2} />
          {cartTotalCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f6922d] px-1 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50">
              {cartTotalCount}
            </span>
          )}
        </button>

        {/* Favorites Trigger with Counter Badge */}
        <button
          id="navbar-favorites-btn"
          onClick={() => setIsSearchOpen(true)}
          aria-label={`Favorite dishes (${favorites.length})`}
          className="relative flex items-center justify-center text-stone-600 hover:text-[#f3942d] transition-colors cursor-pointer p-1.5 rounded-full hover:bg-stone-100"
        >
          <Heart
            size={19}
            strokeWidth={2}
            className={favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}
          />
          {favorites.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-stone-900 px-0.5 text-[9px] font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>

        {/* Book a Table / Reservation CTA */}
        <button
          id="navbar-reservation-btn"
          onClick={() => setIsReservationOpen(true)}
          className="hidden sm:inline-flex rounded-xl bg-[#f6922d] px-5 py-2.5 text-[13px] font-bold text-white shadow-md shadow-orange-200/70 transition-all duration-200 hover:bg-[#e7821d] hover:-translate-y-0.5 cursor-pointer"
        >
          Book a Table
        </button>

        {/* Mobile menu toggle */}
        <button
          id="navbar-mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-800 hover:bg-stone-100 lg:hidden cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="navbar-mobile-drawer"
          className="absolute left-0 right-0 top-20 z-50 border-b border-stone-200 bg-[#fffdf8] px-6 py-6 shadow-xl lg:hidden"
        >
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.sectionId)}
                className="flex items-center justify-between py-2 text-sm font-semibold text-stone-800 hover:text-[#f6922d] cursor-pointer text-left"
              >
                <span>{item.label}</span>
                {activeItem.toLowerCase() === item.label.toLowerCase() && (
                  <span className="h-2 w-2 rounded-full bg-[#f6922d]" />
                )}
              </button>
            ))}
            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="flex-1 rounded-xl bg-[#f6922d] py-2.5 text-center text-xs font-bold text-white shadow-md shadow-orange-200 hover:bg-[#e7821d]"
              >
                Book Table
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="flex-1 rounded-xl border border-stone-200 bg-white py-2.5 text-center text-xs font-bold text-stone-800 hover:bg-stone-50"
              >
                Account
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
