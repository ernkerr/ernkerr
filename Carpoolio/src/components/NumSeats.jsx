import { useContext } from "react";
import { TripContext } from "@components/TripContext";

export default function NumSeats({ onUpdate }) {
  const { formData, setFormData } = useContext(TripContext);
  // const [numSeats, setNumSeats] = useState("");

  const handleSliderChange = (event) => {
    const newNumSeats = Number(event.target.value);
    setFormData({ ...formData, numSeats: newNumSeats });
    onUpdate(newNumSeats);
  };

  return (
    <>
      <p className="form-question">Number of seats: {formData.numSeats}</p>

      <input
        type="range"
        min="0"
        max="12"
        value={formData.numSeats || ""}
        onChange={handleSliderChange}
        className="numSeatsSlider"
        id="numSeatRange"
        name="numSeatRange"
      />
    </>
  );
}

// check activeCarIndex is valid and update car data

// update numSeat to be responsive to changes in numSeat outside of component

// import { useContext } from "react";
// import { TripContext } from "@components/TripContext";

// export default function NumSeats({ onUpdate, activeCarIndex }) {
//   const { formData, setFormData } = useContext(TripContext);

//   const handleSliderChange = (event) => {
//     const newNumSeats = Number(event.target.value);

//     // Update the numSeats for the specific active car using activeCarIndex
//     setFormData((prevData) => {
//       const updatedCars = [...prevData.cars]; // Copy cars array
//       updatedCars[activeCarIndex] = {
//         ...updatedCars[activeCarIndex],  // Keep other car properties unchanged
//         numSeats: newNumSeats,  // Update numSeats for the active car
//       };
//       return { ...prevData, cars: updatedCars };  // Return updated formData
//     });

//     // Optional: Trigger the onUpdate callback if you want to notify parent component
//     onUpdate(newNumSeats);
//   };

//   // Get the numSeats for the active car
//   const numSeats = formData?.cars?.[activeCarIndex]?.numSeats || 0;

//   return (
//     <>
//       <p className="form-question">Number of seats: {numSeats}</p>

//       <input
//         type="range"
//         min="0"
//         max="12"
//         value={numSeats}
//         onChange={handleSliderChange}
//         className="numSeatsSlider"
//         id="numSeatRange"
//         name="numSeatRange"
//       />
//     </>
//   );
// }
