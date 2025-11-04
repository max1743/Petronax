'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Star, Zap, Shield, Award, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock product data - this would come from the database
const featuredProducts = [
  {
    id: '1',
    name: 'Petronax Motor Pro Plus',
    slug: 'petronax-motor-pro-plus',
    shortDesc: 'Premium Motoradditive für maximale Leistung',
    price: 29.99,
    comparePrice: 39.99,
    images: ['/images/products/motor-pro-plus-1.jpg'],
    rating: 4.9,
    reviewCount: 234,
    stock: 50,
    badge: 'BESTSELLER',
    features: ['+15% Leistung', '−8% Verbrauch', 'TÜV geprüft'],
  },
  {
    id: '2',
    name: 'Petronax Diesel Clean',
    slug: 'petronax-diesel-clean',
    shortDesc: 'Reinigungs-Additive für Dieselmotoren',
    price: 24.99,
    images: ['/images/products/diesel-clean-1.jpg'],
    rating: 4.8,
    reviewCount: 189,
    stock: 75,
    badge: 'NEU',
    features: ['Reinigt Einspritzdüsen', 'Verbessert Kaltstart', 'Reduziert Ruß'],
  },
  {
    id: '3',
    name: 'Petronax Getriebe Shield',
    slug: 'petronax-getriebe-shield',
    shortDesc: 'Schutz-Additive für Getriebe',
    price: 27.99,
    comparePrice: 34.99,
    images: ['/images/products/getriebe-shield-1.jpg'],
    rating: 4.7,
    reviewCount: 156,
    stock: 40,
    badge: 'ANGEBOT',
    features: ['Reduziert Reibung', 'Senkt Temperatur', 'Langzeitschutz'],
  },
];

export default function FeaturedProducts() {
  const t = useTranslations('product');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-accent-yellow" />
            <span className="text-accent-yellow text-sm font-medium">Beliebte Produkte</span>
          </div>
          <h2 className="responsive-title font-bold mb-4">{t('featured')}</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Entdecken Sie unsere meistverkauften Premium-Additive. Vertrauen Sie auf Qualität, die sich bewährt hat.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isHovered={hoveredProduct === product.id}
              onHover={setHoveredProduct}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center group"
          >
            Alle Produkte ansehen
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    price: number;
    comparePrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    badge?: string;
    features: string[];
  };
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function ProductCard({ product, isHovered, onHover }: ProductCardProps) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div
      className="performance-meter card-hover group cursor-pointer"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-tertiary-bg to-secondary-bg flex items-center justify-center relative">
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                product.badge === 'BESTSELLER' ? 'bg-accent-yellow text-primary-bg' :
                product.badge === 'NEU' ? 'bg-accent-red text-white' :
                'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow'
              }`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-accent-red text-white px-3 py-1 text-xs font-bold rounded-full">
                -{discount}%
              </span>
            </div>
          )}

          {/* Placeholder for product image */}
          <div className="text-center space-y-4 p-8">
            <div className="w-20 h-20 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-accent-yellow" />
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent-yellow to-transparent"></div>
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-primary-bg/95 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4">
              <Link
                href={`/product/${product.slug}`}
                className="btn-primary w-full text-sm"
              >
                Details ansehen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-yellow transition-colors mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">{product.shortDesc}</p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full"></div>
              <span className="text-text-secondary">{feature}</span>
            </div>
          ))}
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
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-primary-border">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-text-muted line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                product.stock > 10 ? 'bg-green-500' :
                product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-xs text-text-secondary">
                {product.stock > 10 ? 'Auf Lager' :
                 product.stock > 0 ? `Nur noch ${product.stock} verfügbar` : 'Ausverkauft'}
              </span>
            </div>
          </div>

          <button
            className="p-2 bg-accent-yellow text-primary-bg rounded-lg hover:bg-accent-yellow-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}