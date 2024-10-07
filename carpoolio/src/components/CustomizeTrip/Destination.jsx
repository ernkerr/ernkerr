import { add } from "date-fns";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

export default function Destination({ formData, setFormData }) {
  const [address, setAddress] = useState();
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);

  const handleSelectedLocation = (place) => {
    const selectedAddress = place.formatted_address;
    setAddress(selectedAddress);
    setFormData({ ...formData, destination: selectedAddress });
    setIsAutocompleteVisible(false);
  };

  const handleButtonClick = () => {
    setIsAutocompleteVisible((prev) => !prev);
  };

  return (
    <div>
      <button
        className="green-button"
        onClick={handleButtonClick}
        style={{ background: formData?.tripBackground?.scrim || "transparent" }}
      >
        {address || "Set a destination"}
      </button>

      {/* Show the Autocomplete component only when visible */}
      {isAutocompleteVisible && (
        <div style={{ position: "relative", marginTop: "10px" }}>
          <Autocomplete
            apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"} // Replace with your valid API key
            onPlaceSelected={handleSelectedLocation}
            options={{
              types: ["address"],
              fields: ["formatted_address", "geometry"],
            }}
            style={{ width: "45%" }} // Style as needed
          />
        </div>
      )}
    </div>
  );
}

// apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"}
