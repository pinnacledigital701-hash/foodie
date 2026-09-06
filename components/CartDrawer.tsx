'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalCount,
    deliveryFee,
    taxAmount,
    orderTotal,
    setIsCheckoutModalOpen,
    scrollToSection,
  } = useRestaurant();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  if (!isCartOpen) return null;

  const currentDeliveryFee = orderType === 'delivery' ? deliveryFee : 0;
  const currentTotal = (cartSubtotal + currentDeliveryFee + taxAmount).toFixed(2);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleExploreMenu = () => {
    setIsCartOpen(false);
    scrollToSection('menu');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer-panel"
        className="relative flex h-full w-full max-w-md flex-col bg-[#FFFDF8] shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E1D7] px-6 py-5 bg-[#FFFDF8]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7]">
              <ShoppingBag size={17} />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1D1B18]">Your Order</h3>
              <p className="text-[11px] text-[#716D66]">
                {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} in basket
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#716D66] hover:bg-[#F7F3EA] hover:text-[#1D1B18] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C86B3C] border border-[#E8E1D7] mb-4">
              <ShoppingBag size={28} />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#1D1B18]">Your basket is empty</h4>
            <p className="mt-1.5 text-xs text-[#716D66] max-w-xs leading-relaxed">
              Explore our handmade pastas, charred prime cuts, wild-caught seafood, and fresh botanical drinks.
            </p>
            <button
              onClick={handleExploreMenu}
              className="mt-6 rounded-lg bg-[#C86B3C] px-6 py-2.5 text-xs font-medium text-white shadow-[0_4px_12px_rgba(200,107,60,0.20)] hover:bg-[#B65D30] transition-colors cursor-pointer"
            >
              Explore Full Menu
            </button>
          </div>
        ) : (
          /* Populated Cart List */
          <>
            {/* Delivery vs Pickup Selector */}
            <div className="border-b border-[#E8E1D7] px-6 py-3 bg-[#F7F3EA]">
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#E8E1D7]/60 p-1">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-[#FFFDF8] text-[#1D1B18] shadow-xs'
                      : 'text-[#716D66] hover:text-[#1D1B18]'
                  }`}
                >
                  Pickup (Ready in 20 min)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-[#FFFDF8] text-[#1D1B18] shadow-xs'
                      : 'text-[#716D66] hover:text-[#1D1B18]'
                  }`}
                >
                  Delivery {deliveryFee === 0 ? '(Free over $45)' : '($3.50)'}
                </button>
              </div>

              {cartSubtotal < 45 && orderType === 'delivery' && (
                <p className="mt-2 text-[10px] text-[#C86B3C] font-medium text-center">
                  Add ${(45 - cartSubtotal).toFixed(2)} more for complimentary delivery!
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
              {cart.map((item) => (
                <div
                  key={item.dish.id}
                  className="flex items-center gap-3.5 rounded-xl bg-[#FFFDF8] p-3.5 border border-[#E8E1D7] shadow-xs"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#F7F3EA] shadow-inner">
                    <Image
                      src={item.dish.image}
                      alt={item.dish.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="truncate text-xs font-semibold text-[#1D1B18]">
                        {item.dish.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.dish.id)}
                        aria-label={`Remove ${item.dish.name}`}
                        className="text-[#716D66] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-[#C86B3C] mt-0.5">
                      ${(item.dish.price * item.quantity).toFixed(2)}
                    </p>

                    {item.specialInstructions && (
                      <p className="mt-0.5 text-[10px] italic text-[#716D66] truncate">
                        &ldquo;{item.specialInstructions}&rdquo;
                      </p>
                    )}

                    {/* Quantity controls */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-[#E8E1D7] bg-[#F7F3EA]">
                        <button
                          onClick={() => updateCartQuantity(item.dish.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center text-[#716D66] hover:text-[#1D1B18] cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-[#1D1B18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.dish.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center text-[#716D66] hover:text-[#1D1B18] cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="text-[10px] text-[#716D66]">
                        ${item.dish.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary & Checkout */}
            <div className="border-t border-[#E8E1D7] bg-[#FFFDF8] px-6 py-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#716D66]">
                <span>Subtotal</span>
                <span className="text-[#1D1B18] font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-[#716D66]">
                  <span>Delivery Fee</span>
                  <span className="text-[#1D1B18] font-medium">{currentDeliveryFee === 0 ? 'FREE' : `$${currentDeliveryFee.toFixed(2)}`}</span>
                </div>
              )}
              <div className="flex justify-between text-[#716D66]">
                <span>Estimated Tax (8.875%)</span>
                <span className="text-[#1D1B18] font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8E1D7] pt-2 text-sm font-semibold text-[#1D1B18]">
                <span>Total Due</span>
                <span className="text-[#C86B3C] font-serif text-base">${currentTotal}</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#C86B3C] py-3.5 text-xs font-medium text-white shadow-[0_4px_12px_rgba(200,107,60,0.20)] transition-all hover:bg-[#B65D30] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
