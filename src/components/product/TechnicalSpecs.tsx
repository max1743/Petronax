'use client';

import { Zap, Beaker, Shield, Clock, Package, Award } from 'lucide-react';

interface TechnicalSpecsProps {
  features: Record<string, any>;
}

export default function TechnicalSpecs({ features }: TechnicalSpecsProps) {
  const specCategories = [
    {
      title: 'Anwendung',
      icon: <Zap className="w-5 h-5" />,
      items: [
        { label: 'Dosierung', value: features.dosierung },
        { label: 'Anwendungsbereich', value: features.anwendung },
        { label: 'Wirksamkeit', value: features.wirksamkeit },
      ]
    },
    {
      title: 'Technische Daten',
      icon: <Beaker className="w-5 h-5" />,
      items: [
        { label: 'Wirkstoffe', value: features.wirkstoff },
        { label: 'Haltbarkeit', value: features.haltbarkeit },
        { label: 'Verpackung', value: features.verpackung },
      ]
    },
    {
      title: 'Qualität & Sicherheit',
      icon: <Shield className="w-5 h-5" />,
      items: [
        { label: 'Zertifizierung', value: features.zertifizierung },
        { label: 'Qualitätskontrolle', value: 'Jede Charge wird geprüft' },
        { label: 'Sicherheitsdatenblatt', value: 'Verfügbar auf Anfrage' },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {specCategories.map((category, index) => (
        <div key={index} className="performance-meter p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent-yellow/10 rounded-lg flex items-center justify-center">
              <div className="text-accent-yellow">{category.icon}</div>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">{category.title}</h3>
          </div>

          <div className="space-y-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="space-y-1">
                <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                <p className="text-sm text-text-secondary">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Performance Metrics */}
      <div className="lg:col-span-3">
        <div className="performance-meter p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Leistungsmetriken</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Leistungssteigerung', value: '15%', description: 'Maximale Verbesserung' },
              { label: 'Verbrauchsreduktion', value: '8%', description: 'Durchschnittliche Einsparung' },
              { label: 'Emissionsreduktion', value: '50%', description: 'Schadstoffreduzierung' },
              { label: 'Lebensdauer', value: '10.000km', description: 'Wirksamkeit pro Anwendung' }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-accent-yellow mb-2">{metric.value}</div>
                <h4 className="font-medium text-text-primary mb-1">{metric.label}</h4>
                <p className="text-xs text-text-secondary">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Performance Bars */}
          <div className="mt-8 space-y-4">
            {[
              { label: 'Motorreinigung', value: 95 },
              { label: 'Verschleißschutz', value: 92 },
              { label: 'Kraftstoffeffizienz', value: 88 },
              { label: 'Emissionskontrolle', value: 90 }
            ].map((performance, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary">{performance.label}</span>
                  <span className="text-accent-yellow font-medium">{performance.value}%</span>
                </div>
                <div className="w-full bg-tertiary-bg rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-accent-yellow to-accent-yellow-hover h-2 rounded-full"
                    style={{ width: `${performance.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}