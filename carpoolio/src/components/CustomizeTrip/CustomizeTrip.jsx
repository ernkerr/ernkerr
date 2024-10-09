import { useState } from "react";
import TripName from "./TripName";
import TripDate from "./TripDate";
import { DepartureTime } from "./DepartureTime";
import Destination from "./Destination";
import TripBackground from "./TripBackground";
import NewCarButton from "../NewCarButton/NewCarButton.jsx";
import "./CustomizeTrip.css";

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
      {/* <Destination /> */}
      <Destination formData={formData} setFormData={setFormData} />
      {/* <p className="customize-trip-btns">organized by: {formData.name}</p> */}
      {/* Date */}
      {/* Date and Time Container */}
      <>
        <button className="customize-trip-btns" onClick={toggleCalendar}>
          <span
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
          >
            {formData.tripDate ? formData.tripDate : "Set a date"}
          </span>
        </button>
        {/* show calendar  */}
        {isCalendarVisible && (
          <TripDate
            formData={formData}
            setFormData={setFormData}
            onClose={toggleCalendar}
          />
        )}
        {/* calendar buttons */}
        {isCalendarVisible && (
          <div className="calendar-button-container">
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className="calendar-button"
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
              className="calendar-button"
              onClick={() => {
                toggleCalendar();
              }}
            >
              okay
            </button>
          </div>
        )}
      </>
      {/* Departure Time  */}
      <DepartureTime formData={formData} setFormData={setFormData} />
      {/* // destination 
    // countdown to trip y/n */}
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
      <NewCarButton />
    </div>
  );
}
