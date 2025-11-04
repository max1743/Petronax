'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Heart, Eye, Zap, Check } from 'lucide-react';
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

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}

interface ProductListItemProps {
  product: Product;
}

function ProductListItem({ product }: ProductListItemProps) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="performance-meter p-6 rounded-lg hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 bg-gradient-to-br from-tertiary-bg to-secondary-bg rounded-lg overflow-hidden">
            {/* Badge */}
            {product.badge && (
              <span className={`absolute top-2 left-2 z-10 inline-block px-2 py-1 text-xs font-bold rounded-full ${
                product.badge === 'BESTSELLER' ? 'bg-accent-yellow text-primary-bg' :
                product.badge === 'NEU' ? 'bg-accent-red text-white' :
                'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow'
              }`}>
                {product.badge}
              </span>
            )}

            {/* Product Image Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-accent-yellow" />
            </div>

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex space-x-1">
              <button className="p-1.5 bg-tertiary-bg/90 backdrop-blur-sm rounded hover:bg-accent-yellow hover:text-primary-bg transition-colors">
                <Heart className="w-3 h-3" />
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="p-1.5 bg-tertiary-bg/90 backdrop-blur-sm rounded hover:bg-accent-yellow hover:text-primary-bg transition-colors"
              >
                <Eye className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title and Category */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-accent-yellow font-medium">{product.category.name}</span>
                <span className="text-xs text-text-muted">•</span>
                <span className={`text-xs font-medium ${stockStatus.color}`}>
                  {stockStatus.text}
                </span>
              </div>
              <Link
                href={`/product/${product.slug}`}
                className="text-lg font-semibold text-text-primary hover:text-accent-yellow transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {product.shortDesc}
              </p>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-end space-y-3">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <>
                      <span className="text-sm text-text-muted line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                      <span className="text-xs text-accent-red font-medium">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  SKU: {product.sku}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-lg transition-all ${
                    product.stock > 0
                      ? 'bg-accent-yellow text-primary-bg hover:bg-accent-yellow-hover'
                      : 'bg-tertiary-bg text-text-muted cursor-not-allowed opacity-50'
                  }`}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {product.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-accent-yellow flex-shrink-0" />
                <span className="text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Technical Specs and Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-primary-border">
            {/* Technical Specs */}
            <div className="flex flex-wrap gap-4 text-xs">
              {product.features?.dosierung && (
                <div className="flex items-center space-x-2">
                  <span className="text-accent-yellow">Dosierung:</span>
                  <span className="text-text-secondary">{product.features.dosierung}</span>
                </div>
              )}
              {product.features?.anwendung && (
                <div className="flex items-center space-x-2">
                  <span className="text-accent-yellow">Anwendung:</span>
                  <span className="text-text-secondary">{product.features.anwendung}</span>
                </div>
              )}
              {product.features?.wirkstoff && (
                <div className="flex items-center space-x-2">
                  <span className="text-accent-yellow">Wirkstoff:</span>
                  <span className="text-text-secondary">{product.features.wirkstoff}</span>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating)
                        ? 'text-accent-yellow fill-current'
                        : 'text-primary-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {product.rating} ({product.reviewCount} Bewertungen)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}