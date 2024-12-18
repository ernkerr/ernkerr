import { useContext, useState, useRef } from "react";
import { TripContext } from "@components/TripContext";
import Destination from "@components/Destination/Destination.jsx";
import TripName from "../TripName";
import DateSelector from "@components/DateSelector/DateSelector";
import Description from "@components/Description/Description.jsx";
import "./NewEvent.css";

export default function NewEvent({ onNext }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isDestinationSet, setIsDestinationSet] = useState(false); // state to track if destination is set
  const [isTripNameSet, setIsTripNameSet] = useState(false);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const destinationRef = useRef(null); // returns an object with a .current property, which initially is null
  // once we attach it to a specific element (ex:<input>) React fills .current with a reference to that element
  // by accessing .current you can call any method (like .focus()) on the referenced element (tripdestination)

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

  // show date and description
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
    <div className="new-event-container">
      <TripName
        onTripNameUpdate={handleTripNameUpdate}
        onKeyDown={handleKeyDown}
      />

      {(isTripNameSet || formData?.tripName) && (
        <>
          <Destination
            ref={destinationRef}
            onDestinationUpdate={handleDestinationUpdate}
          />
        </>
      )}

      {(isDestinationSet || formData?.destination) && (
        <>
          <button
            className={`more-options-btn ${isShowingOptions ? "active" : ""}`}
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
          <button className="tertiary-btn" id="skip-btn" onClick={onNext}>
            Skip
          </button>
        </>
      )}
    </div>
  );
}
