import { useState, useContext } from "react";
import { DayPicker } from "react-day-picker";
import { TripContext } from "@components/TripContext";
import "../NewTripForm/NewTripForm.css";
import "../NewTripForm/Calendar.css";

export default function GetTripDate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { formData, setFormData } = useContext(TripContext);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      // Extract month and day separately
      const month = date.toLocaleDateString("en-US", { month: "short" }); // Get month abbreviation
      const day = date.getDate(); // Get day of the month

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      setFormData({ ...formData, tripDate: formattedDate }); // Update formData with date
    }
  };

  function handleNotSureYet() {
    setFormData({ ...formData, tripDate: "TBD" }); // Correctly update formData
    setSelectedDate(null); // Clear selected date in the calendar if needed
  }

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
        onClick={handleNotSureYet}
      >
        Not sure yet
      </button>
    </>
  );
}

//skip btn
