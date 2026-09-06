'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, Utensils, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Reservation } from '@/types/restaurant';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const ReservationSection: React.FC = () => {
  const { addReservation } = useRestaurant();
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const [formData, setFormData] = useState<Reservation>(() => ({
    name: '',
    email: '',
    phone: '',
    date: '2026-09-06',
    time: '7:00 PM',
    guests: 2,
    seatingPreference: 'indoor',
    specialRequests: '',
  }));

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addReservation(formData);
    setConfirmedReservation(formData);
  };

  return (
    <section id="reservation" aria-label="Table Reservation" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 text-[#d97c1d] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-[#f6922d]" />
            <span>Table Service & Celebrations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#11142d] tracking-tight">
            Reserve Your{' '}
            <span className="relative inline-block text-[#f3942d] px-1.5">
              Table
              <HandDrawnLoop strokeColor="#F5B83F">
                <span className="sr-only">Table</span>
              </HandDrawnLoop>
            </span>
          </h2>

          <p className="mt-3 text-sm text-stone-500 leading-relaxed font-medium">
            Reserve a table in our sunlit main dining room, cozy private booths, or evening patio.
          </p>
        </div>

        {confirmedReservation ? (
          <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-stone-200 text-center max-w-xl mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-[#f6922d] mb-4">
              <CheckCircle2 size={36} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#f6922d] text-xs font-bold uppercase tracking-wider mb-2">
              Booking Confirmed
            </span>

            <h3 className="text-2xl font-black text-stone-900">
              We Can&apos;t Wait to Host You!
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-sm mx-auto font-medium">
              A reservation for <strong className="text-stone-900 font-bold">{confirmedReservation.guests} guests</strong> under{' '}
              <strong className="text-stone-900 font-bold">{confirmedReservation.name}</strong> is confirmed.
            </p>

            <div className="my-6 rounded-2xl bg-stone-50 border border-stone-200 p-5 text-left text-xs space-y-2.5 font-medium">
              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#f6922d]" /> Date & Time:
                </span>
                <span className="font-bold text-stone-800">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Users size={13} className="text-[#f6922d]" /> Party Size:
                </span>
                <span className="font-bold text-stone-800">{confirmedReservation.guests} Guests</span>
              </div>

              <div className="flex justify-between py-1 border-b border-stone-200/80">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Utensils size={13} className="text-[#f6922d]" /> Seating Area:
                </span>
                <span className="font-bold text-stone-800 capitalize">
                  {confirmedReservation.seatingPreference.replace('-', ' ')}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#f6922d]" /> Location:
                </span>
                <span className="font-bold text-stone-800">24 Food Street, New York</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="rounded-xl bg-[#f6922d] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e7821d] transition-colors cursor-pointer"
            >
              Book Another Table
            </button>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-lg border border-stone-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#f6922d] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#f6922d] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#f6922d] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
                    <Calendar size={13} className="text-[#f6922d]" /> Reservation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-[#f6922d] focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
                    <Clock size={13} className="text-[#f6922d]" /> Dining Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-[#f6922d] focus:bg-white focus:outline-none font-medium"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
                    <Users size={13} className="text-[#f6922d]" /> Party Size
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-[#f6922d] focus:bg-white focus:outline-none font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">Seating Preference</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'indoor', label: 'Main Dining' },
                    { id: 'patio', label: 'Garden Patio' },
                    { id: 'private-booth', label: 'Cozy Booth' },
                    { id: 'chef-counter', label: "Chef's Counter" },
                  ].map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, seatingPreference: seat.id as any })}
                      className={`rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer ${
                        formData.seatingPreference === seat.id
                          ? 'border-[#f6922d] bg-amber-50 text-[#f6922d]'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-[#f6922d]/50'
                      }`}
                    >
                      {seat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Special Requests / Dietary Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary, birthday cake request, quiet table, allergy notes..."
                  value={formData.specialRequests || ''}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#f6922d] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#f6922d] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#e7821d] transition-colors cursor-pointer"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
