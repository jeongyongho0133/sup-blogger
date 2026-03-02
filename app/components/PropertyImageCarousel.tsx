'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

interface PropertyImageCarouselProps {
  images: string[];
}

export default function PropertyImageCarousel({ images }: PropertyImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 w-full bg-gray-200 flex items-center justify-center text-gray-500">
        <span>이미지가 없습니다.</span>
      </div>
    );
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
        // Next.js Image의 fill 속성 대신 일반 img 태그를 사용하여 경고를 해결합니다.
        <div key={index} className="h-96 w-full"> 
          <img 
            src={image} 
            alt={`매물 이미지 ${index + 1}`} 
            className="w-full h-full object-cover" // 너비와 높이를 100%로 채우고, 이미지가 잘리도록 설정
          />
        </div>
      ))}
    </Carousel>
  );
}
