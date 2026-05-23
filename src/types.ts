export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  wa: string;            // Format: "6281388497651"
  address: string;
  city: string;
  hours: string;
  instagram: string;
  tiktok?: string;
  email?: string;
  mapQuery: string;      // Embed query or iframe source
  mapsLink: string;      // Link to Google Maps
  founded?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  price: number;         // Numeric to allow preorder sum calculation
  priceFormatted: string; // e.g. "Rp 120.000"
  image: string;
  badge?: string;
  waMessage: string;
  isAvailable: boolean; // Simulating kitchen stock availability
}

export interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  review: string;
  avatar: string;
  product?: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: 'makanan' | 'tempat' | 'live-music';
  size: 'large' | 'medium' | 'small';
}

export interface PreOrderBasketItem {
  product: Product;
  quantity: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  bio: string;
  specialty?: string;
}

export interface HeroData {
  headlineText: string;
  pillBadge: string;
  description: string;
  ctaBookingText: string;
  ctaMenuText: string;
  imageUrl: string;
  imageAlt: string;
  featuredTodayLabel: string;
  featuredTodayName: string;
  featuredTodayPrice: string;
  kitchenStatusLabel: string;
  kitchenStatusDesc: string;
}

export interface AmbienceTeaserItem {
  url: string;
  caption: string;
  desc: string;
}

export interface InstagramFeedItem {
  id: number;
  img: string;
  likes: string;
  comments: string;
}

