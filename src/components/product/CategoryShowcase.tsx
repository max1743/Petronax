'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronRight, Zap, Shield, Award, Settings } from 'lucide-react';

const categories = [
  {
    name: 'Motoradditive',
    slug: 'motoradditive',
    description: 'Hochleistungsmotoradditive für maximale Effizienz und Langlebigkeit',
    icon: <Zap className="w-8 h-8" />,
    image: '/images/categories/motor.jpg',
    productCount: 24,
    color: 'from-yellow-500/20 to-yellow-600/10',
    borderColor: 'border-yellow-500/30',
  },
  {
    name: 'Dieseladditive',
    slug: 'dieseladditive',
    description: 'Spezialadditive für Dieselmotoren aller Art',
    icon: <Settings className="w-8 h-8" />,
    image: '/images/categories/diesel.jpg',
    productCount: 18,
    color: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
  },
  {
    name: 'Benzinadditive',
    slug: 'benzinadditive',
    description: 'Optimierung für Benzinmotoren von Sportwagen bis Alltag',
    icon: <Award className="w-8 h-8" />,
    image: '/images/categories/benzin.jpg',
    productCount: 32,
    color: 'from-red-500/20 to-red-600/10',
    borderColor: 'border-red-500/30',
  },
  {
    name: 'Getriebe- & Öladditive',
    slug: 'getriebe-oeladditive',
    description: 'Schutz und Optimierung für Getriebe und Ölsysteme',
    icon: <Shield className="w-8 h-8" />,
    image: '/images/categories/getriebe.jpg',
    productCount: 15,
    color: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/30',
  },
  {
    name: 'Industrieadditive',
    slug: 'industrieadditive',
    description: 'Heavy-Duty Additive für industrielle Anwendung',
    icon: <Settings className="w-8 h-8" />,
    image: '/images/categories/industrie.jpg',
    productCount: 12,
    color: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/30',
  },
];

export default function CategoryShowcase() {
  const t = useTranslations('product');

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-2 mb-4">
            <Settings className="w-4 h-4 text-accent-yellow" />
            <span className="text-accent-yellow text-sm font-medium">Produktkategorien</span>
          </div>
          <h2 className="responsive-title font-bold mb-4">{t('categories')}</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Finden Sie das perfekte Additive für Ihre spezifischen Anforderungen. Jede Kategorie ist spezialisiert auf optimale Leistung.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center group"
          >
            Alle Kategorien durchsuchen
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    productCount: number;
    color: string;
    borderColor: string;
  };
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group block"
    >
      <div className={`performance-meter card-hover relative overflow-hidden rounded-lg ${category.borderColor} border transition-all duration-300 group-hover:shadow-lg`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50`}></div>

        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center border ${category.borderColor}`}>
              <div className="text-accent-yellow">{category.icon}</div>
            </div>
            <span className="text-sm text-text-secondary bg-tertiary-bg px-3 py-1 rounded-full">
              {category.productCount} Produkte
            </span>
          </div>

          {/* Category Info */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Visual Elements */}
          <div className="mt-6 flex items-center justify-between">
            {/* Technical Lines */}
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-0.5 bg-accent-yellow/50 rounded-full"
                ></div>
              ))}
            </div>

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent-yellow transition-colors group-hover:translate-x-1" />
          </div>

          {/* Hover Overlay Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 tech-grid-bg"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}