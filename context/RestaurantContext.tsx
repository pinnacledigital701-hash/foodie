'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, CartItem, Reservation, Review, MenuCategoryId, ContactMessage } from '@/types/restaurant';
import { POPULAR_DISHES, HERO_SALMON_DISH } from '@/data/dishes';
import { INITIAL_REVIEWS } from '@/data/reviews';

interface RestaurantContextType {
  cart: CartItem[];
  favorites: string[];
  addToCart: (dish: Dish, quantity?: number, instructions?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateCartQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
  cartTotalCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  taxAmount: number;
  orderTotal: number;
  
  // Navigation & section view
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
  selectedMenuCategory: MenuCategoryId;
  setSelectedMenuCategory: (category: MenuCategoryId) => void;

  // Modals state
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isOrderOnlineOpen: boolean;
  setIsOrderOnlineOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isLeaveReviewOpen: boolean;
  setIsLeaveReviewOpen: (open: boolean) => void;
  selectedDish: Dish | null;
  setSelectedDish: (dish: Dish | null) => void;

  // Reservation & reviews
  reservations: Reservation[];
  addReservation: (data: Reservation) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Contact messages
  contactMessages: ContactMessage[];
  sendContactMessage: (msg: ContactMessage) => void;

  // Checkout simulation
  placeOrder: (notes?: string) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Prepopulate with 1 item (e.g. Salmon Salad)
  const [cart, setCart] = useState<CartItem[]>([
    {
      dish: HERO_SALMON_DISH,
      quantity: 1,
      specialInstructions: 'Dressing on the side, please',
    },
  ]);

  const [favorites, setFavorites] = useState<string[]>([
    'dish-chinese-noodles',
    'hero-salmon-salad',
  ]);

  // Section and Category state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategoryId>('all');

  // Modals state
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderOnlineOpen, setIsOrderOnlineOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isLeaveReviewOpen, setIsLeaveReviewOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Dynamic lists
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const addToCart = (dish: Dish, quantity = 1, instructions = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                specialInstructions: instructions || item.specialInstructions,
              }
            : item
        );
      }
      return [...prev, { dish, quantity, specialInstructions: instructions }];
    });
    showToast(`Added "${dish.name}" to order! 🍽️`);
  };

  const removeFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const updateCartQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.dish.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(dishId);
      if (isFav) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== dishId);
      } else {
        showToast('Saved to favorites! ❤️');
        return [...prev, dishId];
      }
    });
  };

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.dish.price * item.quantity,
    0
  );
  const deliveryFee = cartSubtotal > 45 || cartSubtotal === 0 ? 0 : 3.5;
  const taxAmount = Math.round(cartSubtotal * 0.08875 * 100) / 100;
  const orderTotal = Math.round((cartSubtotal + deliveryFee + taxAmount) * 100) / 100;

  const addReservation = (data: Reservation) => {
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now().toString(36)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    showToast(`Table reserved for ${data.guests} guests on ${data.date} at ${data.time}! 🎉`);
  };

  const addReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now().toString(36)}`,
      date: 'Just now',
      verifiedDiner: true,
      source: 'Verified Guest Review',
    };
    setReviews((prev) => [fullReview, ...prev]);
    showToast('Thank you for sharing your dining review! ⭐');
    setIsLeaveReviewOpen(false);
  };

  const sendContactMessage = (msg: ContactMessage) => {
    setContactMessages((prev) => [...prev, { ...msg, id: `msg-${Date.now()}` }]);
    showToast(`Thank you, ${msg.name}! Your message has been received.`);
  };

  const placeOrder = (notes?: string) => {
    if (cart.length === 0) return;
    setIsCheckoutModalOpen(true);
    setIsCartOpen(false);
  };

  return (
    <RestaurantContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        cartTotalCount,
        cartSubtotal,
        deliveryFee,
        taxAmount,
        orderTotal,

        activeSection,
        setActiveSection,
        scrollToSection,
        selectedMenuCategory,
        setSelectedMenuCategory,

        isReservationOpen,
        setIsReservationOpen,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isOrderOnlineOpen,
        setIsOrderOnlineOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isLeaveReviewOpen,
        setIsLeaveReviewOpen,
        selectedDish,
        setSelectedDish,

        reservations,
        addReservation,
        reviews,
        addReview,
        contactMessages,
        sendContactMessage,
        placeOrder,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
