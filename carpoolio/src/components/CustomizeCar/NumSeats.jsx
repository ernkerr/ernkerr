import "./CustomizeCar.css";

export default function NumSeats({ formData, setFormData }) {
  const handleSliderChange = (event) => {
    const newNumSeats = Number(event.target.value);
    setFormData({ ...formData, numSeats: newNumSeats });
  };

  return (
    <>
      <label htmlFor="numSeatRange" className="custom-car-option">
        number of available seats: {formData.numSeats}
      </label>

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
        className="numSeatsSlider"
        id="numSeatRange"
        name="numSeatRange"
      />
    </>
  );
}
