import { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";

export default function Destination({ formData, setFormData }) {
  const [destination, setDestination] = useState("");
  const [location, setLocation] = useState(null);
  const autocompleteRef = useRef(null); // Create a ref for the Autocomplete component

  const handleSelectedLocation = (place) => {
    const selectedPlaceName = place.name || ""; // check place name
    const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address
    const selectedLocation = place.geometry?.location; // Get lat/lng if available

    // set the destination in formData to the selected place's name and address
    const tripDestination = selectedAddress
      ? `${selectedPlaceName}, ${selectedAddress}`
      : selectedPlaceName;

    setDestination(tripDestination);
    setFormData({ ...formData, destination: tripDestination });

    // location data for map
    if (selectedLocation) {
      setLocation({
        lat: selectedLocation.lat(),
        lng: selectedLocation.lng(),
      });
    }
  };

  // handle places without an address
  const handleChange = (event) => {
    const value = event.target.value;
    setDestination(value);
    setFormData({ ...formData, destination: value }); // Update form data with typed value
  };

  useEffect(() => {
    // Sync input value with destination
    if (
      autocompleteRef.current &&
      autocompleteRef.current.value !== destination
    ) {
      autocompleteRef.current.value = destination;
    }
  }, [destination]);

  return (
    <>
      <Autocomplete
        apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"} // API key
        onPlaceSelected={handleSelectedLocation}
        options={{
          types: ["geocode", "establishment"], // use 'establishment' to search for businesses, museums, etc.
          fields: ["name", "formatted_address", "geometry"],
        }}
        value={destination}
        onChange={handleChange}
        placeholder={formData.destination || "Choose your destination"}
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          color: "white",
        }}
      />

      {location && (
        <div className="map">
          <iframe
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAjYJexrKl-byyNcP9kEwmsi3OzPHcEtng&q=${location.lat},${location.lng}`}
            allowFullScreen
          />
        </div>
      )}
      <div className="place-info">
        <h3>{destination.split(",")[0]}</h3>
        <p>{destination.split(",").slice(1).join(", ")}</p>
      </div>
    </>
  );
}
