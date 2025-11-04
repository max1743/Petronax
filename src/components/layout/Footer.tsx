'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const footerLinks = {
    company: [
      { name: t('footer.aboutUs'), href: '/about' },
      { name: t('footer.contact'), href: '/contact' },
      { name: 'Karriere', href: '/career' },
      { name: 'Presse', href: '/press' },
    ],
    customerService: [
      { name: t('footer.contact'), href: '/contact' },
      { name: t('footer.shipping'), href: '/shipping' },
      { name: t('footer.returns'), href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    legal: [
      { name: t('footer.privacy'), href: '/privacy' },
      { name: t('footer.terms'), href: '/terms' },
      { name: t('footer.imprint'), href: '/imprint' },
      { name: 'Cookie-Richtlinie', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/petronax', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/petronax', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/petronax', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/petronax', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary-bg border-t border-primary-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-yellow to-accent-yellow-hover rounded-lg flex items-center justify-center">
                <span className="text-primary-bg font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-text-primary">Petronax</span>
            </div>
            <p className="text-text-secondary mb-6 max-w-md">
              {t('hero.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-text-secondary">
                <Mail className="w-4 h-4 text-accent-yellow" />
                <span>info@petronax.corp</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <Phone className="w-4 h-4 text-accent-yellow" />
                <span>+49 123 456789</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-yellow" />
                <span>Industriestraße 123, 12345 Berlin, Deutschland</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-text-secondary hover:text-accent-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-text-secondary hover:text-accent-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-text-secondary text-sm mb-4">
              {t('footer.newsletter.description')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2 bg-tertiary-bg border border-primary-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-yellow text-sm"
              />
              <button
                type="submit"
                className="w-full btn-primary text-sm py-2"
              >
                {t('footer.newsletter.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-text-secondary text-sm">{t('footer.socialMedia')}:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg text-text-secondary hover:text-accent-yellow hover:bg-secondary-bg transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Petronax Corp. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-primary-border py-6">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-text-secondary text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Sichere Zahlung</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>DHL Versand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Made in Germany</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>TÜV geprüft</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}