import { useContext, useState, useRef } from "react";
import { TripContext } from "@components/TripContext";

import Destination from "@components/Destination.jsx";
import TripName from "../TripName";
import DateSelector from "@components/DateSelector/DateSelector";
import Description from "@components/Description/Description";

import "./NewEvent.css";

export default function NewEvent() {
  const { formData, setFormData } = useContext(TripContext);
  const [isDestinationSet, setIsDestinationSet] = useState(false); // state to track if destination is set
  const [isTripNameSet, setIsTripNameSet] = useState(false);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const tripNameRef = useRef(null); // returns an object with a .current property, which initially is null
  // once we attach it to a specific element (ex:<input>) React fills .current with a reference to that element
  // by accessing .current you can call any method (like .focus()) on the referenced element (tripName)

  // update state when destination is set
  const handleDestinationUpdate = (destination) => {
    if (destination) {
      setIsDestinationSet(true);
    }
  };

  const handleTripNameUpdate = (tripName) => {
    if (tripName) {
      setIsTripNameSet(true);
    }
  };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };

  // handle key press events
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`Event Key Passed to parent = ${event.key}`);
      event.preventDefault();

      if (tripNameRef.current) {
        tripNameRef.current.focus();
      }
    }
  };

  return (
    <div className="form-question-container">
      <p className="form-question">Where to?</p>
      <Destination
        onDestinationUpdate={handleDestinationUpdate}
        onKeyDown={handleKeyDown}
      />

      {(isDestinationSet || formData?.destination) && (
        <>
          <p className="form-question">What should we call it?</p>
          <TripName ref={tripNameRef} onTripNameUpdate={handleTripNameUpdate} />
        </>
      )}

      {(isTripNameSet || formData?.tripName) && (
        <>
          <button
            className={`secondary-btn ${isShowingOptions ? "active" : ""}`}
            onClick={handleMoreOptions}
          >
            More options +{" "}
          </button>
        </>
      )}

      {isShowingOptions && (
        <>
          <DateSelector />
          <Description />
        </>
      )}
    </div>
  );
}
