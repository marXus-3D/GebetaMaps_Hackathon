import { useEffect } from 'react';
import './App.css';

function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const L = window.L;
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" className="w-full h-full"></div>;
}

function SidePanel() {
  const placeholderPlaces = [
    { name: 'Coffee Shop', distance: '0.2 km' },
    { name: 'Park', distance: '0.5 km' },
    { name: 'Grocery Store', distance: '0.8 km' },
    { name: 'Restaurant', distance: '1.2 km' },
    { name: 'Gym', distance: '1.5 km' },
  ];

  return (
    <div className="bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Nearby Places</h2>
      <ul>
        {placeholderPlaces.map((place, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p className="font-semibold">{place.name}</p>
            <p className="text-sm text-gray-600">Distance: {place.distance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-3/4 relative">
        <Map />
      </div>
      <div className="w-1/4 bg-white shadow-lg">
        <SidePanel />
      </div>
    </div>
  );
}

export default App;
