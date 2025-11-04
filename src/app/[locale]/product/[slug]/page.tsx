'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Shield,
  Award,
  Zap,
  Check,
  Info,
  Truck,
  RotateCcw
} from 'lucide-react';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import TechnicalSpecs from '@/components/product/TechnicalSpecs';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumb from '@/components/ui/Breadcrumb';

// Mock product data - this would come from API based on slug
const mockProduct = {
  id: '1',
  name: 'Petronax Motor Pro Plus',
  slug: 'petronax-motor-pro-plus',
  description: `Petronax Motor Pro Plus ist unser Premium-Motoradditive, das für maximale Leistungsfähigkeit und Langlebigkeit Ihres Motors entwickelt wurde. Die innovative Formel basiert auf jahrelanger Forschung und combines modernste Chemie mit bewährten Wirkstoffen.

Dieses hochentwickelte Additive wurde speziell für moderne Verbrennungsmotoren mit Turboaufladung und Direkteinspritzung konzipiert. Es reinigt effektiv das Einspritzsystem, reduziert Ablagerungen an Ventilen und Kolben und optimiert die Verbrennung für eine spürbare Leistungssteigerung.

Die einzigartige Kombination aus Polyetheraminen und Zinkdialkyldithiophosphaten bietet umfassenden Schutz vor Verschleiß, Korrosion und Schaumbildung. Gleichzeitig stabilisiert es den Kraftstoff und verhindert die Bildung von Koks und Lacken im Brennraum.`,
  shortDesc: 'Premium Motoradditive für maximale Leistung und Langlebigkeit',
  price: 29.99,
  comparePrice: 39.99,
  sku: 'PNX-MOTOR-001',
  stock: 50,
  images: [
    '/images/products/motor-pro-plus-1.jpg',
    '/images/products/motor-pro-plus-2.jpg',
    '/images/products/motor-pro-plus-3.jpg',
    '/images/products/motor-pro-plus-4.jpg'
  ],
  category: {
    id: '1',
    name: 'Motoradditive',
    slug: 'motoradditive'
  },
  rating: 4.9,
  reviewCount: 234,
  features: {
    dosierung: '50ml pro 50L Kraftstoff',
    anwendung: 'Alle Benzinmotoren, auch für Turbo- und Direkteinspritzer geeignet',
    wirkstoff: 'Polyetheramine, Zinkdialkyldithiophosphate, Korrosionsschutz-Additive',
    wirksamkeit: 'Bis zu 10.000km oder bei jeder Tankfüllung',
    haltbarkeit: 'Unbegrenzt haltbar bei sachgemäßer Lagerung',
    verpackung: '250ml Flasche aus recyclebarem Kunststoff',
    zertifizierung: 'TÜV geprüft, ISO 9001 zertifiziert'
  },
  dosage: '50ml pro 50L Kraftstoff bei jeder Tankfüllung zugeben. Für maximale Wirkung den Tank zuerst zur Hälfte füllen, Additive hinzufügen und dann volltanken.',
  benefits: [
    'Reduziert Kraftstoffverbrauch bis zu 8%',
    'Verbessert Motorleistung und Beschleunigung spürbar',
    'Schützt vor Ablagerungen und Verschleiß',
    'Reduziert schädliche Emissionen bis zu 50%',
    'Stabilisiert Kraftstoffqualität über längere Zeit',
    'Verbessert Kaltstartverhalten',
    'Verlängert Motorlebensdauer',
    'Kompatibel mit allen Kraftstoffqualitäten'
  ],
  badge: 'BESTSELLER',
  tags: ['Premium', 'Performance', 'TÜV geprüft', 'Made in Germany'],
};

const breadcrumbItems = [
  { name: 'Startseite', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Motoradditive', href: '/shop?category=motoradditive' },
  { name: 'Petronax Motor Pro Plus' }
];

export default function ProductPage() {
  const t = useTranslations();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  return (
    <div className="min-h-screen tech-grid-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Product Main Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <ProductGallery
              images={mockProduct.images}
              productName={mockProduct.name}
            />

            {/* Product Info */}
            <ProductInfo
              product={mockProduct}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="pb-16 bg-secondary-bg/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="border-b border-primary-border mb-8">
              <div className="flex flex-wrap gap-8">
                {[
                  { id: 'description', label: 'Beschreibung', icon: <Info className="w-4 h-4" /> },
                  { id: 'specs', label: 'Technische Daten', icon: <Zap className="w-4 h-4" /> },
                  { id: 'benefits', label: 'Vorteile', icon: <Award className="w-4 h-4" /> },
                  { id: 'reviews', label: 'Bewertungen', icon: <Star className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                      selectedTab === tab.id
                        ? 'border-accent-yellow text-accent-yellow'
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {selectedTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <div className="performance-meter p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-text-primary mb-6">
                      Produktbeschreibung
                    </h3>
                    <div className="space-y-6 text-text-secondary leading-relaxed">
                      {mockProduct.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'specs' && (
                <TechnicalSpecs features={mockProduct.features} />
              )}

              {selectedTab === 'benefits' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockProduct.benefits.map((benefit, index) => (
                    <div key={index} className="performance-meter p-6 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-accent-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-accent-yellow" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">
                            Leistungsvorteil {index + 1}
                          </h4>
                          <p className="text-text-secondary">{benefit}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <ProductReviews
                  productId={mockProduct.id}
                  rating={mockProduct.rating}
                  reviewCount={mockProduct.reviewCount}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck className="w-6 h-6" />, title: 'Kostenloser Versand', description: 'Ab 50€ Bestellwert' },
              { icon: <Shield className="w-6 h-6" />, title: 'TÜV Geprüft', description: 'Höchste Qualitätssicherung' },
              { icon: <RotateCcw className="w-6 h-6" />, title: '30 Tage Rückgabe', description: 'Zufriedenheitsgarantie' },
              { icon: <Award className="w-6 h-6" />, title: 'Made in Germany', description: 'Entwickelt & hergestellt in Deutschland' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-accent-yellow">{item.icon}</div>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts
        categoryId={mockProduct.category.id}
        currentProductId={mockProduct.id}
      />
    </div>
  );
}