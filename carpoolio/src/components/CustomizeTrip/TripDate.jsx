import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "./TripDate.css";

export default function TripDate({ formData, setFormData, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date); // Set selected date

      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      setFormData({ ...formData, tripDate: formattedDate }); // Update formData with date
      onClose(); // Call onClose to hide calendar
    }
  };

  return (
    <DayPicker
      mode="single"
      disabled={{ before: new Date() }}
      selected={selectedDate}
      onSelect={handleDateChange}
      className="day-picker"
      style={{ background: formData?.tripBackground?.scrim || "transparent" }}
    />
  );
}
