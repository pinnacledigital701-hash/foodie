'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Utensils } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { ReservationData } from '@/types/restaurant';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, addReservation } = useRestaurant();
  const [step, setStep] = useState<'form' | 'confirmed'>('form');

  const [formData, setFormData] = useState<ReservationData>(() => ({
    name: '',
    email: '',
    phone: '',
    date: '2026-09-06',
    time: '7:30 PM',
    guests: 2,
    seatingPreference: 'indoor',
    notes: '',
  }));

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    addReservation(formData);
    setStep('confirmed');
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setTimeout(() => setStep('form'), 300);
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  return (
    <div
      id="reservation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="reservation-modal-content"
        className="relative w-full max-w-lg rounded-3xl bg-[#fffdf8] p-6 sm:p-8 shadow-2xl ring-1 ring-stone-200/80 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close reservation modal"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-800 transition-colors"
        >
          <X size={18} />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2.5 text-[#f39a2e]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f39a2e]">
                <Utensils size={15} />
              </div>
              <span className="text-base font-bold">Foodie Table Booking</span>
            </div>

            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900">
              Reserve a Table
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Join us for lunch or dinner. We hold tables for 15 minutes past reservation time.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none focus:ring-1 focus:ring-[#f39a2e]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-stone-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none focus:ring-1 focus:ring-[#f39a2e]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-700">Email Address</label>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none focus:ring-1 focus:ring-[#f39a2e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Calendar size={12} className="text-[#f39a2e]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-stone-800 focus:border-[#f39a2e] focus:outline-none"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Clock size={12} className="text-[#f39a2e]" /> Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-800 focus:border-[#f39a2e] focus:outline-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Users size={12} className="text-[#f39a2e]" /> Party Size
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-800 focus:border-[#f39a2e] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-bold text-stone-700">Seating Area</label>
                <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className={`rounded-xl border py-2 text-[11px] font-semibold transition-all ${
                        formData.seatingPreference === seat.id
                          ? 'border-[#f39a2e] bg-amber-50 text-[#d97c1d] shadow-xs'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {seat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700">
                  Special Occasion or Dietary Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary, birthday, window seat preference, gluten intolerance..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:border-[#f39a2e] focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#f7922e] py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(247,146,46,0.3)] transition-all hover:bg-[#e8811d]"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-stone-900">
              Table Reserved!
            </h3>
            <p className="mt-2 text-xs text-stone-500 max-w-sm mx-auto">
              We look forward to welcoming you, <span className="font-semibold text-stone-800">{formData.name}</span>. A confirmation notification has been recorded for your party of {formData.guests}.
            </p>

            <div className="mt-6 rounded-2xl bg-amber-50/70 p-4 text-left text-xs border border-amber-200/60">
              <div className="flex justify-between py-1 border-b border-amber-200/40">
                <span className="text-stone-500">Date & Time</span>
                <span className="font-bold text-stone-800">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-200/40">
                <span className="text-stone-500">Party Size</span>
                <span className="font-bold text-stone-800">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Seating</span>
                <span className="font-bold text-stone-800 capitalize">{formData.seatingPreference.replace('-', ' ')}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 w-full rounded-xl bg-[#11142d] py-3 text-xs font-bold text-white shadow-md hover:bg-stone-800 transition-colors"
            >
              Done & Return to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
