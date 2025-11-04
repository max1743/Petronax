'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Shield, Truck, RefreshCw } from 'lucide-react';
import { formatPrice, calculateCartTotal } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';

// Mock cart data - this would come from cart context/API
const mockCartItems = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'Petronax Motor Pro Plus',
      slug: 'petronax-motor-pro-plus',
      shortDesc: 'Premium Motoradditive für maximale Leistung',
      price: 29.99,
      comparePrice: 39.99,
      image: '/images/products/motor-pro-plus-1.jpg',
      sku: 'PNX-MOTOR-001',
      stock: 50,
      features: {
        dosierung: '50ml pro 50L Kraftstoff',
        anwendung: 'Alle Benzinmotoren',
      }
    },
    quantity: 2,
  },
  {
    id: '2',
    product: {
      id: '2',
      name: 'Petronax Diesel Clean',
      slug: 'petronax-diesel-clean',
      shortDesc: 'Effektives Dieseladditive für Sauberkeit',
      price: 24.99,
      image: '/images/products/diesel-clean-1.jpg',
      sku: 'PNX-DIESEL-002',
      stock: 75,
      features: {
        dosierung: '100ml pro 50L Diesel',
        anwendung: 'Alle Dieselmotoren',
      }
    },
    quantity: 1,
  },
  {
    id: '3',
    product: {
      id: '4',
      name: 'Petronax Getriebe Shield',
      slug: 'petronax-getriebe-shield',
      shortDesc: 'Schutz-Additive für Getriebe',
      price: 27.99,
      comparePrice: 34.99,
      image: '/images/products/getriebe-shield-1.jpg',
      sku: 'PNX-GETRIEBE-004',
      stock: 40,
    },
    quantity: 1,
  }
];

