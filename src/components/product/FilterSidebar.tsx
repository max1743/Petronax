'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  isMobile = false,
  onClose
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    features: false,
    rating: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    onPriceRangeChange({
      ...priceRange,
      [type]: value
    });
  };

  const clearAllFilters = () => {
    onCategoryChange('');
    onPriceRangeChange({ min: 0, max: 100 });
  };

  const hasActiveFilters = selectedCategory || priceRange.min > 0 || priceRange.max < 100;

  return (
    <div className={`bg-card-bg border border-card-border rounded-lg p-6 ${
      isMobile ? 'sticky top-20 z-40' : 'sticky top-24'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-accent-yellow" />
          <h3 className="text-lg font-semibold text-text-primary">Filter</h3>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-tertiary-bg rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full mb-4 px-4 py-2 text-sm text-accent-yellow border border-accent-yellow/30 rounded-lg hover:bg-accent-yellow/10 transition-colors"
        >
          Alle Filter zurücksetzen
        </button>
      )}

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h4 className="font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">
            Kategorien
          </h4>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={!selectedCategory}
                onChange={() => onCategoryChange('')}
                className="w-4 h-4 text-accent-yellow border-primary-border focus:ring-accent-yellow"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                Alle Kategorien
              </span>
            </label>
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.slug}
                    onChange={() => onCategoryChange(category.slug)}
                    className="w-4 h-4 text-accent-yellow border-primary-border focus:ring-accent-yellow"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-text-muted">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h4 className="font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">
            Preisbereich
          </h4>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-text-secondary">Mindestpreis</label>
                <span className="text-sm font-medium text-text-primary">€{priceRange.min}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                className="w-full h-2 bg-tertiary-bg rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-text-secondary">Höchstpreis</label>
                <span className="text-sm font-medium text-text-primary">€{priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                className="w-full h-2 bg-tertiary-bg rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Quick Price Selection */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                { min: 0, max: 25, label: 'Unter €25' },
                { min: 25, max: 50, label: '€25 - €50' },
                { min: 50, max: 75, label: '€50 - €75' },
                { min: 75, max: 100, label: 'Über €75' }
              ].map((range, index) => (
                <button
                  key={index}
                  onClick={() => onPriceRangeChange({ min: range.min, max: range.max })}
                  className="px-3 py-2 text-xs bg-tertiary-bg border border-primary-border rounded-lg hover:border-accent-yellow hover:bg-accent-yellow/5 transition-colors"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Features (placeholder) */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h4 className="font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">
            Eigenschaften
          </h4>
          {expandedSections.features ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {expandedSections.features && (
          <div className="space-y-2">
            {[
              'TÜV geprüft',
              'Made in Germany',
              'ISO zertifiziert',
              'Labor getestet',
              'Umweltfreundlich',
              'Langzeitwirkung'
            ].map((feature, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-accent-yellow border-primary-border rounded focus:ring-accent-yellow"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {feature}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating (placeholder) */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h4 className="font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">
            Bewertung
          </h4>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  className="w-4 h-4 text-accent-yellow border-primary-border focus:ring-accent-yellow"
                />
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= rating ? 'text-accent-yellow' : 'text-primary-border'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-text-secondary ml-1">
                    & mehr
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
}