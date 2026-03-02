'use client';

import { useState } from 'react';
import PropertyCard from './PropertyCard';
import type { Property } from '../../types';

// This component receives the initial properties from a Server Component.
export default function PropertyList({ initialProperties }: { initialProperties: Property[] }) {
  // The state can be used for client-side filtering/sorting in the future.
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">부동산 플랫폼</h1>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">최신 매물</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => {
            // Determine the price string based on transaction type
            let priceString = '';
            if (property.transactionType === 'sale') {
              priceString = `매매 ${property.price}`;
            } else if (property.transactionType === 'rent') {
              priceString = `전세 ${property.deposit} / ${property.rent}`;
            }

            return (
              <PropertyCard 
                key={property.id}
                id={property.id}
                title={property.title}
                price={priceString}
                address={property.address}
                propertyType={property.propertyType}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
