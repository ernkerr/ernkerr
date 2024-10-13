import React, { useState } from "react";
import "./CustomizeTrip.css";
import "./DepartureTime.css";

export function DepartureTime({ formData, setFormData }) {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM"); // Default period is AM
  const [isTimeSet, setIsTimeSet] = useState(true);

  const handleTimeChange = () => {
    setIsTimeSet(true);
    const formattedTime = `${hour}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    setFormData({ ...formData, departureTime: formattedTime });
  };

  const handleHourChange = (e) => setHour(parseInt(e.target.value));
  const handleMinuteChange = (e) => setMinute(parseInt(e.target.value));
  const handlePeriodChange = (e) => setPeriod(e.target.value);

  return (
    <
      // style={{
      //   background: formData?.tripBackground?.scrim || "transparent",
      // }}
    >
      {isTimeSet ? (
        // Display the confirmed time and make it clickable for editing
        <button
          className="customize-trip-btns"
          onClick={() => setIsTimeSet(false)} // Clicking allows editing
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
        >
          {`${hour}:${minute.toString().padStart(2, "00")} ${period}`}
        </button>
      ) : (
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
                <option value="" disabled selected>
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
                <option value="" disabled selected>
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
              className="confirm-button"
              onClick={handleTimeChange}
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
            >
              okay
            </button>
          </>
        </div>
      )}
    </>
  );
}
