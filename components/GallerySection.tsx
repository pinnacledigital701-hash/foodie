'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types/restaurant';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'interior' | 'culinary' | 'moments'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const currentIndex = activePhoto ? GALLERY_ITEMS.findIndex((i) => i.id === activePhoto.id) : -1;

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActivePhoto(GALLERY_ITEMS[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActivePhoto(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <section id="gallery" aria-label="Restaurant Gallery" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-[#f6922d]" />
            <span>Visual Atmosphere</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#11142d] tracking-tight">
            The Foodie{' '}
            <span className="relative inline-block text-[#f3942d] px-1.5">
              Gallery
              <HandDrawnLoop strokeColor="#F5B83F">
                <span className="sr-only">Gallery</span>
              </HandDrawnLoop>
            </span>
          </h2>

          <p className="mt-3 text-sm text-stone-500 leading-relaxed font-medium">
            A glimpse into our open hearth, candlelit tables, garden pergola, and kitchen craft.
          </p>

          {/* Category Tabs */}
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Moments' },
              { id: 'interior', label: 'Dining Ambience' },
              { id: 'culinary', label: 'Culinary Craft' },
              { id: 'moments', label: 'Guest Evenings' },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#f6922d] text-white shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold truncate pr-2">{item.title}</h4>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-xs text-white">
                    <Maximize2 size={14} />
                  </div>
                </div>
                <p className="text-xs text-stone-200 line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            id="gallery-lightbox-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Prev / Next Controls */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>

              <div className="relative h-[450px] sm:h-[520px] w-full">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-stone-900 p-6 border-t border-stone-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{activePhoto.title}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{activePhoto.caption}</p>
                </div>
                <span className="text-xs font-bold text-[#f6922d] uppercase tracking-wider">
                  {activePhoto.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
