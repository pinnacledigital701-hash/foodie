'use client';

import React, { useState } from 'react';
import { X, Star, Sparkles, MessageSquare } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { ALL_MENU_DISHES } from '@/data/dishes';

export const LeaveReviewModal: React.FC = () => {
  const { isLeaveReviewOpen, setIsLeaveReviewOpen, addReview, showToast } = useRestaurant();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [dishName, setDishName] = useState(ALL_MENU_DISHES[0].name);
  const [hoverRating, setHoverRating] = useState(0);

  if (!isLeaveReviewOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      showToast('Please enter your name and review comment.');
      return;
    }

    addReview({
      author,
      rating,
      comment,
      dishName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    });

    setAuthor('');
    setComment('');
  };

  return (
    <div
      id="leave-review-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="leave-review-modal-content"
        className="relative w-full max-w-lg rounded-3xl bg-[#fffdf8] p-6 sm:p-8 shadow-2xl ring-1 ring-stone-200/80"
      >
        <button
          onClick={() => setIsLeaveReviewOpen(false)}
          aria-label="Close review modal"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-3 text-[#f6922d]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-[#f6922d]">
            <MessageSquare size={16} />
          </div>
          <span className="font-serif text-base font-bold italic">Share Your Experience</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
          Write a Dining Review
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Tell us about your culinary experience at Foodie.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {/* Star Rating selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-stone-300 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    size={24}
                    fill={(hoverRating || rating) >= star ? '#F5AE24' : 'none'}
                    stroke={(hoverRating || rating) >= star ? '#F5AE24' : 'currentColor'}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-stone-700 ml-2">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-stone-800 focus:border-[#f3942d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Dish Enjoyed
            </label>
            <select
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-stone-800 focus:border-[#f3942d] focus:outline-none"
            >
              {ALL_MENU_DISHES.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Review *
            </label>
            <textarea
              rows={3}
              required
              placeholder="How was the flavor balance, atmosphere, and service?..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-stone-800 focus:border-[#f3942d] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-[#f6922d] py-3 text-xs font-bold text-white shadow-lg shadow-orange-200 hover:bg-[#e7821d] transition-colors cursor-pointer"
            >
              Submit Guest Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
