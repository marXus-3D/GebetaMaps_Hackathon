import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Set a default position (latitude, longitude)
const position = [9.03, 38.74]; // Coordinates for London, UK

const MapComponent = () => {
  return (
    <div className="w-full h-full">
      {/* MapContainer is the wrapper for your map */}
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
        {/* TileLayer loads the OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker shows a pin on the map */}
        <Marker position={position}>
          <Popup>A sample marker in London</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};


function App() {
  return (
    <div className="flex h-screen">
      <div className="w-3/4 relative">
        {/* <Map /> */}
        <MapComponent />
      </div>
      <div className="w-1/4 bg-white shadow-lg">
        <SidePanel />
      </div>
    </div>
  );
}

export default App;
