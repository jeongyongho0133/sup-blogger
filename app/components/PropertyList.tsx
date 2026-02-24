'use client';

import { useState } from 'react';
import PropertyCard from './PropertyCard';
import type { Property } from '../../types';
import { i18n } from '../i18n';
import { useTranslation } from 'react-i18next';

// This component receives the initial properties from a Server Component.
export default function PropertyList({ initialProperties }: { initialProperties: Property[] }) {
  const { t } = useTranslation();
  // The state can be used for client-side filtering/sorting in the future.
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">{t('Real Estate Platform')}</h1>
        <div>
          <button onClick={() => changeLanguage('en')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            English
          </button>
          <button onClick={() => changeLanguage('ko')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Korean
          </button>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">{t('Latest Properties')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => {
            // Determine the price string based on transaction type
            let priceString = '';
            if (property.transactionType === 'sale') {
              priceString = `${t('Sale')} ${property.price}`;
            } else if (property.transactionType === 'rent') {
              priceString = `${t('Rent')} ${property.deposit} / ${property.rent}`;
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
