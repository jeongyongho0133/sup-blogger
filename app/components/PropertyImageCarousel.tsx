'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

interface PropertyImageCarouselProps {
  images: string[];
}

export default function PropertyImageCarousel({ images }: PropertyImageCarouselProps) {
  if (!images || images.length === 0) {
    return <div className="bg-gray-200 h-64 w-full flex items-center justify-center text-gray-500">이미지가 없습니다.</div>;
  }

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop 
      useKeyboardArrows 
      autoPlay
      showStatus={false}
      className="rounded-lg overflow-hidden shadow-lg"
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`매물 이미지 ${index + 1}`} className="w-full h-auto object-cover" style={{ maxHeight: '500px' }} />
        </div>
      ))}
    </Carousel>
  );
}
