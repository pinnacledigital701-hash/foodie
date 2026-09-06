'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Search, Plus, Star, ArrowRight } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { POPULAR_DISHES, HERO_SALMON_DISH } from '@/data/dishes';
import { Dish } from '@/types/restaurant';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart, setSelectedDish } = useRestaurant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allDishes: Dish[] = useMemo(() => {
    return [HERO_SALMON_DISH, ...POPULAR_DISHES];
  }, []);

  const tags = ['All', 'Vegetarian', 'Gluten-Free', 'High Protein', 'Spicy Option', "Chef's Special"];

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag =
        selectedTag === 'All' ||
        (dish.tags && dish.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }, [allDishes, searchTerm, selectedTag]);

  if (!isSearchOpen) return null;

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="search-modal-content"
        className="relative w-full max-w-2xl rounded-3xl bg-[#fffdf8] p-6 shadow-2xl ring-1 ring-stone-200/80 max-h-[80vh] flex flex-col"
      >
        {/* Header Search Bar */}
        <div className="relative flex items-center border-b border-stone-200/70 pb-4">
          <Search size={20} className="text-stone-400 absolute left-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search noodles, pasta, salads, curries, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl bg-stone-100/70 py-3.5 pl-11 pr-12 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f39a2e]"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:text-stone-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                selectedTag === tag
                  ? 'bg-[#f7922e] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="py-2 text-[11px] font-medium text-stone-400">
          Showing {filteredDishes.length} results
        </div>

        {/* Dish Results List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm">No dishes found matching &ldquo;{searchTerm}&rdquo;</p>
              <p className="mt-1 text-xs text-stone-400">Try searching for noodles, chowmein, pasta, or curry.</p>
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group flex items-center justify-between rounded-2xl bg-white p-3.5 ring-1 ring-stone-200/60 transition-all hover:bg-amber-50/40 hover:shadow-sm"
              >
                <div
                  className="flex items-center gap-3.5 flex-1 cursor-pointer min-w-0"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSelectedDish(dish);
                  }}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-stone-100 shadow-xs">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#f3942d] truncate">
                        {dish.name}
                      </h4>
                      <div className="flex items-center text-[10px] text-amber-500 shrink-0">
                        <Star size={10} fill="currentColor" />
                        <span className="ml-0.5 text-stone-500 font-semibold">{dish.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-1">{dish.description}</p>
                    <span className="text-xs font-bold text-[#f3942d]">{dish.formattedPrice}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSelectedDish(dish);
                    }}
                    className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-[#f3942d]"
                  >
                    <span>Details</span>
                    <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => addToCart(dish)}
                    aria-label={`Add ${dish.name} to cart`}
                    className="flex h-8 items-center gap-1 rounded-lg bg-[#f7922e] px-3 text-[11px] font-bold text-white shadow-xs hover:bg-[#e8811d]"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
