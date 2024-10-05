import { useState } from "react";
import TripName from "./TripName";
import TripDate from "./TripDate";
import "./CustomizeTrip.css";

import TripBackground from "./TripBackground"; // Import your TripBackground component

export default function CustomizeTrip({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  function handleClick() {
    // add to database
    console.log("send data to database");
  }

  return (
    <div id="customize-trip">
      <TripName formData={formData} />
      <TripBackground formData={formData} setFormData={setFormData} />{" "}
      {/* Include TripBackground */}
      {/* set a date functionality */}
      <button
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
        }}
        className="green-button"
        onClick={toggleCalendar}
      >
        {formData.tripDate ? formData.tripDate : "Set a date.."}
      </button>
      {isCalendarVisible && (
        <TripDate
          formData={formData}
          setFormData={setFormData}
          onClose={toggleCalendar}
        />
      )}
      {isCalendarVisible && (
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="green-button"
          onClick={() => {
            toggleCalendar();
            formData.tripDate = "tbd";
          }}
        >
          Not sure yet
        </button>
      )}
      <h4>{formData.name}</h4>
      {/* // destination 

    // departure time (add stops?)

    // countdown to trip y/n */}
      <button
        style={{ background: formData?.tripBackground?.scrim || "transparent" }}
        className="glow-button"
        onClick={handleClick}
      >
        continue
      </button>
    </div>
  );
}
