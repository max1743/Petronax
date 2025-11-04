import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Zap, Award } from 'lucide-react';
import HeroSection from '@/components/layout/HeroSection';
import FeaturedProducts from '@/components/product/FeaturedProducts';
import CategoryShowcase from '@/components/product/CategoryShowcase';
import Testimonials from '@/components/layout/Testimonials';
import Newsletter from '@/components/layout/Newsletter';

export default function HomePage() {
  return (
    <div className="tech-grid-bg">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Maximale Leistung"
              description="Steigern Sie die Effizienz Ihres Motors um bis zu 15% mit unseren hochentwickelten Additiven."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Langzeit-Schutz"
              description="Schützen Sie Ihren Motor vor Verschleiß und verlängern Sie die Lebensdauer显著."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Premium Qualität"
              description="Hergestellt in Deutschland nach höchsten Qualitätsstandards und strengen Tests."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-bg to-tertiary-bg relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="responsive-title font-bold mb-6 bg-gradient-to-r from-accent-yellow to-accent-red bg-clip-text text-transparent">
              Bereit für maximale Leistung?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Entdecken Sie unsere Premium-Additive und erleben Sie den Unterschied in Leistung und Effizienz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="btn-primary inline-flex items-center justify-center"
              >
                Jetzt Produkte entdecken
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="performance-meter card-hover p-8 text-center group">
      <div className="w-16 h-16 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-yellow/30 transition-colors">
        <div className="text-accent-yellow">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-text-primary">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}