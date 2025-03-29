
import React from 'react';
import { imageGallery, ImageItem } from '@/data/images';

interface ImageGalleryProps {
  category?: 'desert' | 'car' | 'expedition';
  limit?: number;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  category, 
  limit = 6,
  className = ""
}) => {
  const filteredImages = category 
    ? imageGallery.filter(img => img.category === category)
    : imageGallery;
  
  const displayImages = filteredImages.slice(0, limit);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {displayImages.map((image) => (
        <div key={image.id} className="relative overflow-hidden rounded-lg group h-60">
          <img 
            src={image.src} 
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm">{image.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
