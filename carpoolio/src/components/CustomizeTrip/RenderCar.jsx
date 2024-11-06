import DefaultCar from "../CustomizeCar/DefaultCar";
import "./RenderCar.css";
import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";

export default function RenderCar({
  car,
  carIndex,
  setIsCustomizingCar,
  setActiveCarIndex,
}) {
  const { formData, setFormData } = useContext(TripContext);
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
    <>
      <h6 className="car-name">{car?.carName || ""}</h6>
      <div className="render-car-container">
        <DefaultCar
          carColor={car.carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="render-seat-container">
          <div className="render-seat-row">
            {Array.from({ length: car.seatDistribution.row1 }).map(
              (_, index) => (
                <input
                  key={`row1-seat${index}`}
                  value={car.seatNames.row1[index] || ""}
                  onChange={(event) =>
                    handleSeatClick("row1", carIndex, index, event)
                  }
                  className="seat-input"
                />
              )
            )}
          </div>

          <div className="render-seat-row">
            {Array.from({ length: car.seatDistribution.row2 }).map(
              (_, index) => (
                <input
                  key={`row2-seat${index}`}
                  value={car.seatNames.row2[index] || ""}
                  onChange={(event) =>
                    handleSeatClick("row2", carIndex, index, event)
                  }
                  className="seat-input"
                />
              )
            )}
          </div>

          <div className="render-seat-row">
            {Array.from({ length: car.seatDistribution.row3 }).map(
              (_, index) => (
                <input
                  key={`row3-seat${index}`}
                  value={car.seatNames.row3[index] || ""}
                  onChange={(event) =>
                    handleSeatClick("row3", carIndex, index, event)
                  }
                  className="seat-input"
                />
              )
            )}
          </div>
          <button
            className="glow-button"
            onClick={() => handleCustomizeCar(carIndex)}
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData.glowColor}`,
              boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
            }}
          >
            Customize Car
          </button>
        </div>
      </div>
    </>
  );
}
