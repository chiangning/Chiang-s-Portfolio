"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ImageCarousel({ images, className, objectFit = 'contain' }: { images: string[], className?: string, objectFit?: 'contain' | 'cover' | 'fill' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  if (!images?.length) return null;

  return (
    <div className={`relative w-full overflow-hidden group bg-surface-variant border border-white/10 shadow-xl ${className || ''}`}>
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 w-full h-full object-${objectFit}`}
            referrerPolicy="no-referrer"
            alt={`Carousel image ${currentIndex + 1}`}
          />
        </AnimatePresence>
      </div>
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prev} 
              className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next} 
              className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
