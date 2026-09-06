import { MenuCategory } from '@/types/restaurant';

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', label: 'All Dishes', description: 'Explore our complete culinary collection' },
  { id: 'starters', label: 'Starters', description: 'Delicate appetizers crafted to awaken the palate' },
  { id: 'main-courses', label: 'Main Courses', description: 'Hearty chef specialties roasted and seared to perfection' },
  { id: 'pasta', label: 'Pasta', description: 'Freshly rolled bronze-cut pasta tossed in velvet sauces' },
  { id: 'seafood', label: 'Seafood', description: 'Sustainably wild-caught ocean delicacies prepared daily' },
  { id: 'desserts', label: 'Desserts', description: 'Decadent artisanal sweet finishes by Chef Elena' },
  { id: 'drinks', label: 'Drinks', description: 'Handcrafted botanical spritzes, mocktails, and reserve beverages' },
];
