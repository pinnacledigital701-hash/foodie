'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { FoodCard } from '@/components/FoodCard';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';
import { POPULAR_DISHES } from '@/data/dishes';
import { useRestaurant } from '@/context/RestaurantContext';

export const PopularDishes: React.FC = () => {
  const { setSelectedDish, scrollToSection } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'noodles', label: 'Noodles' },
    { id: 'pasta', label: 'Artisan Pasta' },
    { id: 'rice', label: 'Rice & Bowls' },
    { id: 'salad', label: 'Salads' },
  ];

  const filteredDishes = activeCategory === 'all'
    ? POPULAR_DISHES
    : POPULAR_DISHES.filter((dish) => dish.category === activeCategory);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Slice displayed dishes based on active page
  const displayedDishes = filteredDishes.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section
      id="popular"
      aria-label="Popular Dishes"
      className="relative px-6 sm:px-12 lg:px-16 pb-16 pt-6"
    >
      {/* Section Header: Title with Hand-drawn Loop & Slider Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h2 className="text-[30px] sm:text-[36px] font-extrabold tracking-tight text-[#11142d]">
            Our Popular{' '}
            <span className="relative inline-block text-[#f3942d] px-1.5">
              Dishes
              <HandDrawnLoop strokeColor="#F5B83F">
                <span className="sr-only">Dishes</span>
              </HandDrawnLoop>
            </span>
          </h2>
          <p className="mt-1.5 text-sm text-stone-500 font-medium">
            Handcrafted chef specialties prepared daily with fresh gourmet ingredients.
          </p>
        </div>

        {/* Carousel pagination and controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {totalPages > 1 && (
            <span className="text-xs font-semibold text-stone-500 mr-2">
              {currentPage + 1} / {totalPages}
            </span>
          )}

          <button
            id="popular-dishes-prev-btn"
            onClick={handlePrev}
            aria-label="Previous dishes"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:text-stone-900 hover:bg-stone-50 cursor-pointer shadow-xs"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>

          <button
            id="popular-dishes-next-btn"
            onClick={handleNext}
            aria-label="Next dishes"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6922d] text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-[#e7821d] hover:scale-105 cursor-pointer"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(0);
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#f6922d] text-white shadow-md shadow-orange-200/80'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Grid of Dish Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayedDishes.map((dish) => (
          <FoodCard
            key={dish.id}
            dish={dish}
            onSelect={(selected) => setSelectedDish(selected)}
          />
        ))}
      </div>

      {/* Quick link to Full Menu below */}
      <div className="mt-10 text-center">
        <button
          onClick={() => scrollToSection('menu')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 text-xs font-bold text-stone-800 shadow-xs hover:border-[#f6922d] hover:text-[#f6922d] transition-all cursor-pointer"
        >
          <span>Explore Full A La Carte Menu</span>
          <ArrowDown size={14} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
};
