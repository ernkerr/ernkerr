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
    <>
      <button
        className="customize-trip-btns"
        id="destination-button"
        onClick={handleButtonClick}
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          color: "#ffffff",
        }}
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
            style={{
              fontFamily: "var(--main-font)",
              width: "99%",
              background: formData?.tripBackground?.scrim || "transparent",
              border: "var(--transparent-border)",
              borderRadius: "var(--border-radius-button)",
              height: "2vh",
            }} // Style as needed
          />
        </div>
      )}
    </>
  );
}

// apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"}
