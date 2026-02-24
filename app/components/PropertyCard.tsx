import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  address: string;
  propertyType: string;
}

export default function PropertyCard({ id, title, price, address, propertyType }: PropertyCardProps) {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/properties/${id}`}>
        <div className="bg-gray-300 h-48 flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{title}</h3>
          <p className="text-gray-800 font-semibold my-1">{price}</p>
          <p className="text-sm text-gray-600 truncate">{address}</p>
          <p className="text-xs text-gray-500 mt-2">{t(propertyType)}</p>
        </div>
      </Link>
    </div>
  );
}
