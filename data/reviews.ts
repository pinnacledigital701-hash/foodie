import { Review } from '@/types/restaurant';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    date: 'August 24, 2026',
    comment:
      'Foodie delivers one of the most transcendent culinary journeys in New York. The Truffle Cream Tagliatelle is velvet silk on the tongue, and the warmth of the hospitality mirrors the golden glow of the room.',
    dishName: 'Truffle Cream Tagliatelle',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verifiedDiner: true,
    source: 'The Culinary Review',
    role: 'Gastronomy Critic',
  },
  {
    id: 'rev-2',
    author: 'Chef David Chang',
    rating: 5,
    date: 'August 18, 2026',
    comment:
      'The balance of Mediterranean tradition with playful, modern precision is remarkable. The Mediterranean Branzino with charred capers and fresh salsa verde is textbook perfection.',
    dishName: 'Mediterranean Grilled Branzino',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verifiedDiner: true,
    source: 'Verified Guest',
    role: 'Visiting Chef',
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    rating: 5,
    date: 'August 10, 2026',
    comment:
      'We celebrated our anniversary in the private booth. From the welcome Blood Orange Spritz to the molten Valrhona Fondant, every single detail was effortless and memorable. Our highest recommendation.',
    dishName: 'Valrhona Chocolate Fondant',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verifiedDiner: true,
    source: 'OpenTable Verified Diner',
    role: 'Private Dining Guest',
  },
  {
    id: 'rev-4',
    author: 'Marcus Sterling',
    rating: 5,
    date: 'July 29, 2026',
    comment:
      'The handmade pasta program here is untouchable. The Lobster Ravioli broth had depth that took hours to develop. Chef Marco and his brigade run an impeccably disciplined yet joyful kitchen.',
    dishName: 'Lobster Ravioli in Saffron Broth',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verifiedDiner: true,
    source: 'Michelin Guide Inspector Note',
    role: 'Food & Wine Contributor',
  },
  {
    id: 'rev-5',
    author: 'Isabella Rossi',
    rating: 5,
    date: 'July 15, 2026',
    comment:
      'Coming from Florence myself, I am usually very critical of Italian outside Italy. But their Pasta al Pomodoro with San Marzano D.O.P and cold-pressed oil tasted exactly like nonna’s Sunday table.',
    dishName: 'Pasta al pomodoro',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    verifiedDiner: true,
    source: 'Verified Diner',
    role: 'Culinary Traveler',
  },
];
