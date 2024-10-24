import { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";

export default function GetDestination({ formData, setFormData }) {
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

  // Handle user typing in the field
  const handleChange = (event) => {
    const value = event.target.value;
    setDestination(value);
    setFormData({ ...formData, destination: value }); // Update form data with typed value
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
      <h4 className="form-question">Choose your destination </h4>

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
          className="text-input"
        />
      </>
    </>
  );
}
