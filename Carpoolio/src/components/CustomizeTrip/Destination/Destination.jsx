import { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import "./Destination.css";

export default function Destination({ formData, setFormData }) {
  const [destination, setDestination] = useState("");
  const autocompleteRef = useRef(null); // Create a ref for the Autocomplete component

  const handleSelectedLocation = (place) => {
    const selectedPlaceName = place.name || ""; // check place name
    const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address

    // set the destination in formData to the selected place's name and address
    const tripDestination = selectedAddress
      ? `${selectedPlaceName}, ${selectedAddress}`
      : selectedPlaceName;

    setDestination(tripDestination);
    setFormData({ ...formData, destination: tripDestination });
  };

  const handleInputChange = (event) => {
    const newDestination = event.target.value;
    setDestination(newDestination);
    setFormData({ ...formData, destination: newDestination });
  };

  useEffect(() => {
    // If the autocompleteRef is available, manually set its value from state
    if (
      autocompleteRef.current &&
      autocompleteRef.current.value !== destination
    ) {
      autocompleteRef.current.value = destination;
    }
  }, [destination]); // Update the input value when the destination changes

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
        onChange={handleInputChange}
        placeholder={formData.destination || "Choose your destination"}
        className="destination-btn"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
        }}
      />
    </>
  );
}

// apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"}
