'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Filter, Search, Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import ProductList from '@/components/product/ProductList';
import FilterSidebar from '@/components/product/FilterSidebar';
import SortDropdown from '@/components/product/SortDropdown';
import Breadcrumb from '@/components/ui/Breadcrumb';

// Mock product data - this would come from API
const mockProducts = [
  {
    id: '1',
    name: 'Petronax Motor Pro Plus',
    slug: 'petronax-motor-pro-plus',
    shortDesc: 'Premium Motoradditive für maximale Leistung und Langlebigkeit. Speziell entwickelt für moderne Verbrennungsmotoren.',
    price: 29.99,
    comparePrice: 39.99,
    sku: 'PNX-MOTOR-001',
    stock: 50,
    images: ['/images/products/motor-pro-plus-1.jpg', '/images/products/motor-pro-plus-2.jpg'],
    category: { id: '1', name: 'Motoradditive', slug: 'motoradditive' },
    rating: 4.9,
    reviewCount: 234,
    features: {
      dosierung: '50ml pro 50L Kraftstoff',
      anwendung: 'Alle Benzinmotoren',
      wirkstoff: 'Polyetheramine',
    },
    benefits: ['Reduziert Verbrauch bis zu 8%', 'Verbessert Leistung', 'Schützt vor Ablagerungen'],
    badge: 'BESTSELLER',
  },
  {
    id: '2',
    name: 'Petronax Diesel Clean',
    slug: 'petronax-diesel-clean',
    shortDesc: 'Effektives Dieseladditive für Sauberkeit und Effizienz. Entfernt Ablagerungen im Einspritzsystem.',
    price: 24.99,
    sku: 'PNX-DIESEL-002',
    stock: 75,
    images: ['/images/products/diesel-clean-1.jpg'],
    category: { id: '2', name: 'Dieseladditive', slug: 'dieseladditive' },
    rating: 4.8,
    reviewCount: 189,
    features: {
      dosierung: '100ml pro 50L Diesel',
      anwendung: 'Alle Dieselmotoren',
    },
    benefits: ['Reinigt Einspritzdüsen', 'Verbessert Kaltstart', 'Reduziert Rußbildung'],
    badge: 'NEU',
  },
  {
    id: '3',
    name: 'Petronax Benzine Sport',
    slug: 'petronax-benzine-sport',
    shortDesc: 'Sportliches Benzinadditive für maximale Leistung. Entwickelt für High-Performance-Motoren.',
    price: 34.99,
    comparePrice: 44.99,
    sku: 'PNX-BENZIN-003',
    stock: 30,
    images: ['/images/products/benzine-sport-1.jpg'],
    category: { id: '3', name: 'Benzinadditive', slug: 'benzinadditive' },
    rating: 4.7,
    reviewCount: 156,
    badge: 'ANGEBOT',
  },
  {
    id: '4',
    name: 'Petronax Getriebe Shield',
    slug: 'petronax-getriebe-shield',
    shortDesc: 'Schutz-Additive für Getriebe und Ölsysteme. Reduziert Verschleiß und verlängert Lebensdauer.',
    price: 27.99,
    sku: 'PNX-GETRIEBE-004',
    stock: 40,
    images: ['/images/products/getriebe-shield-1.jpg'],
    category: { id: '4', name: 'Getriebe- & Öladditive', slug: 'getriebe-oeladditive' },
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: '5',
    name: 'Petronax Industrial Pro',
    slug: 'petronax-industrial-pro',
    shortDesc: 'Heavy-Duty-Additive für industrielle Anwendung. Entwickelt für extrem hohe Belastungen.',
    price: 49.99,
    sku: 'PNX-INDUSTRIE-005',
    stock: 20,
    images: ['/images/products/industrial-pro-1.jpg'],
    category: { id: '5', name: 'Industrieadditive', slug: 'industrieadditive' },
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: '6',
    name: 'Petronax Motor Clean',
    slug: 'petronax-motor-clean',
    shortDesc: 'Reinigungs-Additive für Motoren. Entfernt Ablagerungen und verbessert die Motorleistung.',
    price: 22.99,
    sku: 'PNX-MOTOR-006',
    stock: 60,
    images: ['/images/products/motor-clean-1.jpg'],
    category: { id: '1', name: 'Motoradditive', slug: 'motoradditive' },
    rating: 4.5,
    reviewCount: 143,
  },
];

const categories = [
  { id: '1', name: 'Motoradditive', slug: 'motoradditive', count: 24 },
  { id: '2', name: 'Dieseladditive', slug: 'dieseladditive', count: 18 },
  { id: '3', name: 'Benzinadditive', slug: 'benzinadditive', count: 32 },
  { id: '4', name: 'Getriebe- & Öladditive', slug: 'getriebe-oeladditive', count: 15 },
  { id: '5', name: 'Industrieadditive', slug: 'industrieadditive', count: 12 },
];

export default function ShopPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('featured');

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category.slug === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id.localeCompare(a.id);
        default: // featured
          return a.id === '1' ? -1 : b.id === '1' ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen tech-grid-bg">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { name: t('seo.homepage'), href: '/' },
            { name: t('navigation.shop'), href: '/shop' }
          ]}
        />
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="responsive-title font-bold mb-4">{t('navigation.shop')}</h1>
          <p className="text-lg text-text-secondary">
            Entdecken Sie unsere Premium-Additive für maximale Leistung und Effizienz.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters Bar */}
            <div className="bg-card-bg border border-card-border rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-tertiary-bg border border-primary-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-yellow"
                  />
                </div>

                {/* Filters and View */}
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden flex items-center space-x-2 px-4 py-2 bg-tertiary-bg border border-primary-border rounded-lg hover:border-accent-yellow transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter</span>
                    {selectedCategory && (
                      <span className="w-2 h-2 bg-accent-yellow rounded-full"></span>
                    )}
                  </button>

                  {/* Sort Dropdown */}
                  <SortDropdown value={sortBy} onChange={setSortBy} />

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-tertiary-bg border border-primary-border rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-l-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-accent-yellow text-primary-bg'
                          : 'text-text-secondary hover:text-accent-yellow'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-r-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-accent-yellow text-primary-bg'
                          : 'text-text-secondary hover:text-accent-yellow'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || searchQuery) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary-border">
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-yellow/10 text-accent-yellow rounded-full text-sm hover:bg-accent-yellow/20 transition-colors"
                    >
                      <span>Kategorie: {categories.find(c => c.slug === selectedCategory)?.name}</span>
                      <span className="text-xs">×</span>
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-yellow/10 text-accent-yellow rounded-full text-sm hover:bg-accent-yellow/20 transition-colors"
                    >
                      <span>Suche: {searchQuery}</span>
                      <span className="text-xs">×</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Filter Sidebar */}
            {isFilterOpen && (
              <div className="lg:hidden mb-6">
                <FilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  isMobile
                  onClose={() => setIsFilterOpen(false)}
                />
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                <span className="font-semibold text-text-primary">{filteredProducts.length}</span> Produkte gefunden
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              viewMode === 'grid' ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <ProductList products={filteredProducts} />
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-tertiary-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Keine Produkte gefunden</h3>
                <p className="text-text-secondary mb-6">
                  Versuchen Sie, Ihre Suchanfrage oder Filter anzupassen.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setPriceRange({ min: 0, max: 100 });
                  }}
                  className="btn-secondary"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}