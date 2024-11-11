import { useState } from "react";

function SidePanel({ map }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("places");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [nearbyPlaceSearch, setNearbySearch] = useState(null);
  const [nearbyGebetaSearch, setNearbyGebeta] = useState(null);

  const [navigateCoord, setNavigateCoor] = useState();

  const placeholderPlaces = [
    { name: "Coffee Shop", distance: "0.2 km", reviewed: true, rating: 4.5 },
    { name: "Park", distance: "0.5 km", reviewed: false },
    { name: "Grocery Store", distance: "0.8 km", reviewed: true, rating: 3.8 },
    { name: "Restaurant", distance: "1.2 km", reviewed: true, rating: 4.2 },
    { name: "Gym", distance: "1.5 km", reviewed: false },
    { name: "Bookstore", distance: "0.7 km", reviewed: true, rating: 4.0 },
    { name: "Cinema", distance: "2.0 km", reviewed: false },
    { name: "Bakery", distance: "0.3 km", reviewed: true, rating: 4.7 },
  ];

  const filteredPlaces = placeholderPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reviewedPlaces = filteredPlaces.filter((place) => place.reviewed);
  const unreviewedPlaces = filteredPlaces.filter((place) => !place.reviewed);

  const fetchGebetaPlaces = async (term) => {
    setNearbyGebeta(null);
    console.log("This is your token", process.env.token);
    try {
      const response = await fetch(
        `https://mapapi.gebeta.app/api/v1/route/geocoding?name=${term}&apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55bmFtZSI6ImhhY2thdGhvbiIsImRlc2NyaXB0aW9uIjoiN2U0NmI2OTUtZmE5Yi00NDQ3LTliMjgtOGQ1NzQwMWQ3MjYwIiwiaWQiOiI4NzQzYTUyZC1jNGRjLTQyNjUtYWI1ZC0yMTJkNmI3NmVmNTgiLCJ1c2VybmFtZSI6ImhhY2F0aG9uIn0.qBPwmYTCHTjOQbJKFzFTCalyRdT_3fIW0BcqVno17g8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json().then((data) => {
        setNearbyGebeta(data.data);
      });

      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderPlaces = (places) => {
    return places.map((place, index) => (
      <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
        <p className="font-semibold">{place.name}</p>
        <p className="text-sm text-gray-600">Distance: {place.distance}</p>
        {place.reviewed && (
          <p className="text-sm text-blue-600">Rating: {place.rating}</p>
        )}
      </li>
    ));
  };
  const renderUnreviewed = (places) => {
    return places == null ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "transparent",
        }}
        width="100%"
        height="200"
      >
        <g>
          <circle fill="#464646" r="10" cy="50" cx="84">
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1"
              values="10;0"
              keyTimes="0;1"
              calcMode="spline"
              dur="0.25s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="0s"
              values="#464646;#464646;#dfdfdf;#a0a0a0;#464646"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="discrete"
              dur="1s"
              repeatCount="indefinite"
              attributeName="fill"
            ></animate>
          </circle>
          <circle fill="#464646" r="10" cy="50" cx="16">
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#a0a0a0" r="10" cy="50" cx="50">
            <animate
              begin="-0.25s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.25s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#dfdfdf" r="10" cy="50" cx="84">
            <animate
              begin="-0.5s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.5s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#464646" r="10" cy="50" cx="16">
            <animate
              begin="-0.75s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.75s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
    ) : (
      places.map((place, index) => (
        <li
          key={index}
          className="mb-2 p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-300 transition-colors"
          onClick={ () => map.setView([place.latitude, place.longitude], 20, { animate: true, duration: 2})}
        >
          <p className="font-semibold">{place.name}</p>
          <p className="text-sm text-gray-600">Distance: 1.0km</p>
          <p className="text-sm text-blue-600">Type: {place.type}</p>
        </li>
      ))
    );
  };

  const handleSearchChange = (e) => {
    fetchGebetaPlaces(e.target.value);
    setSearchTerm(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const placeholderPeople = [
    { name: "John Doe", distance: "0.3 km" },
    { name: "Jane Smith", distance: "0.7 km" },
    { name: "Mike Johnson", distance: "1.0 km" },
    { name: "Emily Brown", distance: "1.4 km" },
  ];

  const placeholderEvents = [
    { name: "Local Concert", distance: "0.5 km", date: "2024-11-15" },
    { name: "Art Exhibition", distance: "0.9 km", date: "2024-11-20" },
    { name: "Food Festival", distance: "1.3 km", date: "2024-11-25" },
    { name: "Charity Run", distance: "1.8 km", date: "2024-11-30" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "places":
        return placeholderPlaces.map((place, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p className="font-semibold">{place.name}</p>
            <p className="text-sm text-gray-600">Distance: {place.distance}</p>
          </li>
        ));
      case "people":
        return placeholderPeople.map((person, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p className="font-semibold">{person.name}</p>
            <p className="text-sm text-gray-600">Distance: {person.distance}</p>
          </li>
        ));
      case "events":
        return placeholderEvents.map((event, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p className="font-semibold">{event.name}</p>
            <p className="text-sm text-gray-600">Distance: {event.distance}</p>
            <p className="text-sm text-gray-600">Date: {event.date}</p>
          </li>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg w-1/4 bg-white shadow-2xl absolute right-7 top-28 z-10">
      <div
        className="rounded-lg bg-white p-4 overflow-y-auto h-full flex flex-col"
        style={{ maxHeight: "80dvh" }}
      >
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border rounded"
        />
        {showSearchResults && (
          <div className="absolute top-16 left-0 right-0 bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Reviewed Places</h3>
              <ul className="mb-4">{renderPlaces(reviewedPlaces)}</ul>
              <h3 className="text-lg font-bold mb-2">Unreviewed Places</h3>
              <ul>{renderUnreviewed(nearbyGebetaSearch)}</ul>
            </div>
          </div>
        )}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${
              activeTab === "places" ? "bg-gray-700 text-white" : "bg-gray-200"
            } flex flex-col justify-center items-center`}
            onClick={() => setActiveTab("places")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="32px"
              height="32px"
              fill={activeTab === "places" ? "#fff" : "#000"}
            >
              <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152l0 270.8c0 9.8-6 18.6-15.1 22.3L416 503l0-302.6zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6l0 251.4L32.9 502.7C17.1 509 0 497.4 0 480.4L0 209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77l0 249.3L192 449.4 192 255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
            </svg>
            Places
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "people" ? "bg-gray-700 text-white" : "bg-gray-200"
            } flex flex-col justify-center items-center`}
            onClick={() => setActiveTab("people")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="32px"
              height="32px"
              fill={activeTab === "people" ? "#fff" : "#000"}
            >
              <path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7l450.6 0c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320l-189.4 0z" />
            </svg>
            People
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "events" ? "bg-gray-700 text-white" : "bg-gray-200"
            } flex flex-col justify-center items-center`}
            onClick={() => setActiveTab("events")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="32px"
              height="32px"
              fill={activeTab === "events" ? "#fff" : "#000"}
            >
              <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
            </svg>
            Events
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Nearby {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <ul className="flex-grow overflow-y-auto">{renderContent()}</ul>
      </div>
    </div>
  );
}

export default SidePanel;
