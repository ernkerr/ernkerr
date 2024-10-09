import { useState } from "react";
import hexRgb from "hex-rgb";
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

  function handleNewCar() {
    <NewCarButton />;
  }

  const handleGlowColorChange = (event) => {
    const newGlowColor = event.target.value;
    const { red: r, green: g, blue: b } = hexRgb(newGlowColor);
    const lighterGlowColor = `rgb(${Math.min(r + 10, 255)}, ${Math.min(
      g + 10,
      255
    )}, ${Math.min(b + 10, 255)})`;

    setFormData((prevData) => ({
      ...prevData,
      glowColor: newGlowColor,
      glowColorGradient: lighterGlowColor,
    }));
  };

  return (
    <div className="customize-trip">
      <TripName formData={formData} />
      {/* <Destination /> */}
      <Destination formData={formData} setFormData={setFormData} />
      {/* <p className="customize-trip-btns">organized by: {formData.name}</p> */}
      {/* Date */}
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
      {/* set a Departure Time  */}
      <DepartureTime formData={formData} setFormData={setFormData} />
      {/* // destination 
    // countdown to trip y/n */}
      {/* set a background */}
      <TripBackground formData={formData} setFormData={setFormData} />
      {/* set the glow color  */}
      {/* <button className="customize-trip-btns"> */}
      <div className="customize-trip-btns">
        <label htmlFor="glowColor">Change Glow Color </label>
        <input
          className="glowColor"
          type="color"
          id="glowColor"
          name="glowColor"
          value={formData.glowColor || "#04aa6d"}
          onChange={handleGlowColorChange} // update the glow color on change
        />
      </div>
      {/* buttons at the bottom of page  */}
      <div className="continue-button-container">
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
          }}
          onClick={handleNewCar}
          className="glow-button"
          id="add-a-car"
        >
          add a car
        </button>
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
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
