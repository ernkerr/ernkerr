import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "../../NewTripForm/Calendar.css";
import "./DateSelector.css";

export default function DateSelector({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [tripDate, setTripDate] = useState("");
  // const [tripMonth, setTripMonth] = useState("");
  // const [tripDay, setTripDay] = useState("");

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  // Handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      setFormData({ ...formData, tripDate: formattedDate });
      setIsCalendarVisible(false);
    }
  };

  // extract month and day for calendar icon
  const tripDateObj =
    formData.tripDate && formData.tripDate !== "TBD"
      ? new Date(formData.tripDate)
      : null;
  const tripMonth = tripDateObj
    ? tripDateObj.toLocaleDateString("en-US", { month: "short" })
    : ""; // Get month abbreviation
  const tripDay = tripDateObj ? tripDateObj.getDate() : "TBD"; // Get day of the month or show "TBD"

  return (
    <div className="date-selector">
      <div className="calendar-icon-container">
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="date-icon"
          onClick={toggleCalendar}
        >
          <div className="month">{tripMonth || " "}</div>
          <div className="day">{tripDay || "TBD"}</div>
        </button>
        <div className="date-text-container">
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
            className="date-text"
            onClick={toggleCalendar}
          >
            {formData.tripDate ? formData.tripDate : ""}
          </button>
          <button className="time-text">Departure Time: 9:00 AM</button>
        </div>
      </div>

      {isCalendarVisible && (
        <>
          <DayPicker
            mode="single"
            disabled={{ before: new Date() }}
            selected={selectedDate}
            onSelect={handleDateChange}
            className="day-picker"
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
            }}
          />
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
              onClick={toggleCalendar}
            >
              Okay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
