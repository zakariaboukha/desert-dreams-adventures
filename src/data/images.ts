
export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  category: 'desert' | 'car' | 'expedition';
}

export const imageGallery: ImageItem[] = [
  {
    id: 'desert-dunes-1',
    src: '/images/desert-dunes-1.jpg',
    alt: 'Golden desert dunes at sunset',
    category: 'desert'
  },
  {
    id: 'desert-dunes-2',
    src: '/images/desert-dunes-2.jpg',
    alt: 'Rolling sand dunes in the Sahara',
    category: 'desert'
  },
  {
    id: 'desert-dunes-3',
    src: '/images/desert-dunes-3.jpg',
    alt: 'Desert oasis surrounded by dunes',
    category: 'desert'
  },
  {
    id: '4x4-desert-1',
    src: '/images/4x4-desert-1.jpg',
    alt: '4x4 vehicle climbing a sand dune',
    category: 'car'
  },
  {
    id: '4x4-desert-2',
    src: '/images/4x4-desert-2.jpg',
    alt: 'Off-road 4x4 vehicle in desert terrain',
    category: 'car'
  },
  {
    id: '4x4-desert-3',
    src: '/images/4x4-desert-3.jpg',
    alt: 'Expedition vehicle in rugged landscape',
    category: 'car'
  },
  {
    id: 'expedition-1',
    src: '/images/expedition-1.jpg',
    alt: 'Desert safari expedition at sunset',
    category: 'expedition'
  },
  {
    id: 'expedition-2',
    src: '/images/expedition-2.jpg',
    alt: 'Group of travelers on a desert expedition',
    category: 'expedition'
  }
];
