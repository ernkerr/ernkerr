import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "../NewTripForm/NewTripForm.css";
import "../NewTripForm/TripDate.css";

export default function GetTripDate({ formData, setFormData }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      setFormData({ ...formData, tripDate: formattedDate }); // Update formData with date
    }
  };

  return (
    <>
      <h4 className="form-question">
        {formData.tripDate ? formData.tripDate : "Set a date"}
      </h4>

      <div className="calendar-container">
        <DayPicker
          mode="single"
          disabled={{ before: new Date() }}
          selected={selectedDate}
          onSelect={handleDateChange}
          className="calendar"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
        />
      </div>

      <button
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
        }}
        className="not-sure-btn"
        onClick={() => {
          setFormData({ ...formData, tripDate: "TBD" }); // Correctly update formData
          setSelectedDate(null); // Clear selected date in the calendar if needed
        }}
      >
        Not sure yet
      </button>
    </>
  );
}

//skip btn
