import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";
import "./TimeSelector.css";

// pass onTimeChange function as a prop to update tripTime in DateSelector or departureTime in CarDetails
// this callback function gets called when the use selects a time and allows the parent component to update it's state

// pass toggleTimeSelector in so that when selecting a time, or setting it to tbd, the function can be called to close the modal
export function TimeSelector({ toggleTimeSelector, onTimeChange }) {
  const { formData, setFormData } = useContext(TripContext);
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM"); // Default period is AM

  const hours = ["", ...Array.from({ length: 12 }, (_, i) => i + 1), "", ""];
  const minutes = ["", ...Array.from({ length: 12 }, (_, i) => i * 5), "", ""];
  const periods = ["", "AM", "PM", "", ""];

  const updateSelectedValue = (e, setValue, array) => {
    const itemHeight = 40; // Height of each item in pixels
    const offset = 1; // Offset to select the second visible item
    const scrollPosition = Math.round(e.target.scrollTop / itemHeight);

    // Adjust the index with the offset
    const index =
      (((scrollPosition + offset) % array.length) + array.length) %
      array.length;
    setValue(array[index]);
  };

  const handleTimeChange = () => {
    toggleTimeSelector(); // hide the time selector after setting the time
    const formattedTime = `${hour}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    onTimeChange(formattedTime); // call the callback function to update the time
  };

  return (
    <>
      <div className="time-picker-container">
        {/* Time selection columns */}
        <div
          className="time-column"
          onScroll={(e) => updateSelectedValue(e, setHour, hours)}
        >
          {hours.map((h, i) => (
            <div
              key={i}
              className={`time-option ${hour === h ? "selected" : ""}`}
            >
              {h}
            </div>
          ))}
        </div>
        <div
          className="time-column"
          onScroll={(e) => updateSelectedValue(e, setMinute, minutes)}
        >
          {minutes.map((m, i) => (
            <div
              key={i}
              className={`time-option ${minute === m ? "selected" : ""}`}
            >
              {m !== "" ? m.toString().padStart(2, "0") : ""}
            </div>
          ))}
        </div>
        <div
          className="time-column"
          onScroll={(e) => updateSelectedValue(e, setPeriod, periods)}
        >
          {periods.map((p, i) => (
            <div
              key={i}
              className={`time-option ${period === p ? "selected" : ""}`}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      <div className="time-calendar-button-container">
        <button
          className="calendar-button"
          onClick={() => {
            onTimeChange("TBD"); // pass tbd when not sure
            toggleTimeSelector();
          }}
        >
          Not Sure Yet
        </button>
        <button
          className="calendar-button"
          id="save-btn"
          onClick={handleTimeChange}
          style={{
            background:
              formData?.tripBackground?.scrim || formData?.transparentGlowColor,
            border: ` 2px solid ${formData?.glowColor}`,
            boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
