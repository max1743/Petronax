'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Heart, Eye, Zap, Shield, Award } from 'lucide-react';
import { formatPrice, getStockStatus } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  category: { id: string; name: string; slug: string };
  rating: number;
  reviewCount: number;
  features?: Record<string, any>;
  benefits: string[];
  badge?: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isHovered={hoveredProduct === product.id}
          onHover={setHoveredProduct}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function ProductCard({ product, isHovered, onHover }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const stockStatus = getStockStatus(product.stock);

  return (
    <div
      className="performance-meter card-hover group relative overflow-hidden rounded-lg"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-tertiary-bg to-secondary-bg overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 space-y-2">
          {product.badge && (
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${
              product.badge === 'BESTSELLER' ? 'bg-accent-yellow text-primary-bg' :
              product.badge === 'NEU' ? 'bg-accent-red text-white' :
              'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow'
            }`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-accent-red text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 z-10 space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button className="p-2 bg-tertiary-bg/90 backdrop-blur-sm rounded-full hover:bg-accent-yellow hover:text-primary-bg transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2 bg-tertiary-bg/90 backdrop-blur-sm rounded-full hover:bg-accent-yellow hover:text-primary-bg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Image Placeholder */}
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-accent-yellow" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent-yellow to-transparent"></div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  selectedImage === index
                    ? 'bg-accent-yellow w-4'
                    : 'bg-primary-border hover:bg-accent-yellow/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-accent-yellow font-medium">{product.category.name}</span>
          <span className="text-xs text-text-muted">•</span>
          <span className={`text-xs font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Title */}
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="text-sm font-semibold text-text-primary hover:text-accent-yellow transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <p className="text-xs text-text-secondary mt-1 line-clamp-2">
            {product.shortDesc}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-1">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-accent-yellow rounded-full"></div>
              <span className="text-xs text-text-secondary line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.floor(product.rating)
                    ? 'text-accent-yellow fill-current'
                    : 'text-primary-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-border">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-text-muted line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>

          <button
            className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              product.stock > 0
                ? 'bg-accent-yellow text-primary-bg hover:bg-accent-yellow-hover hover:shadow-lg hover:shadow-yellow-500/25'
                : 'bg-tertiary-bg text-text-muted cursor-not-allowed opacity-50'
            }`}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Technical Specs */}
        <div className={`grid grid-cols-2 gap-2 text-xs transition-all duration-300 overflow-hidden ${
          isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {product.features?.dosierung && (
            <div className="flex items-center space-x-1">
              <span className="text-accent-yellow">•</span>
              <span className="text-text-secondary truncate">{product.features.dosierung}</span>
            </div>
          )}
          {product.features?.anwendung && (
            <div className="flex items-center space-x-1">
              <span className="text-accent-yellow">•</span>
              <span className="text-text-secondary truncate">{product.features.anwendung}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}