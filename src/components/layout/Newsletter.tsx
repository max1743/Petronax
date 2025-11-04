'use client';

import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-r from-secondary-bg to-tertiary-bg relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent-yellow" />
            </div>
            <h2 className="responsive-title font-bold mb-4 text-text-primary">
              Vielen Dank für Ihre Anmeldung!
            </h2>
            <p className="text-lg text-text-secondary">
              Sie haben sich erfolgreich für unseren Newsletter angemeldet. Wir halten Sie auf dem Laufenden über neue Produkte und exklusive Angebote.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-secondary-bg to-tertiary-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 tech-grid-bg opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-accent-yellow" />
          </div>

          {/* Content */}
          <h2 className="responsive-title font-bold mb-4 text-text-primary">
            Bleiben Sie informiert
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Erhalten Sie exklusive Angebote, Produktnovitäten und technische Tipps direkt in Ihr Postfach. Melden Sie sich jetzt für unseren Newsletter an.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail-Adresse"
                required
                className="w-full px-4 py-3 pl-12 bg-tertiary-bg border border-primary-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-yellow transition-colors"
                disabled={isLoading}
              />
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-text-muted" />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-bg border-t-transparent rounded-full animate-spin mr-2"></div>
                  Wird verarbeitet...
                </>
              ) : (
                <>
                  Anmelden
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-accent-yellow font-bold text-lg">%</span>
              </div>
              <h4 className="font-semibold text-text-primary mb-1">Exklusive Rabatte</h4>
              <p className="text-sm text-text-secondary">
                Nur für Abonnenten verfügbare Sonderangebote
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-accent-yellow font-bold text-lg">!</span>
              </div>
              <h4 className="font-semibold text-text-primary mb-1">Neuigkeiten zuerst</h4>
              <p className="text-sm text-text-secondary">
                Informieren Sie sich als Erster über neue Produkte
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-accent-yellow font-bold text-lg">✓</span>
              </div>
              <h4 className="font-semibold text-text-primary mb-1">Jederzeit kündbar</h4>
              <p className="text-sm text-text-secondary">
                Keine Bindung, einfache Abmeldung jederzeit möglich
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-text-muted mt-8">
            Mit Ihrer Anmeldung stimmen Sie unseren{' '}
            <a href="/privacy" className="text-accent-yellow hover:underline">
              Datenschutzbestimmungen
            </a>{' '}
            zu. Wir versprechen, Ihre Daten nicht an Dritte weiterzugeben.
          </p>
        </div>
      </div>
    </section>
  );
}