import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

export default function GetDestination({ formData, setFormData }) {
  const [destination, setDestination] = useState("");

  const handleSelectedLocation = (place) => {
    const selectedPlaceName = place.name || ""; // check place name
    const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address

    // Set the destination in formData to the selected place's name and address
    const fullAddress = selectedAddress
      ? `${selectedPlaceName}, ${selectedAddress}`
      : destination;

    setDestination(fullAddress);
    setFormData({ ...formData, destination: fullAddress });
  };

  return (
    <>
      <h4 className="form-question">Choose your destination </h4>

      <div style={{ position: "relative", marginTop: "10px" }}>
        <Autocomplete
          apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"} // API key
          onPlaceSelected={handleSelectedLocation}
          options={{
            types: ["geocode", "establishment"], // Use 'establishment' to search for businesses, museums, etc.
            fields: ["name", "formatted_address", "geometry"],
          }}
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          style={{
            fontFamily: "var(--main-font)",
            width: "100%",
            background: formData?.tripBackground?.scrim || "transparent",
            border: "var(--transparent-border)",
            borderRadius: "var(--border-radius-button)",
            height: "2vh",
          }} // Style as needed
        />
      </div>
    </>
  );
}

// apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"}
