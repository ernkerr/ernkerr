import React, { useState } from "react";
import { setHours, setMinutes } from "date-fns";
import "./CustomizeTrip.css";

export function DepartureTime({ formData, setFormData }) {
  const [selectedTime, setSelectedTime] = useState("00:00");

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);

    // Set the selected time in formData
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedTime = setHours(setMinutes(new Date(), minutes), hours);

    setFormData({ ...formData, departureTime: newSelectedTime });
  };

  return (
    <div className="departure-time-container">
      <form style={{ marginBlockEnd: "1em" }}>
        <label>
          {" "}
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </label>
      </form>
    </div>
  );
}
