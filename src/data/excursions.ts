export interface ExcursionItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  // New fields for summary card
  images?: string[];
  groupSize: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  schedule: string;
  meetingPoint: string;
}

export const excursions: ExcursionItem[] = [
  {
    id: 'exc1',
    slug: 'atlas-hike',
    title: 'Atlas Hike',
    location: 'Atlas Mountains, Morocco',
    duration: '1 day',
    price: 100,
    image: '/images/expedition-1.jpg',
    images: ['/images/expedition-1.jpg'],
    description: 'Hike through the Atlas Mountains with breathtaking views and Berber village visits.',
    groupSize: 'Max 10 people',
    rating: 4.6,
    reviewCount: 142,
    tagline: 'Discover stunning mountain trails and authentic Berber culture',
    schedule: '08:00 - 17:00',
    meetingPoint: 'Atlas Trailhead'
  },
  {
    id: 'exc2',
    slug: 'oasis-visit',
    title: 'Oasis Visit',
    location: 'Sahara Desert, Morocco',
    duration: '1 day',
    price: 150,
    image: '/images/desert-dunes-1.jpg',
    images: ['/images/desert-dunes-1.jpg'],
    description: 'Discover hidden desert oases, palm groves, and traditional culture.',
    groupSize: 'Max 12 people',
    rating: 4.7,
    reviewCount: 98,
    tagline: 'Explore hidden oases and experience desert tranquility',
    schedule: '09:00 - 16:00',
    meetingPoint: 'Oasis Visitor Center'
  },
  {
    id: 'exc3',
    slug: 'desert-safari',
    title: 'Desert Safari',
    location: 'Sahara Desert, Morocco',
    duration: '1 day – 10 hours',
    price: 120,
    image: '/images/4x4-desert-1.jpg',
    images: ['/images/4x4-desert-1.jpg'],
    description: 'Experience thrilling 4x4 dune bashing and sandboarding across dramatic desert dunes.',
    groupSize: 'Max 12 people',
    rating: 4.8,
    reviewCount: 156,
    tagline: 'Experience thrilling 4x4 desert activities and sandboarding adventures',
    schedule: '08:00 - 18:00',
    meetingPoint: 'Safari Base Camp'
  }
];