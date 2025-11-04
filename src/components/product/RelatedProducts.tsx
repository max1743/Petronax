'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock related products - this would come from API
const mockRelatedProducts = [
  {
    id: '2',
    name: 'Petronax Diesel Clean',
    slug: 'petronax-diesel-clean',
    shortDesc: 'Effektives Dieseladditive für Sauberkeit und Effizienz',
    price: 24.99,
    comparePrice: 29.99,
    rating: 4.8,
    reviewCount: 189,
    stock: 75,
    badge: 'NEU',
  },
  {
    id: '4',
    name: 'Petronax Getriebe Shield',
    slug: 'petronax-getriebe-shield',
    shortDesc: 'Schutz-Additive für Getriebe und Ölsysteme',
    price: 27.99,
    rating: 4.7,
    reviewCount: 98,
    stock: 40,
  },
  {
    id: '6',
    name: 'Petronax Motor Clean',
    slug: 'petronax-motor-clean',
    shortDesc: 'Reinigungs-Additive für Motoren',
    price: 22.99,
    comparePrice: 26.99,
    rating: 4.5,
    reviewCount: 143,
    stock: 60,
    badge: 'ANGEBOT',
  },
  {
    id: '3',
    name: 'Petronax Benzine Sport',
    slug: 'petronax-benzine-sport',
    shortDesc: 'Sportliches Benzinadditive für maximale Leistung',
    price: 34.99,
    comparePrice: 44.99,
    rating: 4.7,
    reviewCount: 156,
    stock: 30,
  },
];

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  // Filter out current product and limit to 4 related products
  const relatedProducts = mockRelatedProducts
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="responsive-title font-bold mb-4">Passende Produkte</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Entdecken Sie weitere Produkte aus unserer Kollektion, die perfekt zu Ihrer Auswahl passen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center group"
          >
            Alle Produkte ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

interface RelatedProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    price: number;
    comparePrice?: number;
    rating: number;
    reviewCount: number;
    stock: number;
    badge?: string;
  };
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="performance-meter card-hover group cursor-pointer">
      <Link href={`/product/${product.slug}`}>
        <div className="space-y-4">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-tertiary-bg to-secondary-bg rounded-lg overflow-hidden">
            {/* Badge */}
            {product.badge && (
              <span className={`absolute top-3 left-3 z-10 inline-block px-2 py-1 text-xs font-bold rounded-full ${
                product.badge === 'BESTSELLER' ? 'bg-accent-yellow text-primary-bg' :
                product.badge === 'NEU' ? 'bg-accent-red text-white' :
                'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow'
              }`}>
                {product.badge}
              </span>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-3 right-3 z-10 inline-block px-2 py-1 text-xs font-bold rounded-full bg-accent-red text-white">
                -{discount}%
              </span>
            )}

            {/* Product Image Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-accent-yellow" />
                </div>
              </div>
            </div>

            {/* Quick Add Button */}
            <div className="absolute inset-0 bg-primary-bg/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="btn-primary">
                <ShoppingCart className="w-4 h-4 mr-2" />
                In den Warenkorb
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary group-hover:text-accent-yellow transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-2">
              {product.shortDesc}
            </p>

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

            {/* Price */}
            <div className="flex items-center justify-between">
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
          </div>
        </div>
      </Link>
    </div>
  );
}