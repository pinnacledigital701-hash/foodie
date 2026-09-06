'use client';

import React, { useState } from 'react';
import { X, Utensils, Check } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, showToast } = useRestaurant();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(isSignUp ? 'Account created successfully! Welcome to Foodie 🍽️' : 'Welcome back, Foodie member! 🥂');
    setIsAuthOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleDemoSignIn = () => {
    showToast('Signed in as demo guest: guest@foodie.com');
    setIsAuthOpen(false);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="auth-modal-content"
        className="relative w-full max-w-sm rounded-3xl bg-[#fffdf8] p-7 shadow-2xl ring-1 ring-stone-200/80"
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          aria-label="Close login dialog"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:text-stone-800"
        >
          <X size={18} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#f39a2e] text-[#f39a2e]">
            <Utensils size={20} strokeWidth={2.2} />
          </div>
          <h3 className="mt-3 text-xl font-extrabold text-stone-900">
            {isSignUp ? 'Join Foodie Club' : 'Welcome Back'}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {isSignUp
              ? 'Earn dining rewards and priority reservations'
              : 'Sign in to access saved orders and member perks'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#f7922e] py-3 text-xs font-bold text-white shadow-md hover:bg-[#e8811d] transition-colors"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#e07f1b] font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="mt-5 border-t border-stone-200/70 pt-4">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
          >
            Quick Guest Demo Sign-in
          </button>
        </div>
      </div>
    </div>
  );
};
