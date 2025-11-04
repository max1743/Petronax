'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Power. Precision. Protection.",
      subtitle: "Premium Additive für maximale Effizienz",
      description: "Entdecken Sie unsere hochentwickelten Additive für Fahrzeuge und Maschinen. Entwickelt für maximale Leistung und Langlebigkeit.",
      cta: "Jetzt Additive entdecken",
      image: "/images/hero/motor-performance.jpg",
      features: ["+15% Leistung", "−8% Verbrauch", "−50% Emissionen"]
    },
    {
      title: "Innovation trifft Tradition",
      subtitle: "Made in Germany Qualität",
      description: "Seit über 20 Jahren führend in der Entwicklung von hochwertigen Additiven für die Automobil- und Industriebranche.",
      cta: "Unsere Geschichte",
      image: "/images/hero/manufacturing.jpg",
      features: ["TÜV geprüft", "ISO zertifiziert", "Labor getestet"]
    },
    {
      title: "Schutz für Ihre Investition",
      subtitle: "Langzeit-Schutz für Ihren Motor",
      description: "Unsere Premium-Formeln schützen vor Verschleiß, Korrosion und Ablagerungen für eine längere Lebensdauer.",
      cta: "Produkte vergleichen",
      image: "/images/hero/engine-protection.jpg",
      features: ["Wear Protection", "Corrosion Guard", "Deposit Control"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with technical grid effect */}
      <div className="absolute inset-0 metallic-gradient"></div>
      <div className="absolute inset-0 tech-grid-bg opacity-30"></div>

      {/* Animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-transparent to-secondary-bg/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse"></span>
              <span className="text-accent-yellow text-sm font-medium">Premium Qualität</span>
            </div>

            {/* Main Heading */}
            <h1 className="responsive-title font-bold leading-tight">
              <span className="block text-text-primary">{currentSlideData.title}</span>
              <span className="block text-accent-yellow">{currentSlideData.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {currentSlideData.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-tertiary-bg rounded-lg px-4 py-2"
                >
                  <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                  <span className="text-sm font-medium text-text-primary">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center justify-center group"
              >
                {currentSlideData.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary inline-flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Video ansehen
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-tertiary-bg border-2 border-primary-border rounded-full flex items-center justify-center"
                  >
                    <Star className="w-4 h-4 text-accent-yellow fill-current" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-accent-yellow fill-current" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary">4.9/5 von 2,847 Kunden</p>
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative">
            <div className="relative z-10 blueprint rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="aspect-video bg-gradient-to-br from-tertiary-bg to-secondary-bg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="text-accent-yellow">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">Petronax Pro</h3>
                  <p className="text-text-secondary">Maximale Leistung für Ihren Motor</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-yellow/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-red/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-tertiary-bg/80 backdrop-blur-sm rounded-full border border-primary-border hover:bg-tertiary-bg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-text-primary" />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-accent-yellow w-8'
                  : 'bg-primary-border hover:bg-accent-yellow/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 bg-tertiary-bg/80 backdrop-blur-sm rounded-full border border-primary-border hover:bg-tertiary-bg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-text-primary" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-yellow rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-yellow rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}