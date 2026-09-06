export type MenuCategoryId =
  | 'all'
  | 'starters'
  | 'main-courses'
  | 'pasta'
  | 'seafood'
  | 'desserts'
  | 'drinks'
  | 'noodles'
  | 'rice'
  | 'salad'
  | 'special';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  icon?: string;
  description?: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  rating: string;
  reviewsCount: string;
  category: MenuCategoryId;
  image: string;
  description: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  prepTime?: string;
  tags?: string[];
  isSpecial?: boolean;
  isChefRecommendation?: boolean;
  spicyLevel?: number; // 0 to 3
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'patio' | 'private-booth' | 'chef-counter';
  specialRequests?: string;
  notes?: string;
  status?: 'confirmed' | 'pending';
  createdAt?: string;
}

// Backwards-compatible alias
export type ReservationData = Reservation;

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  dishName?: string;
  avatar?: string;
  verifiedDiner?: boolean;
  source?: string; // e.g. "Michelin Guide Review", "Verified Guest"
  role?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'culinary' | 'moments';
  image: string;
  caption: string;
  aspectRatio?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
}
