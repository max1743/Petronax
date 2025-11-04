'use client';

import { useState } from 'react';
import { ChevronDown, ArrowUpDown, Star, TrendingUp, Clock, Alphabetical } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'featured', label: 'Empfohlen', icon: <Star className="w-4 h-4" /> },
  { value: 'price-low', label: 'Preis: Aufsteigend', icon: <ArrowUpDown className="w-4 h-4" /> },
  { value: 'price-high', label: 'Preis: Absteigend', icon: <ArrowUpDown className="w-4 h-4" /> },
  { value: 'rating', label: 'Beste Bewertung', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'newest', label: 'Neueste zuerst', icon: <Clock className="w-4 h-4" /> },
  { value: 'name', label: 'Alphabetisch', icon: <Alphabetical className="w-4 h-4" /> },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 bg-tertiary-bg border border-primary-border rounded-lg hover:border-accent-yellow transition-colors"
      >
        <span className="text-sm text-text-secondary">Sortieren:</span>
        <span className="text-sm font-medium text-text-primary">{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-56 bg-card-bg border border-card-border rounded-lg shadow-xl z-20">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-tertiary-bg transition-colors ${
                    value === option.value ? 'bg-accent-yellow/10 text-accent-yellow' : 'text-text-primary'
                  }`}
                >
                  <span className="flex-shrink-0">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                  {value === option.value && (
                    <div className="w-2 h-2 bg-accent-yellow rounded-full ml-auto"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}