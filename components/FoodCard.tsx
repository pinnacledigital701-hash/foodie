'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ArrowRight, Plus, Heart } from 'lucide-react';
import { Dish } from '@/types/restaurant';
import { useRestaurant } from '@/context/RestaurantContext';

interface FoodCardProps {
  dish: Dish;
  onSelect?: (dish: Dish) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ dish, onSelect }) => {
  const { addToCart, toggleFavorite, isFavorite } = useRestaurant();
  const favorited = isFavorite(dish.id);

  return (
    <article
      id={`food-card-${dish.id}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 shadow-[0_10px_28px_rgba(0,0,0,0.05)] border border-stone-100/90 transition-all duration-300 hover:shadow-[0_18px_40px_rgba(246,146,45,0.12)] hover:-translate-y-1"
    >
      {/* Top Header: Favorite toggle (left) & Rating (right) */}
      <div className="flex items-center justify-between text-xs mb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(dish.id);
          }}
          aria-label={favorited ? `Remove ${dish.name} from favorites` : `Save ${dish.name} to favorites`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <Heart
            size={16}
            strokeWidth={2}
            className={`transition-all ${favorited ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>

        <div className="flex items-center gap-1 font-bold text-xs">
          <span className="text-stone-500">{dish.reviewsCount || dish.rating || '4.9'}</span>
          <Star size={12} className="text-amber-400" fill="currentColor" stroke="none" />
        </div>
      </div>

      {/* Centered Circular Food Photography */}
      <div
        className="relative w-28 h-28 mx-auto my-2 rounded-full overflow-hidden border-2 border-amber-50 shadow-sm cursor-pointer group-hover:scale-[1.05] transition-transform duration-300"
        onClick={() => onSelect?.(dish)}
      >
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dish Name & Pricing */}
      <div className="text-center mt-1">
        <h4
          onClick={() => onSelect?.(dish)}
          className="cursor-pointer font-bold text-sm text-stone-900 transition-colors hover:text-[#f3942d] truncate"
        >
          {dish.name}
        </h4>

        <span className="inline-block text-center text-sm font-black text-[#f3942d] mt-1">
          {dish.formattedPrice}
        </span>
      </div>

      {/* Action buttons (View & Quick Add) */}
      <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-stone-100">
        <button
          type="button"
          onClick={() => onSelect?.(dish)}
          className="flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <span>Details</span>
          <ArrowRight size={13} strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(dish)}
          aria-label={`Add ${dish.name} to cart`}
          className="flex h-7 items-center gap-1 rounded-lg bg-[#f6922d] px-3 text-[11px] font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#e7821d] hover:scale-105 cursor-pointer"
        >
          <Plus size={12} strokeWidth={2.5} />
          <span>Add</span>
        </button>
      </div>
    </article>
  );
};
