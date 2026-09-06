'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote, Sparkles, MessageSquarePlus } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const ReviewsSection: React.FC = () => {
  const { reviews, setIsLeaveReviewOpen } = useRestaurant();

  return (
    <section id="reviews" aria-label="Guest Reviews" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles size={14} className="text-[#f6922d]" />
              <span>Acclaimed by Critics & Guests</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#11142d] tracking-tight">
              Guest Stories &{' '}
              <span className="relative inline-block text-[#f3942d] px-1.5">
                Reviews
                <HandDrawnLoop strokeColor="#F5B83F">
                  <span className="sr-only">Reviews</span>
                </HandDrawnLoop>
              </span>
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-lg leading-relaxed font-medium">
              Read real dining experiences from our community of food lovers, culinary critics, and neighborhood regulars.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white p-3.5 border border-stone-200 shadow-xs flex items-center gap-3">
              <div className="text-center">
                <span className="block text-2xl font-black text-stone-900">4.9</span>
                <div className="flex items-center text-[#f6922d] text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </div>
              <div className="border-l border-stone-200 pl-3 text-xs text-stone-500 leading-tight">
                <strong className="block text-stone-900 font-bold">3,400+ Ratings</strong>
                <span>98% Recommend</span>
              </div>
            </div>

            <button
              onClick={() => setIsLeaveReviewOpen(true)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#f6922d] text-white text-xs font-bold shadow-md hover:bg-[#e7821d] transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageSquarePlus size={15} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden bg-amber-50 ring-2 ring-amber-100">
                      <Image
                        src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                        alt={rev.author}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-bold text-stone-900">{rev.author}</h4>
                        {rev.verifiedDiner && (
                          <CheckCircle size={13} className="text-[#f6922d]" />
                        )}
                      </div>
                      <span className="text-xs text-stone-400 block font-medium">
                        {rev.role || rev.source || 'Verified Diner'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-[#f6922d]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic font-medium">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Footer: Dish Mention & Date */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                {rev.dishName ? (
                  <span className="font-bold text-[#f6922d] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg truncate max-w-[170px]">
                    Dish: {rev.dishName}
                  </span>
                ) : (
                  <span />
                )}
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
