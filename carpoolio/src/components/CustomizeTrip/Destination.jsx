import { useState } from "react";
import Autocomplete from "react-google-autocomplete";

export default function Destination({ formData, setFormData }) {
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState();
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
  const [customDestination, setCustomDestination] = useState("");

  const handleSelectedLocation = (place) => {
    const selectedPlaceName = place.name || ""; // check place name
    const selectedAddress = place.formatted_address || ""; // check if the place has a formatted address

    selectedPlaceName(selectedPlaceName);
    setAddress(selectedAddress);

    if (selectedAddress) {
      // use place name if there is no address
      setFormData({
        ...formData,
        destination: `${selectedPlaceName}, ${selectedAddress}`,
      });
    } else {
      setFormData({ ...formData, destination: selectedPlaceName });
    }
    setIsAutocompleteVisible(false); // hide autocomplete
  };

  //handle manual destination input
  const handleCustomLocation = () => {
    setFormData({ ...formData, destination: customDestination });
    setAddress(customDestination); // set manual input as address
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
        {placeName || "Set a destination"}
      </button>

      {/* Show the Autocomplete component only when visible */}
      {isAutocompleteVisible && (
        <div style={{ position: "relative", marginTop: "10px" }}>
          <Autocomplete
            apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"} // API key
            onPlaceSelected={handleSelectedLocation}
            options={{
              types: ["geocode", "establishment"], // Use 'establishment' to search for businesses, museums, etc.
              fields: ["name", "formatted_address", "geometry"],
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

          {/* Manual input for places without a known address */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter place name"
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              style={{
                fontFamily: "var(--main-font)",
                width: "99%",
                background: formData?.tripBackground?.scrim || "transparent",
                border: "var(--transparent-border)",
                borderRadius: "var(--border-radius-button)",
                height: "2vh",
                marginBottom: "10px",
              }}
            />
            <button
              className="customize-trip-btns"
              onClick={handleCustomDestinationSubmit}
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
                color: "#ffffff",
              }}
            >
              Set Custom Destination
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// apiKey={"AIzaSyAjYJexrKl - byyNcP9kEwmsi3OzPHcEtng"}
