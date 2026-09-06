export interface ChefInfo {
  name: string;
  role: string;
  bio: string;
  image: string;
  signatureDish: string;
  quote: string;
}

export const EXECUTIVE_CHEF: ChefInfo = {
  name: 'Marco Bellini',
  role: 'Executive Chef & Co-Founder',
  bio: 'Trained under three-star Michelin masters in Florence and Modena before establishing Foodie in New York. Marco champions seasonal, slow-fermented doughs and honest Mediterranean fire-cooking.',
  image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=85',
  signatureDish: 'Truffle Cream Tagliatelle',
  quote: 'Food is never merely fuel; it is the warmest memory you create with the people sharing your table.',
};

export const PASTRY_CHEF: ChefInfo = {
  name: 'Elena Vance',
  role: 'Head Pastry Chef',
  bio: 'A graduate of Le Cordon Bleu Paris, Elena balances classical French precision with Italian soul, turning heritage desserts like Tiramisu and Panna Cotta into contemporary revelations.',
  image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85',
  signatureDish: 'Classic Espresso Tiramisu',
  quote: 'The final course is the punctuation mark of an evening; it must leave you smiling long after you step into the night.',
};

export const RESTAURANT_VALUES = [
  {
    title: 'Heritage & Craft',
    description: 'We honor centuries-old Italian pasta rolling and woodfire techniques with patient, uncompromising attention to detail.',
    icon: 'Flame',
  },
  {
    title: 'Zero-Compromise Sourcing',
    description: 'Direct relationships with organic upstate New York family farms, Mediterranean line-caught fisheries, and Tuscan olive groves.',
    icon: 'Leaf',
  },
  {
    title: 'Heartfelt Hospitality',
    description: 'From the first greeting at our foyer to the parting digestif, we welcome every guest as lifelong family in our home.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Environmental Stewardship',
    description: '100% compostable takeout packaging, zero single-use plastics, and nose-to-tail culinary integrity to eliminate food waste.',
    icon: 'Sparkles',
  },
];

export const INGREDIENT_PARTNERS = [
  {
    name: 'San Marzano D.O.P',
    origin: 'Valle del Sarno, Campania',
    detail: 'Volcanic soil-grown sweet plum tomatoes, sun-ripened and preserved within 4 hours of harvest.',
  },
  {
    name: 'Cold-Pressed Olio Nuovo',
    origin: 'Castiglione del Lago, Tuscany',
    detail: 'First cold-press unrefined extra virgin oil with vibrant peppery notes and polyphenol richness.',
  },
  {
    name: 'Parmigiano-Reggiano 24-Mo',
    origin: 'Parma, Emilia-Romagna',
    detail: 'Aged two full years in mountain caves for intense crystallization, savory depth, and nutty fragrance.',
  },
  {
    name: 'Acquerello Carnaroli Rice',
    origin: 'Piedmont, Italy',
    detail: 'Aged for one full year before milling to yield the silkiest, most absorbent al dente risotto.',
  },
];
