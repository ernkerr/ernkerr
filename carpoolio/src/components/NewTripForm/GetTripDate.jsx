import { useState } from "react";
import { DayPicker } from "react-day-picker";
import TripDate from "./TripDate";

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
      <button className="form-question">Set a date</button>

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
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="calendar-button"
          onClick={() => {
            formData.tripDate = "TBD";
          }}
        >
          Not sure yet
        </button>
      </div>
    </>
  );
}

//skip btn
