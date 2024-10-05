import { useState } from "react";
import TripName from "./TripName";
import TripDate from "./TripDate";
import "./CustomizeTrip.css";

import TripBackground from "./TripBackground"; // Import your TripBackground component
import { DepartureTime } from "./DepartureTime";

export default function CustomizeTrip({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isDepartureTimeVisible, setIsDepartureTimeVisible] = useState(false); // State for showing the DepartureTime

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const toggleDepartureTime = () => {
    setIsDepartureTimeVisible((prev) => !prev); // Toggle the visibility of the time picker
  };

  function handleClick() {
    // add to database
    console.log("send data to database");
  }

  return (
    <div id="customize-trip">
      <TripName formData={formData} />
      {/* Include TripBackground */}
      <TripBackground formData={formData} setFormData={setFormData} />{" "}
      {/* Date */}
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
            formData.tripDate = "TBD";
          }}
        >
          Not sure yet
        </button>
      )}
      <h4>{formData.name}</h4>
      {/* Departure Time  */}
      {isCalendarVisible && (
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="green-button"
          onClick={toggleDepartureTime} // Toggle time picker on click
        >
          Add a departure time
        </button>
      )}
      {/* Render DepartureTime if it's visible */}
      {isCalendarVisible && isDepartureTimeVisible && (
        <DepartureTime formData={formData} setFormData={setFormData} />
      )}
      {/* // destination 

    // departure time (add stops?)
          {isCalendarVisible && (
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="green-button"
          onClick={() => {
            toggleCalendar();
            formData.tripDate = "TBD";
          }}
        >
          Not sure yet
        </button>
      )}

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
