import { useState } from "react";
import TripName from "./TripName";
import TripDate from "./TripDate";
import "./CustomizeTrip.css";

import TripBackground from "./TripBackground";
import { DepartureTime } from "./DepartureTime";
import Destination from "./Destination";

export default function CustomizeTrip({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  function handleClick() {
    // add to database
    console.log("send data to database");
    console.log(formData);
  }

  return (
    <div className="customize-trip">
      <TripName formData={formData} />
      {/* Date */}
      {/* Date and Time Container */}
      <div className="date-container">
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="green-button"
          onClick={toggleCalendar}
        >
          {formData.tripDate ? formData.tripDate : "Set a date"}
        </button>
        {/* Calendar buttons */}
        {isCalendarVisible && (
          <TripDate
            formData={formData}
            setFormData={setFormData}
            onClose={toggleCalendar}
          />
        )}
        {isCalendarVisible && (
          <div className="calendar-buttons">
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className="green-button"
              id="not-sure-yet"
              onClick={() => {
                toggleCalendar();
                formData.tripDate = "TBD";
              }}
            >
              Not sure yet
            </button>
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className="green-button"
              id="not-sure-yet"
              onClick={() => {
                toggleCalendar();
              }}
            >
              okay
            </button>
          </div>
        )}
      </div>
      {/* Departure Time  */}
      <DepartureTime formData={formData} setFormData={setFormData} />
      {/* <Destination /> */}
      <Destination formData={formData} setFormData={setFormData} />
      {/* // destination 
    // countdown to trip y/n */}
      {/* (add stops?) */}
      {/* Include TripBackground */}
      <TripBackground formData={formData} setFormData={setFormData} />{" "}
      <div className="continue-button-container">
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="glow-button"
          onClick={handleClick}
        >
          continue
        </button>
      </div>
    </div>
  );
}
