import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ico = L.divIcon({
  className: "cutomMark",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapComponent({ addEstablishment }) {
  const [currentPosition, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, set the location state with the latitude and longitude
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);

          // alert(position.coords.latitude + "," + position.coords.longitude);
        },
        (error) => {
          // On error, set the error message in state
          setLocationError(error.message);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng; // Get the latitude and longitude of the click

    alert(lat + " " + lng);

    // Add a new marker to the state
    // setMarkers((prevMarkers) => [
    //   ...prevMarkers,
    //   { lat, lng, id: Date.now() }, // Use Date.now() to generate a unique ID
    // ]);
  };

  function MapEvent() {
    const map = useMapEvents({
      click(e) {
        const markPos = e.latlng;

        const distance = calculateDistance(
          markPos.lat,
          markPos.lng,
          currentPosition[0],
          currentPosition[1]
        );

        if (distance < 20) {
          alert("too close");
        } else {
          addEstablishment(true);
        }
      },
    });
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div className="h-full w-full relative z-0">
      <div className="w-dvw h-full flex justify-center">
        {/* MapContainer is the wrapper for your map */}
        {currentPosition == null ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            style={{
              alignSelf: "center",
              shapeRendering: "auto",
              display: "block",
              background: "transparent",
            }}
            width="227px"
            height="227px"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g transform="translate(50 50)">
                <g transform="scale(0.8)">
                  <g transform="translate(-50 -50)">
                    <g>
                      <animateTransform
                        keyTimes="0;0.33;0.66;1"
                        values="-20 -20;20 -20;0 20;-20 -20"
                        dur="1.7241379310344827s"
                        repeatCount="indefinite"
                        type="translate"
                        attributeName="transform"
                      ></animateTransform>
                      <path
                        d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"
                        fill="#918978"
                      ></path>
                      <path
                        d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"
                        fill="#131137"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
              <g></g>
            </g>
          </svg>
        ) : (
          <MapContainer
            center={currentPosition}
            zoom={20}
            style={{ width: "100%", height: "100%" }}
          >
            {/* TileLayer loads the OpenStreetMap tiles */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvent />
            <Marker
              position={currentPosition}
              icon={ico}
              title="Current Location"
            >
              <Popup>Current Location</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default MapComponent;
