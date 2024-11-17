import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";

export default function NumSeats({ onUpdate }) {
  const { formData, setFormData } = useContext(TripContext);
  const [numSeats, setNumSeats] = useState(null);

  const handleSliderChange = (event) => {
    const newNumSeats = Number(event.target.value);
    setFormData({ ...formData, numSeats: newNumSeats });
    setNumSeats(newNumSeats);
  };

  return (
    <>
      <p className="form-question">Number of seats: {formData.numSeats}</p>
      {/* <label htmlFor="numSeatRange" className="custom-car-option">
        number of avaliable seats: {formData.numSeats}
      </label> */}

      <input
        type="range"
        min="0"
        max="12"
        value={formData.numSeats || null}
        onChange={handleSliderChange}
        className="numSeatsSlider"
        id="numSeatRange"
        name="numSeatRange"
      />
    </>
  );
}
