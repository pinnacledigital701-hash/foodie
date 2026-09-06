'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, Plus, Heart, Sparkles, Filter, Search, Check, Flame } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { ALL_MENU_DISHES } from '@/data/dishes';
import { MENU_CATEGORIES } from '@/data/menuCategories';
import { Dish, MenuCategoryId } from '@/types/restaurant';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const MenuSection: React.FC = () => {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
    setSelectedDish,
    selectedMenuCategory,
    setSelectedMenuCategory,
  } = useRestaurant();

  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegetarian' | 'special' | 'gluten-free'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered dishes calculation
  const filteredDishes = useMemo(() => {
    return ALL_MENU_DISHES.filter((dish) => {
      // Category filter
      if (selectedMenuCategory !== 'all' && dish.category !== selectedMenuCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'vegetarian') {
        const isVeg = dish.tags?.some((t) => t.toLowerCase().includes('veg')) || false;
        if (!isVeg) return false;
      }
      if (dietaryFilter === 'special') {
        if (!dish.isSpecial && !dish.isChefRecommendation) return false;
      }
      if (dietaryFilter === 'gluten-free') {
        const isGf = dish.tags?.some((t) => t.toLowerCase().includes('gluten-free')) || false;
        if (!isGf) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesTag = dish.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      return true;
    });
  }, [selectedMenuCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" aria-label="Restaurant Menu" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase mb-3">
          <Sparkles size={13} className="text-[#f6922d]" />
          <span>Curated Tasting & A La Carte</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#11142d] tracking-tight">
          Explore Our Complete{' '}
          <span className="relative inline-block text-[#f3942d] px-1.5">
            Menu
            <HandDrawnLoop strokeColor="#F5B83F">
              <span className="sr-only">Menu</span>
            </HandDrawnLoop>
          </span>
        </h2>

        <p className="mt-3 text-sm text-stone-500 leading-relaxed font-medium">
          Every creation is prepared to order using farm-fresh organic ingredients, artisan sauces, and signature chef craftsmanship.
        </p>
      </div>

      {/* Controls: Search & Category Tabs */}
      <div className="space-y-5 mb-12">
        {/* Category Pills Slider */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedMenuCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedMenuCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#f6922d] text-white shadow-md shadow-orange-200/80'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 shadow-xs'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Bar: Search & Dietary Preferences */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full rounded-xl bg-stone-50 pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 border border-stone-200 focus:bg-white focus:outline-none focus:border-[#f6922d]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Tag Toggles */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-stone-500 mr-1 flex items-center gap-1">
              <Filter size={13} /> Filter:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'special', label: "Chef's Picks", icon: Sparkles },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'gluten-free', label: 'Gluten-Free' },
            ].map((d) => {
              const active = dietaryFilter === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDietaryFilter(d.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#f6922d] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dish Grid with smooth state transitions */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#f6922d] mb-3">
            <Search size={20} />
          </div>
          <h3 className="text-base font-bold text-stone-900">No matching dishes found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search term or switching back to all categories to view our full selection.
          </p>
          <button
            onClick={() => {
              setSelectedMenuCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 bg-[#f6922d] text-white text-xs font-bold rounded-xl hover:bg-[#e7821d] transition-colors cursor-pointer shadow-md shadow-orange-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => {
            const favorited = isFavorite(dish.id);
            return (
              <article
                key={dish.id}
                id={`menu-card-${dish.id}`}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.05)] border border-stone-100/90 transition-all duration-300 hover:shadow-[0_18px_40px_rgba(246,146,45,0.12)] hover:-translate-y-1"
              >
                {/* Top header: Badges & Favorite */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5">
                    {dish.isChefRecommendation && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-800 text-[10px] font-bold">
                        <Sparkles size={10} /> Chef Pick
                      </span>
                    )}
                    {dish.spicyLevel ? (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold">
                        <Flame size={10} /> Spicy
                      </span>
                    ) : null}
                  </div>

                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Heart
                      size={16}
                      strokeWidth={2}
                      className={`transition-all ${favorited ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Circular photography */}
                <div
                  className="relative w-32 h-32 mx-auto my-2 rounded-full overflow-hidden border-2 border-amber-50 shadow-sm cursor-pointer group-hover:scale-[1.05] transition-transform duration-300"
                  onClick={() => setSelectedDish(dish)}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Rating & reviews */}
                <div className="flex items-center justify-center gap-1 font-bold text-xs mt-1">
                  <Star size={12} className="text-amber-400" fill="currentColor" stroke="none" />
                  <span className="text-stone-900">{dish.rating}</span>
                  <span className="text-stone-400 font-normal">({dish.reviewsCount})</span>
                </div>

                {/* Title & Description */}
                <div className="text-center mt-1.5 flex-1">
                  <h3
                    onClick={() => setSelectedDish(dish)}
                    className="cursor-pointer font-bold text-sm text-stone-900 transition-colors hover:text-[#f3942d] line-clamp-1"
                  >
                    {dish.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-medium">
                    {dish.description}
                  </p>
                </div>

                {/* Price & Add to Order action */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-[#f3942d]">
                      {dish.formattedPrice}
                    </span>
                    {dish.calories && (
                      <span className="block text-[10px] text-stone-400">
                        {dish.calories} kcal
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDish(dish)}
                      className="text-[11px] font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(dish, 1)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f6922d] text-white text-xs font-bold shadow-xs hover:bg-[#e7821d] transition-colors cursor-pointer"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
