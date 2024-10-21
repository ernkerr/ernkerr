import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "./Calendar.css";

export default function TripDate({
  formData,
  setFormData,
  onClose,
  onDateChange,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date change
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

      onDateChange({ formattedDate, month, day }); // pass these values up to the parent
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
