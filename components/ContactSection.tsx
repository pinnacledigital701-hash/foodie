'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { HandDrawnLoop } from '@/components/HandDrawnLoop';

export const ContactSection: React.FC = () => {
  const { sendContactMessage, showToast } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    sendContactMessage(formData);
    setIsSent(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <section id="contact" aria-label="Contact & Location" className="py-20 px-6 sm:px-10 lg:px-16 border-t border-[#E8E1D7]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F3EA] border border-[#E8E1D7] text-[#C86B3C] text-[11px] font-medium tracking-wider uppercase mb-3">
            <Sparkles size={12} />
            <span>Connect & Visit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1D1B18] tracking-tight">
            Get In{' '}
            <span className="relative inline-block text-[#C86B3C] font-serif italic px-2">
              Touch
              <HandDrawnLoop strokeColor="#C86B3C">
                <span className="sr-only">Touch</span>
              </HandDrawnLoop>
            </span>
          </h2>

          <p className="mt-3 text-[14px] text-[#716D66] leading-relaxed">
            For private event bookings, press inquiries, or general dining questions, our team is at your service.
          </p>
        </div>

        {/* 4 Info Cards: Address, Phone, Email, Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Address */}
          <div className="rounded-xl bg-[#FFFDF8] p-5 border border-[#E8E1D7] shadow-[0_12px_35px_rgba(30,25,20,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7] mb-3">
                <MapPin size={18} />
              </div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-[#716D66]">Location</h4>
              <p className="mt-1 font-serif text-base font-semibold text-[#1D1B18]">24 Food Street</p>
              <p className="text-xs text-[#716D66]">SoHo, New York, NY 10012</p>
            </div>
            <button
              onClick={() => showToast('Opening directions in maps... (24 Food St, New York)')}
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#C86B3C] hover:text-[#B65D30] cursor-pointer"
            >
              <Navigation size={12} />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Phone */}
          <div className="rounded-xl bg-[#FFFDF8] p-5 border border-[#E8E1D7] shadow-[0_12px_35px_rgba(30,25,20,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7] mb-3">
                <Phone size={18} />
              </div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-[#716D66]">Phone</h4>
              <p className="mt-1 font-serif text-base font-semibold text-[#1D1B18]">+1 800 123 4567</p>
              <p className="text-xs text-[#716D66]">Reservations & Concierge</p>
            </div>
            <a
              href="tel:+18001234567"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#C86B3C] hover:text-[#B65D30]"
            >
              <span>Call Reception</span>
            </a>
          </div>

          {/* Email */}
          <div className="rounded-xl bg-[#FFFDF8] p-5 border border-[#E8E1D7] shadow-[0_12px_35px_rgba(30,25,20,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7] mb-3">
                <Mail size={18} />
              </div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-[#716D66]">Email</h4>
              <p className="mt-1 font-serif text-base font-semibold text-[#1D1B18]">hello@foodie.com</p>
              <p className="text-xs text-[#716D66]">Events & Press Inquiries</p>
            </div>
            <a
              href="mailto:hello@foodie.com"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#C86B3C] hover:text-[#B65D30]"
            >
              <span>Send Message</span>
            </a>
          </div>

          {/* Hours */}
          <div className="rounded-xl bg-[#FFFDF8] p-5 border border-[#E8E1D7] shadow-[0_12px_35px_rgba(30,25,20,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7] mb-3">
                <Clock size={18} />
              </div>
              <h4 className="text-[10px] font-medium uppercase tracking-wider text-[#716D66]">Operating Hours</h4>
              <p className="mt-1 text-xs font-semibold text-[#1D1B18]">Lunch: 11:00 AM – 3:00 PM</p>
              <p className="text-xs text-[#716D66]">Dinner: 5:00 PM – 11:00 PM</p>
            </div>
            <span className="mt-4 text-[11px] font-medium text-[#C86B3C]">Open Daily</span>
          </div>
        </div>

        {/* Split Section: Interactive Contact Form & Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FFFDF8] p-6 sm:p-8 shadow-[0_12px_35px_rgba(30,25,20,0.06)] border border-[#E8E1D7]">
            <h3 className="font-serif text-xl font-semibold text-[#1D1B18] mb-1">Send Us a Message</h3>
            <p className="text-xs text-[#716D66] mb-6">
              Our culinary concierge usually responds within 2-3 hours during operating hours.
            </p>

            {isSent ? (
              <div className="py-10 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1D1B18]">Message Received</h4>
                <p className="text-xs text-[#716D66] max-w-xs mx-auto">
                  Thank you for reaching out. We will review your inquiry and get back to you promptly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-medium text-[#C86B3C] hover:underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#1D1B18] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2.5 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1D1B18] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2.5 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#1D1B18] mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2.5 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#1D1B18] mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3 py-2.5 text-[#1D1B18] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Dining & Events">Private Dining & Events</option>
                      <option value="Chef Tasting Menu Questions">Chef Tasting Menu Questions</option>
                      <option value="Feedback & Press">Feedback & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1D1B18] mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2.5 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#C86B3C] py-3 font-medium text-white shadow-[0_4px_12px_rgba(200,107,60,0.20)] hover:bg-[#B65D30] transition-colors cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Map Location Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#F7F3EA] p-6 border border-[#E8E1D7] relative overflow-hidden flex flex-col justify-between shadow-[0_12px_35px_rgba(30,25,20,0.04)]">
            <div className="absolute inset-0 bg-[radial-gradient(#d5cdc1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FFFDF8] text-[#1D1B18] font-medium text-[11px] border border-[#E8E1D7] shadow-xs">
                SoHo / Manhattan, NY
              </span>
              <button
                onClick={() => showToast('Opening directions to Foodie Restaurant (24 Food St, New York)')}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#C86B3C] text-white text-[11px] font-medium shadow-xs hover:bg-[#B65D30] transition-colors cursor-pointer"
              >
                <Navigation size={11} />
                <span>Directions</span>
              </button>
            </div>

            {/* Map Center Pin */}
            <div className="relative z-10 my-12 text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-2 rounded-full bg-[#C86B3C]/20 animate-ping" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#C86B3C] text-white shadow-xl mx-auto">
                  <MapPin size={24} />
                </div>
              </div>
              <h4 className="font-serif mt-3 text-base font-semibold text-[#1D1B18]">Foodie Restaurant</h4>
              <p className="text-xs text-[#716D66]">24 Food Street, New York, NY</p>
            </div>

            {/* Bottom details card */}
            <div className="relative z-10 rounded-xl bg-[#FFFDF8] p-4 border border-[#E8E1D7] text-xs text-[#716D66] space-y-1 shadow-xs">
              <div className="flex justify-between">
                <span>Subway:</span>
                <span className="font-medium text-[#1D1B18]">Spring St (C, E) • Prince St (R, W)</span>
              </div>
              <div className="flex justify-between">
                <span>Valet Parking:</span>
                <span className="font-medium text-[#1D1B18]">Available from 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
