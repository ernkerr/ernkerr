// import React, { useState } from "react";
import "./CustomizeCar.css";

export default function NumSeats({ formData, setFormData }) {
  // const [numSeats, setNumSeats] = useState(0);

  const handleSliderChange = (event) => {
    const newNumSeats = Number(event.target.value);
    setFormData({ ...formData, numSeats: newNumSeats });
  };

  return (
    <>
      <h4 className="form-question">
        number of avaliable seats: {formData.numSeats}
      </h4>

      <input
        style={{
          background: formData?.glowColor || "transparent",
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
        type="range"
        min="0"
        max="10"
        value={formData.numSeats}
        onChange={handleSliderChange}
        className="slider"
        id="myRange"
      />
    </>
  );
}
