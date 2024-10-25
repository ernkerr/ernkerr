import React, { useState } from "react";
import "../CustomizeTrip.css";
import "./TimeSelector.css";

export function TimeSelector({ formData, setFormData, toggleTimeSelector }) {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM"); // Default period is AM

  const handleTimeChange = () => {
    toggleTimeSelector(); // Hide the time selector after setting the time
    const formattedTime = `${hour}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    setFormData({ ...formData, departureTime: formattedTime });
  };

  const handleHourChange = (e) => setHour(parseInt(e.target.value));
  const handleMinuteChange = (e) => setMinute(parseInt(e.target.value));
  const handlePeriodChange = (e) => setPeriod(e.target.value);

  return (
    <>
      <div className="time-picker-container">
        <div className="time-column">
          <div className="scrollable">
            <select
              value={hour}
              onChange={handleHourChange}
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
            >
              <option value="" disabled>
                Hours
              </option>
              {[...Array(12).keys()].map((h) => (
                <option key={h + 1} value={h + 1}>
                  {h + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="time-column">
          <div className="scrollable">
            <select
              value={minute}
              onChange={handleMinuteChange}
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
            >
              <option value="" disabled>
                Minutes
              </option>
              {[...Array(12).keys()].map((m) => (
                <option key={m * 5} value={m * 5}>
                  {(m * 5).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="time-column">
          <div className="scrollable">
            <select
              value={period}
              onChange={handlePeriodChange}
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <>
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className="time-calendar-button"
            onClick={handleTimeChange}
          >
            Okay
          </button>
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className="time-calendar-button"
            onClick={() => {
              formData.departureTime = "TBD";
              toggleTimeSelector(); // Hide the time selector
            }}
          >
            Not sure yet
          </button>
        </>
      </div>
    </>
  );
}
