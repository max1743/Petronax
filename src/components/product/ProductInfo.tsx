'use client';

import { useState } from 'react';
import { ShoppingCart, Star, Heart, Share2, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { formatPrice, getStockStatus } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  dosage?: string;
  benefits: string[];
  badge?: string;
  tags?: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductInfo({ product, quantity, onQuantityChange }: ProductInfoProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const stockStatus = getStockStatus(product.stock);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    // Add to cart logic here
  };

  const incrementQuantity = () => {
    onQuantityChange(Math.min(quantity + 1, product.stock));
  };

  const decrementQuantity = () => {
    onQuantityChange(Math.max(quantity - 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-accent-yellow font-medium text-sm">{product.category.name}</span>
          {product.badge && (
            <>
              <span className="text-text-muted">•</span>
              <span className={`text-sm font-bold ${
                product.badge === 'BESTSELLER' ? 'text-accent-yellow' :
                product.badge === 'NEU' ? 'text-accent-red' :
                'text-accent-yellow'
              }`}>
                {product.badge}
              </span>
            </>
          )}
        </div>

        <h1 className="responsive-title font-bold text-text-primary mb-4">
          {product.name}
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed">
          {product.shortDesc}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.floor(product.rating)
                  ? 'text-accent-yellow fill-current'
                  : 'text-primary-border'
              }`}
            />
          ))}
        </div>
        <span className="text-text-primary font-medium">{product.rating}</span>
        <span className="text-text-secondary">({product.reviewCount} Bewertungen)</span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <>
              <span className="text-xl text-text-muted line-through">
                {formatPrice(product.comparePrice)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-red text-white text-sm font-bold">
                -{discount}%
              </span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <span>Artikelnummer: {product.sku}</span>
          <span>•</span>
          <span className={stockStatus.color}>{stockStatus.text}</span>
        </div>
      </div>

      {/* Quick Benefits */}
      <div className="performance-meter p-4 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">Hauptvorteile</h3>
        <div className="space-y-2">
          {product.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="w-4 h-4 text-accent-yellow flex-shrink-0" />
              <span className="text-sm text-text-secondary">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-text-primary font-medium">Menge:</label>
          <div className="flex items-center border border-primary-border rounded-lg">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-3 hover:bg-tertiary-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl">−</span>
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => onQuantityChange(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="w-16 text-center bg-transparent text-text-primary focus:outline-none"
              min="1"
              max={product.stock}
            />
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="p-3 hover:bg-tertiary-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl">+</span>
            </button>
          </div>
          <span className="text-sm text-text-secondary">
            {product.stock > 0 ? `${product.stock} verfügbar` : 'Ausverkauft'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${
              isAddedToCart ? 'bg-green-500 hover:bg-green-600' : ''
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-5 h-5" />
                <span>In den Warenkorb</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>In den Warenkorb</span>
              </>
            )}
          </button>

          <div className="flex space-x-2">
            <button className="p-3 bg-tertiary-bg border border-primary-border rounded-lg hover:border-accent-yellow transition-colors">
              <Heart className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-3 bg-tertiary-bg border border-primary-border rounded-lg hover:border-accent-yellow transition-colors">
              <Share2 className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-yellow/10 text-accent-yellow rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary-border">
        <div className="text-center">
          <Truck className="w-6 h-6 text-accent-yellow mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-text-primary">Kostenloser Versand</h4>
          <p className="text-xs text-text-secondary">Ab 50€</p>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-accent-yellow mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-text-primary">Sicherer Einkauf</h4>
          <p className="text-xs text-text-secondary">SSL-Zertifiziert</p>
        </div>
        <div className="text-center">
          <RotateCcw className="w-6 h-6 text-accent-yellow mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-text-primary">30 Tage Rückgabe</h4>
          <p className="text-xs text-text-secondary">Zufriedenheitsgarantie</p>
        </div>
      </div>

      {/* Dosage Info */}
      {product.dosage && (
        <div className="performance-meter p-4 rounded-lg">
          <h3 className="font-semibold text-text-primary mb-2">Dosierung</h3>
          <p className="text-sm text-text-secondary">{product.dosage}</p>
        </div>
      )}
    </div>
  );
}