import { useContext, useState, useRef } from "react";
import { TripContext } from "@components/TripContext";
// import { LoadScript } from "@react-google-maps/api"; // Assuming you use this package

import Destination from "@components/Destination/Destination.jsx";
import TripName from "../TripName";
import DateSelector from "@components/DateSelector/DateSelector";
import Description from "@components/Description/Description.jsx";

import "./NewEvent.css";

export default function NewEvent({ onNext, onDestinationUpdate }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isDestinationSet, setIsDestinationSet] = useState(false); // state to track if destination is set
  const [isTripNameSet, setIsTripNameSet] = useState(false);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const destinationRef = useRef(null); // returns an object with a .current property, which initially is null
  // once we attach it to a specific element (ex:<input>) React fills .current with a reference to that element
  // by accessing .current you can call any method (like .focus()) on the referenced element (tripdestination)

  const googleMapsApiKey = import.meta.env.VITE_GMAPS_API_KEY;
  //   const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)
  //   const markerPosition = { lat: 37.7749, lng: -122.4194 };

  // update state when tripName is set
  const handleTripNameUpdate = (tripName) => {
    if (tripName) {
      setIsTripNameSet(true);
    }
  };

  // update state when destination is set
  const handleDestinationUpdate = (destination) => {
    if (destination) {
      setIsDestinationSet(true);
    }
  };

  //   const handleDestinationUpdate = ({ value, location }) => {
  //     if (value && location) {
  //       setIsDestinationSet(true);
  //     }
  //   };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };

  // handle key press events
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`Event Key Passed to parent = ${event.key}`);
      event.preventDefault();
      if (destinationRef.current) {
        destinationRef.current.focus();
      }
    }
  };

  return (
    <div className="form-question-container">
      <TripName
        onTripNameUpdate={handleTripNameUpdate}
        onKeyDown={handleKeyDown}
      />

      {(isTripNameSet || formData?.tripName) && (
        <>
          {/* <LoadScript googleMapsApiKey={googleMapsApiKey}> */}
          <Destination
            ref={destinationRef}
            onDestinationUpdate={handleDestinationUpdate}
          />
          {/* </LoadScript> */}
        </>
      )}

      {(isDestinationSet || formData?.destination) && (
        <>
          <button
            className={`secondary-btn ${isShowingOptions ? "active" : ""}`}
            id="more-options-btn"
            onClick={handleMoreOptions}
          >
            More options +{" "}
          </button>
        </>
      )}

      {isShowingOptions && (
        <>
          <div className="date-selector-new-event ">
            <DateSelector />
          </div>
          <Description />
          <button className="tertiary-btn" onClick={onNext}>
            Skip
          </button>
        </>
      )}
    </div>
  );
}
