'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

export default function Header() {
  const t = useTranslations('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === `/${locale}` || pathname === '/';
    }
    return pathname.startsWith(`/${locale}${path}`);
  };

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('shop'), href: '/shop' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-bg/95 backdrop-blur-sm border-b border-primary-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-yellow to-accent-yellow-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-bg font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-text-primary">Petronax</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent-yellow",
                  isActive(item.href) ? "text-accent-yellow" : "text-text-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-accent-yellow hover:bg-secondary-bg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href={`/de${pathname.replace(`/${locale}`, '')}`}
                className={cn(
                  "px-2 py-1 text-sm rounded transition-colors",
                  locale === 'de' ? "bg-accent-yellow text-primary-bg" : "text-text-secondary hover:text-accent-yellow"
                )}
              >
                DE
              </Link>
              <Link
                href={`/en${pathname.replace(`/${locale}`, '')}`}
                className={cn(
                  "px-2 py-1 text-sm rounded transition-colors",
                  locale === 'en' ? "bg-accent-yellow text-primary-bg" : "text-text-secondary hover:text-accent-yellow"
                )}
              >
                EN
              </Link>
            </div>

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="relative p-2 rounded-lg text-text-secondary hover:text-accent-yellow hover:bg-secondary-bg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-yellow text-primary-bg text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Account */}
            <button className="hidden md:flex p-2 rounded-lg text-text-secondary hover:text-accent-yellow hover:bg-secondary-bg transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-accent-yellow hover:bg-secondary-bg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-primary-border">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Suche nach Produkten..."
                className="w-full px-4 py-2 pl-10 bg-tertiary-bg border border-primary-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-yellow"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-text-muted" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-border bg-primary-bg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent-yellow py-2",
                    isActive(item.href) ? "text-accent-yellow" : "text-text-secondary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-4 py-2">
                <span className="text-sm text-text-secondary">{t('language')}:</span>
                <div className="flex space-x-2">
                  <Link
                    href={`/de${pathname.replace(`/${locale}`, '')}`}
                    className={cn(
                      "px-3 py-1 text-sm rounded transition-colors",
                      locale === 'de' ? "bg-accent-yellow text-primary-bg" : "text-text-secondary hover:text-accent-yellow"
                    )}
                  >
                    DE
                  </Link>
                  <Link
                    href={`/en${pathname.replace(`/${locale}`, '')}`}
                    className={cn(
                      "px-3 py-1 text-sm rounded transition-colors",
                      locale === 'en' ? "bg-accent-yellow text-primary-bg" : "text-text-secondary hover:text-accent-yellow"
                    )}
                  >
                    EN
                  </Link>
                </div>
              </div>

              {/* Mobile Account */}
              <Link
                href={`/${locale}/account`}
                className="text-sm font-medium text-text-secondary hover:text-accent-yellow py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mein Konto
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}