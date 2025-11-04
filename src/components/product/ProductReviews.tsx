'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, User, Filter } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState('most-helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      name: 'Marcus Schmidt',
      rating: 5,
      date: '2024-10-15',
      verified: true,
      helpful: 23,
      title: 'Hervorragendes Produkt!',
      content: 'Ich bin absolut begeistert von diesem Motoradditive. Mein Auto läuft明显 leiser und der Verbrauch hat sich um fast 10% reduziert. Die Anwendung ist super einfach und die Wirkung spürbar.',
      usage: 'PKW, 2.0L Benziner',
      benefits: ['Leiserer Motorlauf', 'Geringerer Verbrauch', 'Bessere Beschleunigung']
    },
    {
      id: '2',
      name: 'Sabine Wagner',
      rating: 4,
      date: '2024-10-10',
      verified: true,
      helpful: 15,
      title: 'Sehr gutes Ergebnis',
      content: 'Habe das Produkt bei meinem Diesel verwendet. Positiv aufgefallen sind der bessere Kaltstart und die spürbar ruhigere Laufkultur. Ein Stern Abzug für den Preis, aber Qualität ist top.',
      usage: 'SUV, 3.0L Diesel',
      benefits: ['Besserer Kaltstart', 'Ruhigerer Lauf', 'Saubere Verbrennung']
    },
    {
      id: '3',
      name: 'Thomas Weber',
      rating: 5,
      date: '2024-10-05',
      verified: true,
      helpful: 31,
      title: 'Premium Qualität die sich lohnt',
      content: 'Als Automechaniker kann ich die Qualität dieses Produkts bestätigen. Die chemische Zusammensetzung ist professionell und die Wirkung messbar. Meine Kunden sind ebenfalls sehr zufrieden.',
      usage: 'Verschiedene Fahrzeugtypen',
      benefits: ['Professionelle Qualität', 'Messbare Wirkung', 'Kundenzufriedenheit']
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 67 },
    { stars: 4, count: 54, percentage: 23 },
    { stars: 3, count: 18, percentage: 8 },
    { stars: 2, count: 4, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 }
  ];

  const filteredReviews = filterRating
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="performance-meter p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Kundenbewertungen</h3>

            {/* Overall Rating */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-accent-yellow mb-2">{rating}</div>
              <div className="flex justify-center items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(rating)
                        ? 'text-accent-yellow fill-current'
                        : 'text-primary-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary">{reviewCount} Bewertungen</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm text-text-primary">{dist.stars}</span>
                    <Star className="w-4 h-4 text-accent-yellow fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-tertiary-bg rounded-full h-2">
                      <div
                        className="bg-accent-yellow h-2 rounded-full"
                        style={{ width: `${dist.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-text-secondary w-12 text-right">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Filter by Rating */}
            <div className="mt-6 pt-6 border-t border-primary-border">
              <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Nach Bewertung filtern
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    !filterRating
                      ? 'bg-accent-yellow/10 text-accent-yellow'
                      : 'text-text-secondary hover:bg-tertiary-bg'
                  }`}
                >
                  Alle Bewertungen
                </button>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setFilterRating(stars)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      filterRating === stars
                        ? 'bg-accent-yellow/10 text-accent-yellow'
                        : 'text-text-secondary hover:bg-tertiary-bg'
                    }`}
                  >
                    {stars} Sterne
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">
              {filteredReviews.length} Bewertungen
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-tertiary-bg border border-primary-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-yellow"
            >
              <option value="most-helpful">Hilfreichste</option>
              <option value="most-recent">Neueste zuerst</option>
              <option value="highest-rating">Höchste Bewertung</option>
              <option value="lowest-rating">Niedrigste Bewertung</option>
            </select>
          </div>

          {/* Review Items */}
          {filteredReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}

          {/* Load More Button */}
          <div className="text-center">
            <button className="btn-secondary">
              Mehr Bewertungen laden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReviewItemProps {
  review: {
    id: string;
    name: string;
    rating: number;
    date: string;
    verified: boolean;
    helpful: number;
    title: string;
    content: string;
    usage: string;
    benefits: string[];
  };
}

function ReviewItem({ review }: ReviewItemProps) {
  const [helpful, setHelpful] = useState<'helpful' | 'not-helpful' | null>(null);

  return (
    <div className="performance-meter p-6 rounded-lg">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-tertiary-bg rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-text-muted" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-text-primary">{review.name}</h4>
              {review.verified && (
                <span className="inline-flex items-center px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                  ✓ Verifizierter Kauf
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'text-accent-yellow fill-current'
                        : 'text-primary-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {new Date(review.date).toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-4">
        <h5 className="font-medium text-text-primary">{review.title}</h5>
        <p className="text-text-secondary leading-relaxed">{review.content}</p>

        {/* Usage Details */}
        <div className="pt-4 border-t border-primary-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-sm font-medium text-text-primary mb-2">Verwendung:</h6>
              <p className="text-sm text-text-secondary">{review.usage}</p>
            </div>
            <div>
              <h6 className="text-sm font-medium text-text-primary mb-2">Festgestellte Vorteile:</h6>
              <ul className="space-y-1">
                {review.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Helpful Buttons */}
        <div className="flex items-center space-x-4 pt-4 border-t border-primary-border">
          <span className="text-sm text-text-secondary">War diese Bewertung hilfreich?</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setHelpful('helpful')}
              className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                helpful === 'helpful'
                  ? 'bg-accent-yellow/10 text-accent-yellow'
                  : 'text-text-secondary hover:bg-tertiary-bg'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Ja ({review.helpful})</span>
            </button>
            <button
              onClick={() => setHelpful('not-helpful')}
              className={`flex items-center space-x-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                helpful === 'not-helpful'
                  ? 'bg-accent-red/10 text-accent-red'
                  : 'text-text-secondary hover:bg-tertiary-bg'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Nein</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}