// Progress Bar Step 1

import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";
import bluegoo from "../../assets/bluegoo.gif";

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

  return (
    <div className="form-question-container">
      <p className="form-question">Where to?</p>
      <Destination onDestinationUpdate={handleDestinationUpdate} />

      {isDestinationSet && (
        <>
          <p className="form-question">What should we call it?</p>
          <TripName onTripNameUpdate={handleTripNameUpdate} />
        </>
      )}

      {isTripNameSet && (
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
