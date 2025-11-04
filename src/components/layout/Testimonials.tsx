'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Schmidt',
    role: 'KFZ-Meisterbetrieb',
    company: 'Autohaus Schmidt GmbH',
    content: 'Petronax Produkte haben die Qualität unserer Dienstleistungen erheblich verbessert. Unsere Kunden sind begeistert von der spürbaren Leistungssteigerung.',
    rating: 5,
    avatar: '/images/testimonials/marcus.jpg',
    product: 'Motor Pro Plus',
  },
  {
    id: 2,
    name: 'Sabine Wagner',
    role: 'Logistik Managerin',
    company: 'Transport Wagner',
    content: 'Durch die Dieseladditive haben wir den Kraftstoffverbrauch unserer Flotte um 12% reduziert. Die Investition hat sich innerhalb von 3 Monaten amortisiert.',
    rating: 5,
    avatar: '/images/testimonials/sabine.jpg',
    product: 'Diesel Clean',
  },
  {
    id: 3,
    name: 'Thomas Weber',
    role: 'Fahrzeugbesitzer',
    company: 'Privat',
    content: 'Ich bin begeistert! Mein Sportwagen fühlt sich an wie neu. Die Beschleunigung ist spürbar besser und der Motor läuft leiser.',
    rating: 5,
    avatar: '/images/testimonials/thomas.jpg',
    product: 'Benzine Sport',
  },
  {
    id: 4,
    name: 'Jennifer Keller',
    role: 'Fleet Manager',
    company: 'Keller Spedition',
    content: 'Die Industrieadditive haben die Lebensdauer unserer Maschinen deutlich verlängert. Weniger Ausfallzeiten, mehr Produktivität.',
    rating: 5,
    avatar: '/images/testimonials/jennifer.jpg',
    product: 'Industrial Pro',
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-accent-yellow" />
            <span className="text-accent-yellow text-sm font-medium">Kundenstimmen</span>
          </div>
          <h2 className="responsive-title font-bold mb-4">Was unsere Kunden sagen</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Über 10.000 zufriedene Kunden vertrauen auf die Qualität von Petronax. Lesen Sie ihre Erfahrungen.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="performance-meter p-8 md:p-12 text-center relative">
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 text-accent-yellow/10">
                <Quote className="w-16 h-16" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 font-light">
                  "{current.content}"
                </p>

                {/* Rating */}
                <div className="flex justify-center items-center space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-6 h-6 text-accent-yellow fill-current"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-tertiary-bg rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-yellow">
                      {current.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{current.name}</h4>
                    <p className="text-text-secondary">{current.role}</p>
                    {current.company !== 'Privat' && (
                      <p className="text-sm text-accent-yellow">{current.company}</p>
                    )}
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 rounded-full px-4 py-2 mt-4">
                    <span className="text-sm text-accent-yellow font-medium">
                      Produkt: {current.product}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-tertiary-bg border border-primary-border rounded-full hover:bg-tertiary-bg hover:border-accent-yellow transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonial === index
                        ? 'bg-accent-yellow w-8'
                        : 'bg-primary-border hover:bg-accent-yellow/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-tertiary-bg border border-primary-border rounded-full hover:bg-tertiary-bg hover:border-accent-yellow transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-text-primary" />
              </button>
            </div>
          </div>

          {/* Additional Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials
              .filter((_, index) => index !== currentTestimonial)
              .slice(0, 3)
              .map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-20 border-t border-primary-border pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent-yellow mb-2">10.000+</div>
              <div className="text-text-secondary">Zufriedene Kunden</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-yellow mb-2">4.9/5</div>
              <div className="text-text-secondary">Durchschnittsbewertung</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-yellow mb-2">15+</div>
              <div className="text-text-secondary">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-yellow mb-2">98%</div>
              <div className="text-text-secondary">Weiterempfehlung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    product: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="performance-meter p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 text-accent-yellow fill-current"
            />
          ))}
        </div>
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-tertiary-bg rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-accent-yellow">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <h5 className="text-sm font-semibold text-text-primary">{testimonial.name}</h5>
          <p className="text-xs text-text-secondary">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}