import { useState, useEffect, useRef, useContext } from "react";
import Autocomplete from "react-google-autocomplete";
import { TripContext } from "@components/TripContext";

export default function Destination({ isPreviewingTrip, onDestinationUpdate }) {
  const { formData, setFormData } = useContext(TripContext);
  const [destination, setDestination] = useState(formData?.destination || "");
  const [isManualEntry, setIsManualEntry] = useState(false);
  const lastManualValue = useRef("");
  const autocompleteRef = useRef(null); // create a ref for the Autocomplete component

  // handle the location selection from the autocomplete
  const handleSelectedLocation = (place) => {
    if (!isPreviewingTrip) {
      const selectedPlaceName = place.name || ""; // check place name
      const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address
      const tripDestination = selectedAddress.includes(selectedPlaceName) // only include the address if it doesn't already contain the place name
        ? selectedAddress
        : `${selectedPlaceName}, ${selectedAddress}`;

      setIsManualEntry(false);
      setDestination(tripDestination);
      updateFormData(tripDestination);
    }
  };

  // handle manual input changes
  const handleInputChange = (event) => {
    if (!isPreviewingTrip) {
      const newDestination = event.target.value;

      setIsManualEntry(true);
      setDestination(newDestination);
      updateFormData(newDestination);
    }
  };

  // handle key press events
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isManualEntry) {
        setDestination(lastManualValue.current);
        updateFormData(lastManualValue.current); // use the last manual value instead of letting Google format it
        autocompleteRef.current?.blur(); // remove focus from the input
      }
    }
  };

  // update form data and send to parent
  const updateFormData = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      destination: value,
    }));

    if (onDestinationUpdate) {
      onDestinationUpdate(value);
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
        ref={autocompleteRef}
        value={destination}
        onChange={handleInputChange}
        placeholder={destination ? destination : "Choose your destination"}
        // className="destination"
        className="form-response"
        id="destination"
        style={{
          // background: formData?.tripBackground?.scrim || "transparent",
          // borderRadius: isPreviewingTrip ? "0" : "5px",
          pointerEvents: isPreviewingTrip ? "none" : "auto", // Prevent interaction in preview mode
        }}
      />
    </>
  );
}
