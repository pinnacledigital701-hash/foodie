import type {Metadata} from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Foodie Restaurant | Delicious Modern Cuisine & Table Reservations',
  description:
    'Experience delicious modern cuisine crafted with fresh ingredients, signature flavors, table reservations, and seamless online ordering.',
  openGraph: {
    title: 'Foodie Restaurant | Delicious Modern Cuisine & Table Reservations',
    description:
      'Experience delicious modern cuisine crafted with fresh ingredients, signature flavors, table reservations, and seamless online ordering.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foodie Restaurant | Delicious Modern Cuisine & Table Reservations',
    description:
      'Experience delicious modern cuisine crafted with fresh ingredients, signature flavors, table reservations, and seamless online ordering.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable}`}>
      <body
        suppressHydrationWarning
        className={`${dmSans.className} bg-[#faf6ee] text-[#11142d] antialiased selection:bg-[#fed7aa] selection:text-[#9a3412]`}
      >
        {children}
      </body>
    </html>
  );
}
