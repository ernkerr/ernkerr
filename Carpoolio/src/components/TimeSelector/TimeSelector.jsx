import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";
import "./TimeSelector.css";

export function TimeSelector({ toggleTimeSelector }) {
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
    setFormData({ ...formData, tripTime: formattedTime });
  };

  return (
    <>
      <div className="time-picker-container">
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
            setFormData({ ...formData, tripTime: "TBD" });
            toggleTimeSelector();
          }}
        >
          Not Sure Yet
        </button>
        <button
          className="calendar-button"
          id="save-btn"
          onClick={handleTimeChange}
        >
          Save
        </button>
      </div>
    </>
  );
}
