'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import '@changey/react-leaflet-markercluster/dist/styles.min.css'; // Marker cluster CSS

// Leaflet's default icon paths are not set up for Next.js by default.
// This code manually sets the paths to the correct ones.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Dummy data for property locations
const properties = [
  { id: 1, lat: 37.5665, lng: 126.9780, name: 'Property 1' },
  { id: 2, lat: 37.5651, lng: 126.9770, name: 'Property 2' },
  { id: 3, lat: 37.5645, lng: 126.9790, name: 'Property 3' },
  { id: 4, lat: 37.5680, lng: 126.9800, name: 'Property 4' },
  // Add more properties as needed
];

const MainMap = () => {
  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  return (
    <MapContainer center={[37.5665, 126.9780]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {properties.map((property) => (
          <Marker key={property.id} position={[property.lat, property.lng]}>
            <Popup>{property.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MainMap;
