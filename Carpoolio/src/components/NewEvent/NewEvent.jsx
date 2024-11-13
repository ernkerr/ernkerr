// Progress Bar Step 1

import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";
import bluegoo from "../../assets/bluegoo.gif";

import Destination from "@components/Destination.jsx";
import TripName from "../TripName";

import "./NewEvent.css";

export default function NewEvent() {
  const { formData, setFormData } = useContext(TripContext);
  const [isDestinationSet, setIsDestinationSet] = useState(false); // state to track if destination is set

  // update state when destination is set
  const handleDestinationUpdate = (destination) => {
    if (destination) {
      setIsDestinationSet(true);
    }
  };

  return (
    <div className="form-question-container">
      <p className="form-question">Where to?</p>
      <Destination onDestinationUpdate={handleDestinationUpdate} />

      {isDestinationSet && (
        <>
          <p className="form-question">What to call it?</p>
          <TripName />
        </>
      )}
    </div>
  );
}
