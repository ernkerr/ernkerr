import DefaultCar from "../CustomizeCar/DefaultCar";
import "./RenderCar.css";
import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";
import CarNotes from "../CarNotes";

export default function RenderCar({
  car,
  carIndex,
  setIsCustomizingCar,
  setActiveCarIndex,
}) {
  const { formData, setFormData } = useContext(TripContext);
  // const car = formData?.cars?.[carIndex];

  const handleSeatClick = (row, carIndex, seatIndex, event) => {
    const newCars = [...formData.cars]; // create a copy of cars array
    const newSeatNames = { ...newCars[carIndex].seatNames }; // access the seat names of the specific car
    newSeatNames[row][seatIndex] = event.target.value; // update the specific seat name in the row
    newCars[carIndex].seatNames = newSeatNames; // update the seat names in the specific car object
    setFormData({ ...formData, cars: newCars });
  };

  const handleCustomizeCar = () => {
    setIsCustomizingCar(true);
    setActiveCarIndex(carIndex);
  };

  return (
    <>
      <div className="car-and-details-container">
        <div className="car-details-container">
          <button
            className="secondary-btn"
            onClick={handleCustomizeCar}
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            }}
          >
            Customize
          </button>
          <CarNotes activeCarIndex={carIndex} />
          <button
            className={`secondary-btn ${isShowingOptions ? "active" : ""}`}
            onClick={handleMoreOptions}
          >
            Departure details +{" "}
          </button>
          {/* if departure details is pressed, show date, time, leaving from, etc. (modal?) */}
          {isShowingOptions && (
            <>
              <p className="form-question">Add Departure Details</p>
            </>
          )}
        </div>
        {/* end car details container  */}

        <div className="render-car-container">
          <h6 className="car-name">{car?.carName || ""}</h6>
          <DefaultCar
            carColor={car?.carColor || "#216191"}
            // style={{ width: "100%", height: "auto" }}
          />
          <div className="render-seat-container">
            <div className="render-seat-row">
              {Array.from({ length: car?.seatDistribution.row1 }).map(
                (_, index) => (
                  <input
                    key={`row1-seat${index}`}
                    value={car?.seatNames.row1[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row1", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>

            <div className="render-seat-row">
              {Array.from({ length: car?.seatDistribution.row2 }).map(
                (_, index) => (
                  <input
                    key={`row2-seat${index}`}
                    value={car?.seatNames.row2[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row2", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>

            <div className="render-seat-row">
              {Array.from({ length: car?.seatDistribution.row3 }).map(
                (_, index) => (
                  <input
                    key={`row3-seat${index}`}
                    value={car?.seatNames.row3[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row3", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// is adminId or carId in link? if yes, allow customization
// if no, only allow selection of empty seats
