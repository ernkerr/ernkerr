import React, { useState } from "react";
import "./CustomizeCar.css";

export default function NumSeats() {
  const [numSeats, setNumSeats] = useState(0);

  const handleSliderChange = (event) => {
    setNumSeats(event.target.value);
  };

  return (
    <>
      <h4 className="form-question">number of avaliable seats: {numSeats}</h4>

      <input
        type="range"
        min="0"
        max="10"
        value={numSeats}
        onChange={handleSliderChange}
        className="slider"
        id="myRange"
      />
    </>
  );
}
