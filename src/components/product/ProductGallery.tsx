'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-tertiary-bg to-secondary-bg rounded-lg overflow-hidden group">
        {/* Image Placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center space-y-6 p-12">
            <div className="w-32 h-32 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center">
                <span className="text-accent-yellow text-2xl font-bold">P</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary">{productName}</h3>
            <p className="text-text-secondary">Premium Qualitätsprodukt</p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent-yellow to-transparent mx-auto"></div>
          </div>
        </div>

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-2 bg-tertiary-bg/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-yellow hover:text-primary-bg"
        >
          {isZoomed ? <Maximize2 className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-tertiary-bg/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-yellow hover:text-primary-bg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-tertiary-bg/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent-yellow hover:text-primary-bg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index
                    ? 'bg-accent-yellow w-8'
                    : 'bg-primary-border hover:bg-accent-yellow/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Zoom Overlay */}
        {isZoomed && (
          <div className="absolute inset-0 bg-primary-bg/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="relative max-w-4xl max-h-full p-8">
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute -top-4 -right-4 p-2 bg-accent-yellow text-primary-bg rounded-full hover:bg-accent-yellow-hover"
              >
                ×
              </button>
              {/* Zoomed Image Content */}
              <div className="text-center space-y-6">
                <div className="w-48 h-48 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-24 h-24 bg-accent-yellow/20 rounded-full flex items-center justify-center">
                    <span className="text-accent-yellow text-4xl font-bold">P</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-text-primary">{productName}</h3>
                <p className="text-xl text-text-secondary">Premium Qualitätsprodukt</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gradient-to-br from-tertiary-bg to-secondary-bg rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-accent-yellow shadow-lg shadow-yellow-500/25'
                  : 'border-transparent hover:border-accent-yellow/50'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-accent-yellow/10 rounded-full flex items-center justify-center">
                  <span className="text-accent-yellow text-xs font-bold">{index + 1}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Product Features */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="performance-meter p-4 rounded-lg text-center">
          <div className="w-12 h-12 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-accent-yellow font-bold">✓</span>
          </div>
          <h4 className="font-semibold text-text-primary text-sm">TÜV Geprüft</h4>
          <p className="text-xs text-text-secondary mt-1">Zertifizierte Qualität</p>
        </div>
        <div className="performance-meter p-4 rounded-lg text-center">
          <div className="w-12 h-12 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-accent-yellow font-bold">DE</span>
          </div>
          <h4 className="font-semibold text-text-primary text-sm">Made in Germany</h4>
          <p className="text-xs text-text-secondary mt-1">Hergestellt in Deutschland</p>
        </div>
      </div>
    </div>
  );
}