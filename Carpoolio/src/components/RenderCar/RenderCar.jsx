import DefaultCar from "../CustomizeCar/DefaultCar";
import "./RenderCar.css";
import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";
import CarNotes from "../CarNotes";
import CarDetails from "../CarDetails";

export default function RenderCar({
  car,
  carIndex,
  setIsCustomizingCar,
  setActiveCarIndex,
}) {
  const { formData, setFormData } = useContext(TripContext);
  // const car = formData?.cars?.[carIndex];

  // departure details
  const [isShowingOptions, setIsShowingOptions] = useState(false);

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

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };

  return (
    <>
      <div className="car-and-details-container">
        <div className="car-details-container">
          <div className="carName-and-edit-container">
            <button
              className="carName"
              style={
                {
                  // car?.seatNames.row1[index]
                  // background: formData?.transparentGlowColor || "transparent",
                  // border: `1px solid ${formData?.glowColor}`,
                }
              }
            >
              {car?.carName || `${car?.seatNames.row1[0]}'s car`}
            </button>
            <button
              className="editBtn"
              id="edit-car-btn"
              style={{
                background: formData?.transparentGlowColor || "transparent",
                border: `1px solid ${formData?.glowColor}`,
                // boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              }}
              onClick={handleCustomizeCar}
            >
              {/* Edit Car */}
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          </div>
          <button
            className={`secondary-btn ${isShowingOptions ? "active" : ""}`}
            id="car-details-btn"
            onClick={handleMoreOptions}
          >
            Departure details +{" "}
          </button>
          {/* if departure details is pressed, show date, time, leaving from, etc. (modal?) */}
          {isShowingOptions && (
            <>
              <p className="form-question">Add Departure Details</p>
              <CarDetails activeCarIndex={carIndex} />
            </>
          )}

          {/* <button
            className="secondary-btn"
            onClick={handleCustomizeCar}
            // style={{
            //   background: formData?.tripBackground?.scrim || "transparent",
            //   border: ` 2px solid ${formData?.glowColor}`,
            //   boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            // }}
          >
            Customize
          </button> */}
        </div>

        {/* end car details container  */}

        <div className="render-car-container">
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
