import DefaultCar from "../CustomizeCar/DefaultCar";
import "./RenderCar.css";
import EditCar from "./EditCar";
import { useState } from "react";

export default function RenderCar({
  car,
  carIndex,
  formData,
  setFormData,
  setIsCustomizingCar,
  setActiveCarIndex,
}) {
  console.log("render car");

  const handleSeatClick = (row, carIndex, seatIndex, event) => {
    const newCars = [...formData.cars]; // Create a copy of cars array
    const newSeatNames = { ...newCars[carIndex].seatNames }; // Access the seat names of the specific car
    newSeatNames[row][seatIndex] = event.target.value; // Update the specific seat name in the row
    newCars[carIndex].seatNames = newSeatNames; // Update the seat names in the specific car object
    setFormData({ ...formData, cars: newCars }); // Update formData with new cars
  };

  const handleCustomizeCar = (carToCustomize) => {
    setIsCustomizingCar(true);
    setActiveCarIndex(carToCustomize);
  };

  return (
    <div className="render-car-container">
      <DefaultCar
        carColor={car.carColor}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="render-seat-container">
        <div className="render-seat-row">
          {Array.from({ length: car.seatDistribution.row1 }).map((_, index) => (
            <input
              key={`row1-seat${index}`}
              value={car.seatNames.row1[index] || ""}
              onChange={(event) =>
                handleSeatClick("row1", carIndex, index, event)
              }
              className="seat-input"
            />
          ))}
        </div>

        <div className="render-seat-row">
          {Array.from({ length: car.seatDistribution.row2 }).map((_, index) => (
            <input
              key={`row2-seat${index}`}
              value={car.seatNames.row2[index] || ""}
              onChange={(event) =>
                handleSeatClick("row2", carIndex, index, event)
              }
              className="seat-input"
            />
          ))}
        </div>

        <div className="render-seat-row">
          {Array.from({ length: car.seatDistribution.row3 }).map((_, index) => (
            <input
              key={`row3-seat${index}`}
              value={car.seatNames.row3[index] || ""}
              onChange={(event) =>
                handleSeatClick("row3", carIndex, index, event)
              }
              className="seat-input"
            />
          ))}
        </div>
        <button onClick={() => handleCustomizeCar(carIndex)}>
          Customize Car
        </button>
        {/* {editingCarIndex === carIndex && ( // Render EditCar if this car is being edited
            <EditCar car={car} onUpdate={handleUpdateCar} /> */}
        {/* )} */}
      </div>
    </div>
  );
}
