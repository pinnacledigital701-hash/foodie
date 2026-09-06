'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, Heart, Clock, Flame, Plus, Minus, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

export const DishDetailModal: React.FC = () => {
  const { selectedDish, setSelectedDish, addToCart, toggleFavorite, isFavorite } = useRestaurant();
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');

  if (!selectedDish) return null;

  const favorited = isFavorite(selectedDish.id);

  const handleAddToCart = () => {
    addToCart(selectedDish, quantity, specialNote);
    setSelectedDish(null);
    setQuantity(1);
    setSpecialNote('');
  };

  return (
    <div
      id="dish-detail-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="dish-detail-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#fffdf8] p-6 sm:p-8 shadow-2xl ring-1 ring-stone-200/80 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          aria-label="Close dish details"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors shadow-xs cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Circular Food Presentation with Amber Glow */}
        <div className="relative mx-auto flex h-[210px] w-[210px] items-center justify-center">
          <div className="relative h-[190px] w-[190px] overflow-hidden rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-8 ring-amber-100/70">
            <Image
              src={selectedDish.image}
              alt={selectedDish.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <button
            onClick={() => toggleFavorite(selectedDish.id)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute bottom-1 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-stone-400 hover:text-[#f3942d] transition-colors cursor-pointer"
          >
            <Heart
              size={18}
              className={favorited ? 'fill-[#f3942d] text-[#f3942d]' : ''}
            />
          </button>
        </div>

        {/* Details Content */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-500">
            <Star size={13} fill="currentColor" />
            <span className="text-stone-800 font-bold">{selectedDish.rating}</span>
            <span className="text-stone-400">({selectedDish.reviewsCount} reviews)</span>
          </div>

          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {selectedDish.name}
          </h3>

          <p className="mt-1 text-xl font-extrabold text-[#f3942d]">
            {selectedDish.formattedPrice}
          </p>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 max-w-lg mx-auto">
            {selectedDish.description}
          </p>

          {/* Quick Metrics */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {selectedDish.prepTime && (
              <div className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200/50 px-3 py-1 text-[11px] font-semibold text-amber-800">
                <Clock size={12} />
                <span>{selectedDish.prepTime}</span>
              </div>
            )}
            {selectedDish.calories && (
              <div className="flex items-center gap-1 rounded-full bg-orange-50 border border-orange-200/50 px-3 py-1 text-[11px] font-semibold text-orange-800">
                <Flame size={12} />
                <span>{selectedDish.calories} kcal</span>
              </div>
            )}
            {selectedDish.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold text-stone-600 border border-stone-200/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ingredients Section */}
          {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
            <div className="mt-5 text-left bg-stone-50/80 rounded-2xl p-4 border border-stone-200/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5 mb-2.5">
                <Sparkles size={13} className="text-[#f6922d]" />
                <span>Artisanal Ingredients</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDish.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200/70 text-stone-700 text-xs font-medium"
                  >
                    <Check size={11} className="text-emerald-600" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens Notice */}
          <div className="mt-3 text-left bg-amber-50/60 rounded-xl p-3 border border-amber-200/50 flex items-start gap-2">
            <AlertCircle size={15} className="text-[#d97c1d] shrink-0 mt-0.5" />
            <div className="text-[11px] text-stone-600">
              <span className="font-bold text-stone-800">Allergen Information: </span>
              {selectedDish.allergens && selectedDish.allergens.length > 0 ? (
                <span>Contains {selectedDish.allergens.join(', ')}. Please notify our kitchen staff if you have severe dietary allergies.</span>
              ) : (
                <span>No common registered allergens noted. Gluten-free and dairy-free options available upon request.</span>
              )}
            </div>
          </div>

          {/* Kitchen Note / Instructions */}
          <div className="mt-4 text-left">
            <label htmlFor="dish-special-instructions" className="block text-[11px] font-bold text-stone-700">
              Special Kitchen Instructions
            </label>
            <input
              id="dish-special-instructions"
              type="text"
              placeholder="e.g. Extra virgin olive oil on side, mild chili, no garnish..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f3942d] focus:outline-none"
            />
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-stone-200/60">
            <div className="flex items-center rounded-xl border border-stone-200 bg-white p-1 shadow-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-bold text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-[#f6922d] py-3.5 px-5 text-xs font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-[#e7821d] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add to Order</span>
              <span>•</span>
              <span>${(selectedDish.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
