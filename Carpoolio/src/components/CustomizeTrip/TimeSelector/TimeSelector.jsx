import React, { useState } from "react";
import "../CustomizeTrip.css";
import "./TimeSelector.css";

export function TimeSelector({ formData, setFormData }) {
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
        <button
          className="customize-trip-btns"
          onClick={() => setIsTimeSet(false)} // Clicking allows editing
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
        >
          Edit departure time
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
            <div className="time-button-container">
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                }}
                className="time-calendar-button"
                onClick={() => {
                  formData.departureTime = "TBD";
                }}
              >
                Not sure yet
              </button>
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                }}
                className="time-calendar-button"
                onClick={handleTimeChange}
              >
                Okay
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
}
