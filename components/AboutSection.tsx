'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Leaf, HeartHandshake, Sparkles, Award, Utensils, Quote } from 'lucide-react';
import { EXECUTIVE_CHEF, PASTRY_CHEF, RESTAURANT_VALUES, INGREDIENT_PARTNERS } from '@/data/aboutData';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-label="About Foodie" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Story & Heritage Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase">
              <Award size={14} className="text-[#f6922d]" />
              <span>Established 2018 • New York</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#11142d] tracking-tight leading-[1.14]">
              A Passion For{' '}
              <span className="relative inline-block text-[#f3942d] px-1.5">
                Artisanal
                <HandDrawnLoop strokeColor="#F5B83F">
                  <span className="sr-only">Artisanal</span>
                </HandDrawnLoop>
              </span>{' '}
              Craftsmanship
            </h2>

            <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-medium">
              Foodie was born from the timeless joy of gathering around vibrant tables with family and friends. We set out to create a welcoming restaurant where food is cooked with love, served with infectious energy, and packed with bold, memorable flavor.
            </p>

            <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed font-medium">
              Every pasta dough is rolled daily in-house using stone-ground semolina. Every stock simmers overnight, extracting rich bone and roasted vegetable depths without shortcut broths or synthetic preservatives.
            </p>

            <div className="pt-2 flex items-center gap-8 text-stone-900">
              <div className="border-l-3 border-[#f6922d] pl-4">
                <span className="block text-2xl sm:text-3xl font-black text-stone-900">100%</span>
                <span className="text-xs text-stone-500 font-bold">Daily Handcrafted Pastas</span>
              </div>
              <div className="border-l-3 border-[#f6922d] pl-4">
                <span className="block text-2xl sm:text-3xl font-black text-stone-900">14+</span>
                <span className="text-xs text-stone-500 font-bold">Certified Organic Partner Farms</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[360px] sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
                alt="Foodie restaurant dining room"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 max-w-xs bg-white p-4.5 rounded-2xl shadow-xl border border-stone-100 flex items-start gap-3">
              <Quote size={20} className="text-[#f6922d] shrink-0 mt-1" />
              <p className="text-xs italic text-stone-800 leading-snug font-medium">
                &ldquo;We don&apos;t chase fleeting food fads; we cook honest, mouthwatering food at the peak of each season.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="rounded-3xl bg-stone-900 p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">Our Kitchen Philosophy</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Slow Food, Honest Fire, and Pure Ingredients
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl mx-auto font-medium">
              We reject industrial convenience. When ingredients ripen under natural sun, we let them shine with nothing more than olive oil, sea salt, and passion. Cooking is an act of love.
            </p>
          </div>
        </div>

        {/* Meet the Chefs Section */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#f6922d]">Culinary Leadership</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1.5">
              The Masters Behind the Hearth
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Executive Chef */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-amber-100 shadow-md">
                <Image
                  src={EXECUTIVE_CHEF.image}
                  alt={EXECUTIVE_CHEF.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#f6922d] uppercase tracking-wider">
                  {EXECUTIVE_CHEF.role}
                </span>
                <h4 className="text-lg font-bold text-stone-900">{EXECUTIVE_CHEF.name}</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">{EXECUTIVE_CHEF.bio}</p>
                <div className="pt-2 text-xs text-stone-800 font-semibold">
                  <span className="text-stone-400 font-normal">Signature: </span>
                  <span className="text-[#f6922d] font-bold">{EXECUTIVE_CHEF.signatureDish}</span>
                </div>
              </div>
            </div>

            {/* Pastry Chef */}
            <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full ring-4 ring-amber-100 shadow-md">
                <Image
                  src={PASTRY_CHEF.image}
                  alt={PASTRY_CHEF.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#f6922d] uppercase tracking-wider">
                  {PASTRY_CHEF.role}
                </span>
                <h4 className="text-lg font-bold text-stone-900">{PASTRY_CHEF.name}</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">{PASTRY_CHEF.bio}</p>
                <div className="pt-2 text-xs text-stone-800 font-semibold">
                  <span className="text-stone-400 font-normal">Signature: </span>
                  <span className="text-[#f6922d] font-bold">{PASTRY_CHEF.signatureDish}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Provenance */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#f6922d]">Provenance & Origin</span>
            <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-1.5">
              Ingredients We Refuse to Compromise On
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INGREDIENT_PARTNERS.map((ing, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-5 border border-stone-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#f6922d] mb-1">
                  {ing.origin}
                </div>
                <h5 className="text-sm font-bold text-stone-900 mb-1.5">{ing.name}</h5>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">{ing.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#f6922d]">Our Guiding Values</span>
            <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight mt-1.5">
              Committed to Good Food & Great Care
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESTAURANT_VALUES.map((val, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-6 border border-stone-200 shadow-xs text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-[#f6922d]">
                  {idx === 0 && <Flame size={18} />}
                  {idx === 1 && <Leaf size={18} />}
                  {idx === 2 && <HeartHandshake size={18} />}
                  {idx === 3 && <Sparkles size={18} />}
                </div>
                <h5 className="text-sm font-bold text-stone-900">{val.title}</h5>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
