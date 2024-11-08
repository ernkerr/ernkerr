import { useState, useEffect, useRef, useContext } from "react";
import Autocomplete from "react-google-autocomplete";
import { TripContext } from "@components/TripContext";
import "./Destination.css";

export default function Destination({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext);
  const [destination, setDestination] = useState(formData?.destination || "");
  const autocompleteRef = useRef(null); // create a ref for the Autocomplete component

  // handle the location selection fromthe autocomplete
  const handleSelectedLocation = (place) => {
    if (!isPreviewingTrip) {
      const selectedPlaceName = place.name || ""; // check place name
      const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address
      const tripDestination = selectedAddress.includes(selectedPlaceName) // only include the address if it doesn't already contain the place name
        ? selectedAddress
        : `${selectedPlaceName}, ${selectedAddress}`;

      setDestination(tripDestination);
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: tripDestination,
      }));
    }
  };

  // handle manual input changes
  const handleInputChange = (event) => {
    if (!isPreviewingTrip) {
      const newDestination = event.target.value;
      setDestination(newDestination);
      setFormData((prevFormData) => ({
        ...prevFormData,
        destination: newDestination,
      }));
    }
  };

  // update the input field value based on state changes
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
          types: ["geocode", "establishment"], // establishment to search for businesses, museums, etc.
          fields: ["name", "formatted_address", "geometry"],
        }}
        value={destination}
        onChange={handleInputChange}
        placeholder={destination ? destination : "Choose your destination"}
        className="destination"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: isPreviewingTrip
            ? "2px solid transparent"
            : "2px solid rgba(255, 255, 255, 0.182)",
          borderRadius: isPreviewingTrip ? "0" : "5px",
          pointerEvents: isPreviewingTrip ? "none" : "auto", // Prevent interaction in preview mode
        }}
      />
    </>
  );
}
