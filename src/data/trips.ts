export interface TripItem {
  slug: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  category?: string;
  // New fields for summary card
  images?: string[];
  groupSize: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  schedule: string;
  meetingPoint: string;
}

export const trips: TripItem[] = [
  {
    slug: "coastal-adventure",
    title: "Coastal Adventure",
    location: "Mediterranean Coast",
    duration: "3 days",
    price: 450,
    category: "Adventure",
    images: ["/images/expedition-1.jpg"],
    groupSize: "Max 8 people",
    rating: 4.7,
    reviewCount: 89,
    tagline: "Discover pristine coastlines and hidden coves on this unforgettable adventure",
    schedule: "09:00 - 17:00",
    meetingPoint: "Coastal Marina"
  },
  {
    slug: "mountain-escape",
    title: "Mountain Escape",
    location: "Rocky Mountains",
    duration: "4 days",
    price: 550,
    category: "Adventure",
    images: ["/images/expedition-2.jpg"],
    groupSize: "Max 6 people",
    rating: 4.9,
    reviewCount: 124,
    tagline: "Experience breathtaking mountain vistas and pristine wilderness",
    schedule: "08:00 - 18:00",
    meetingPoint: "Mountain Base Lodge"
  },
  {
    slug: "city-highlights",
    title: "City Highlights",
    location: "Paris",
    duration: "5 days",
    price: 750,
    category: "Cultural",
    images: ["/images/desert-dunes-1.jpg"],
    groupSize: "Max 15 people",
    rating: 4.6,
    reviewCount: 203,
    tagline: "Explore iconic landmarks and hidden gems of the City of Light",
    schedule: "10:00 - 16:00",
    meetingPoint: "Central Hotel Lobby"
  },
  {
    slug: "cultural-journey",
    title: "Cultural Journey",
    location: "Kyoto",
    duration: "6 days",
    price: 850,
    category: "Cultural",
    images: ["/images/desert-dunes-2.jpg"],
    groupSize: "Max 10 people",
    rating: 4.8,
    reviewCount: 156,
    tagline: "Immerse yourself in ancient traditions and timeless beauty",
    schedule: "09:30 - 17:30",
    meetingPoint: "Traditional Tea House"
  },
  {
    slug: "sahara-adventure",
    title: "Sahara Adventure",
    location: "Sahara Desert, Morocco",
    duration: "3 days",
    price: 300,
    category: "Adventure",
    images: ["/images/4x4-desert-1.jpg"],
    groupSize: "Max 12 people",
    rating: 4.8,
    reviewCount: 187,
    tagline: "Experience thrilling 4x4 desert activities and starlit camping",
    schedule: "08:00 - 18:00",
    meetingPoint: "Desert Safari Base Camp"
  },
  {
    slug: "atlas-mountains-trek",
    title: "Atlas Mountains Trek",
    location: "High Atlas",
    duration: "4 days",
    price: 450,
    category: "Adventure",
    images: ["/images/4x4-desert-3.jpg"],
    groupSize: "Max 8 people",
    rating: 4.7,
    reviewCount: 98,
    tagline: "Trek through stunning mountain landscapes and Berber villages",
    schedule: "07:00 - 19:00",
    meetingPoint: "Atlas Base Camp"
  },
];