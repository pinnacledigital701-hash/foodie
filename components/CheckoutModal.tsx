'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, CreditCard, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    taxAmount,
    orderTotal,
    showToast,
  } = useRestaurant();

  const [deliveryAddress, setDeliveryAddress] = useState('142 Mercer Street, Apt 4B, New York, NY 10012');
  const [phoneNumber, setPhoneNumber] = useState('(212) 555-0198');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cash'>('card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string; time: string } | null>(null);

  if (!isCheckoutModalOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim() || !phoneNumber.trim()) {
      showToast('Please provide your delivery address and contact phone.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = `FD-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrder({
        id: orderId,
        time: '25 – 35 minutes',
      });
      clearCart();
      showToast(`Order ${orderId} confirmed! Our kitchen is preparing your dishes. 👨‍🍳`);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="checkout-modal-content"
        className="relative w-full max-w-lg rounded-2xl bg-[#FFFDF8] p-6 sm:p-8 shadow-2xl border border-[#E8E1D7] max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          aria-label="Close checkout"
          className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F3EA] text-[#716D66] hover:text-[#1D1B18] border border-[#E8E1D7] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {confirmedOrder ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F3EA] border border-[#E8E1D7] text-[#C86B3C] mb-4">
              <CheckCircle2 size={32} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#F7F3EA] border border-[#E8E1D7] text-[#C86B3C] text-xs font-medium uppercase tracking-wider mb-2">
              Order Confirmed • #{confirmedOrder.id}
            </span>

            <h3 className="font-serif text-2xl font-semibold text-[#1D1B18]">
              Kitchen is Preparing Your Order!
            </h3>

            <p className="mt-2 text-xs text-[#716D66] max-w-xs mx-auto">
              Estimated delivery arrival in <strong className="text-[#1D1B18] font-semibold">{confirmedOrder.time}</strong> to {deliveryAddress}.
            </p>

            <div className="my-6 rounded-xl bg-[#F7F3EA] border border-[#E8E1D7] p-4 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-[#716D66]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock size={14} className="text-[#C86B3C]" /> Estimated Time:
                </span>
                <span className="font-medium text-[#1D1B18]">{confirmedOrder.time}</span>
              </div>
              <div className="flex items-center justify-between text-[#716D66]">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin size={14} className="text-[#C86B3C]" /> Delivery To:
                </span>
                <span className="truncate max-w-[200px] text-[#1D1B18] font-medium">{deliveryAddress}</span>
              </div>
              <div className="flex items-center justify-between text-[#716D66]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck size={14} className="text-[#C86B3C]" /> Courier Status:
                </span>
                <span className="text-[#C86B3C] font-medium">Assigned • Chef Prep</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-lg bg-[#C86B3C] py-3 text-xs font-medium text-white shadow-[0_4px_12px_rgba(200,107,60,0.20)] hover:bg-[#B65D30] transition-colors cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7]">
                <Truck size={17} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1D1B18]">Checkout & Delivery</h3>
                <p className="text-[11px] text-[#716D66]">Complete your gourmet meal order</p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="mb-4 max-h-36 overflow-y-auto divide-y divide-[#E8E1D7]/60 rounded-xl bg-[#F7F3EA] p-3 border border-[#E8E1D7] text-xs">
              {cart.map((item) => (
                <div key={item.dish.id} className="py-1.5 flex items-center justify-between">
                  <span className="text-[#1D1B18] font-medium">
                    {item.quantity}x {item.dish.name}
                  </span>
                  <span className="text-[#716D66] font-semibold">
                    ${(item.dish.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#1D1B18] mb-1">
                  Delivery Street Address
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#716D66]" />
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] pl-9 pr-3 py-2 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                    placeholder="Enter full address, apartment or suite"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1D1B18] mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-[11px] font-medium text-[#1D1B18] mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple-pay', label: 'Apple Pay' },
                    { id: 'cash', label: 'Cash on Arrival' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2.5 rounded-lg border text-center text-[11px] font-medium transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'border-[#C86B3C] bg-[#F7F3EA] text-[#C86B3C]'
                          : 'border-[#E8E1D7] bg-[#FFFDF8] text-[#716D66] hover:border-[#C86B3C]/50'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-medium text-[#1D1B18] mb-1">
                  Delivery Gate or Drop-off Notes (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Ring apartment buzzer #4B, leave at door..."
                  className="w-full rounded-lg border border-[#E8E1D7] bg-[#F7F3EA] px-3.5 py-2 text-[#1D1B18] placeholder:text-[#716D66] focus:border-[#C86B3C] focus:bg-[#FFFDF8] focus:outline-none"
                />
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#E8E1D7] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#716D66]">
                  <span>Subtotal</span>
                  <span className="text-[#1D1B18] font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#716D66]">
                  <span>Delivery Fee</span>
                  <span className="text-[#1D1B18] font-medium">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[#716D66]">
                  <span>Sales Tax (8.875%)</span>
                  <span className="text-[#1D1B18] font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E1D7] pt-1.5 text-sm font-semibold text-[#1D1B18]">
                  <span>Total Due</span>
                  <span className="text-[#C86B3C] font-serif text-base">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#C86B3C] py-3 text-xs font-medium text-white shadow-[0_4px_12px_rgba(200,107,60,0.20)] hover:bg-[#B65D30] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  <span>{isSubmitting ? 'Securing Your Order...' : `Place Order • $${orderTotal.toFixed(2)}`}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
