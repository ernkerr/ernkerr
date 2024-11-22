import { useContext } from "react";
import { TripContext } from "@components/TripContext";

export default function NumSeats({ onUpdate, activeCarIndex }) {
  const { formData, setFormData } = useContext(TripContext);

  const handleSliderChange = (event) => {
    const newNumSeats = Number(event.target.value);

    // set the num seats for the specific car using activeCarIndex
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars]; // copy cars array
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        numSeats: newNumSeats,
      };
      return { ...formData, numSeats: newNumSeats };
    });
    onUpdate(newNumSeats);
  };

  const numSeats = formData?.cars?.[activeCarIndex]?.numSeats;

  return (
    <>
      <p className="form-question">number of avaliable seats: {numSeats}</p>

      <input
        type="range"
        min="0"
        max="12"
        value={numSeats || ""}
        onChange={handleSliderChange}
        className="numSeatsSlider"
        id="numSeatRange"
        name="numSeatRange"
      />
    </>
  );
}
