import { useState } from "react";
import TripDate from "../../NewTripForm/TripDate.jsx";
import "./DateSelector.css";

export default function DateSelector({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [tripDate, setTripDate] = useState("");
  const [tripMonth, setTripMonth] = useState("");
  const [tripDay, setTripDay] = useState("");

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  // Handle date change
  const handleDateChange = ({ formattedDate, month, day }) => {
    setTripDate(formattedDate);
    setTripMonth(month);
    setTripDay(day);
    setFormData({ ...formData, tripDate: formattedDate });
  };

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
          <div className="time-text">Departure Time: 9:00 AM</div>
        </div>
      </div>

      {isCalendarVisible && (
        <>
          <TripDate
            formData={formData}
            setFormData={setFormData}
            onDateChange={handleDateChange}
            onClose={toggleCalendar}
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