const breadcrumbItems = [
  { name: 'Startseite', href: '/' },
  { name: 'Warenkorb' }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Calculate totals
  const subtotal = calculateCartTotal(cartItems.map(item => ({
    quantity: item.quantity,
    price: item.product.price
  })));

  const shippingCost = shippingMethod === 'express' ? 12.99 : subtotal >= 50 ? 0 : 4.99;
  const discount = appliedCoupon === 'SAVE10' ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.19; // 19% MwSt.
  const total = subtotal - discount + shippingCost + tax;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon('SAVE10');
    } else {
      // Handle invalid coupon
      alert('Ungültiger Gutscheincode');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen tech-grid-bg">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-tertiary-bg rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-text-muted" />
            </div>
            <h2 className="responsive-title font-bold mb-4">Ihr Warenkorb ist leer</h2>
            <p className="text-lg text-text-secondary mb-8">
              Sie haben noch keine Produkte in Ihrem Warenkorb. Entdecken Sie unser Sortiment und finden Sie die perfekten Additive für Ihre Anforderungen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary">
                Zum Shop
              </Link>
              <Link href="/" className="btn-secondary">
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tech-grid-bg">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card-bg border border-card-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-6">
                Warenkorb ({cartItems.length} Artikel)
              </h2>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-card-bg border border-card-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Gutscheincode</h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500 font-medium">SAVE10</span>
                    <span className="text-sm text-text-secondary">10% Rabatt angewendet</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Gutscheincode eingeben"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 bg-tertiary-bg border border-primary-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-yellow"
                  />
                  <button
                    onClick={applyCoupon}
                    className="btn-secondary px-6"
                  >
                    Einlösen
                  </button>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-tertiary-bg rounded-lg">
                <Shield className="w-5 h-5 text-accent-yellow" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Sichere Zahlung</h4>
                  <p className="text-xs text-text-secondary">SSL-Verschlüsselt</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-tertiary-bg rounded-lg">
                <Truck className="w-5 h-5 text-accent-yellow" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Schneller Versand</h4>
                  <p className="text-xs text-text-secondary">1-3 Werktage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-tertiary-bg rounded-lg">
                <RefreshCw className="w-5 h-5 text-accent-yellow" />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">30 Tage Rückgabe</h4>
                  <p className="text-xs text-text-secondary">Zufriedenheitsgarantie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card-bg border border-card-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Bestellübersicht</h3>

              <div className="space-y-4 mb-6">
                {/* Shipping Method */}
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">Versandart</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border border-primary-border rounded-lg cursor-pointer hover:border-accent-yellow transition-colors">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="w-4 h-4 text-accent-yellow"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">Standardversand</p>
                          <p className="text-xs text-text-secondary">1-3 Werktage</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {shippingCost === 0 ? 'Kostenlos' : formatPrice(shippingCost)}
                      </span>
                    </label>
                    <label className="flex items-center justify-between p-3 border border-primary-border rounded-lg cursor-pointer hover:border-accent-yellow transition-colors">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="w-4 h-4 text-accent-yellow"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">Expressversand</p>
                          <p className="text-xs text-text-secondary">Nächster Tag</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-text-primary">€12.99</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-primary-border pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Zwischensumme</span>
                  <span className="text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-accent-yellow">Rabatt (SAVE10)</span>
                    <span className="text-accent-yellow">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Versand</span>
                  <span className="text-text-primary">
                    {shippingCost === 0 ? 'Kostenlos' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">MwSt. (19%)</span>
                  <span className="text-text-primary">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-primary-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-text-primary">Gesamtsumme</span>
                    <span className="text-lg font-bold text-accent-yellow">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 50 && shippingMethod === 'standard' && (
                <div className="mt-4 p-3 bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg">
                  <p className="text-sm text-accent-yellow">
                        Noch <span className="font-bold">{formatPrice(50 - subtotal)}</span> bis zum kostenlosen Versand!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="btn-primary w-full justify-center">
                  Zur Kasse
                </Link>
                <Link href="/shop" className="btn-secondary w-full justify-center">
                  Weiter einkaufen
                </Link>
              </div>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <p className="text-xs text-text-muted">
                  <span className="inline-flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Sichere und verschlüsselte Zahlung</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartItemProps {
  item: {
    id: string;
    product: {
      id: string;
      name: string;
      slug: string;
      shortDesc: string;
      price: number;
      comparePrice?: number;
      image: string;
      sku: string;
      stock: number;
      features?: {
        dosierung?: string;
        anwendung?: string;
      };
    };
    quantity: number;
  };
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const discount = item.product.comparePrice
    ? Math.round(((item.product.comparePrice - item.product.price) / item.product.comparePrice) * 100)
    : 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-tertiary-bg rounded-lg">
      {/* Product Image */}
      <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
        <div className="w-24 h-24 bg-gradient-to-br from-tertiary-bg to-secondary-bg rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 bg-accent-yellow/10 rounded-full flex items-center justify-center">
              <span className="text-accent-yellow font-bold">P</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 space-y-4">
        <div>
          <Link
            href={`/product/${item.product.slug}`}
            className="font-medium text-text-primary hover:text-accent-yellow transition-colors"
          >
            {item.product.name}
          </Link>
          <p className="text-sm text-text-secondary mt-1">{item.product.shortDesc}</p>
          {item.product.features?.dosierung && (
            <p className="text-xs text-text-muted mt-2">
              Dosierung: {item.product.features.dosierung}
            </p>
          )}
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="p-1 bg-card-bg border border-primary-border rounded hover:border-accent-yellow transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
              className="w-16 text-center bg-card-bg border border-primary-border rounded text-text-primary focus:outline-none focus:border-accent-yellow"
              min="1"
              max={item.product.stock}
            />
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="p-1 bg-card-bg border border-primary-border rounded hover:border-accent-yellow transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-text-primary">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
                {item.product.comparePrice && (
                  <span className="text-sm text-text-muted line-through">
                    {formatPrice(item.product.comparePrice * item.quantity)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs text-accent-red font-medium">
                  Sie sparen {formatPrice((item.product.comparePrice - item.product.price) * item.quantity)}
                </span>
              )}
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}