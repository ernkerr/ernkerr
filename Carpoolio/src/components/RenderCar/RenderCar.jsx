import DefaultCar from "../CustomizeCar/DefaultCar";

import { useState, useContext } from "react";
import { TripContext } from "@components/TripContext";
// import CarNotes from "../CarNotes";
import clockIcon from "../../assets/img/clock.png";
import gearIcon from "../../assets/img/gear-icon.png";
import "./RenderCar.css";

export default function RenderCar({
  car,
  carIndex,
  setIsCustomizingCar,
  setActiveCarIndex,
}) {
  const { formData, setFormData } = useContext(TripContext);

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

  const funnyFallbacks = ["Otto", "Ghost Rider", "Casper"]; // make array

  const randomFallback = // randomly choose
    //.floor = round down
    funnyFallbacks[Math.floor(Math.random() * funnyFallbacks.length)]; // by multiplying these you get a random num that falls within the range of valid indices in the array
  // Math.random() function generates a random # between 0 (inclusive) and 1 (exclusive)
  // .length property gives the total # of items in the array

  return (
    <>
      <div className="car-and-details-container">
        <>
          <div className="carName-and-edit-container">
            <button className="carName">
              {car?.carName ||
                `${car?.seatNames.row1[0] || randomFallback}'s car`}{" "}
              {/* keeping my bugs fresh & funky */}
            </button>

            <button
              className="edit-btn"
              id="edit-car-btn"
              onClick={handleCustomizeCar}
            >
              <div className="icon-text-container">
                {/* edit Car */}
                {/* <svg height="1em" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
                <p className="icon-text">Edit car</p> */}
                <img
                  className="gear-icon"
                  src={gearIcon}
                  alt="Gear Icon for Customization"
                />
              </div>
            </button>
          </div>
          {/* // instead of car details: departure date & departure time  */}
          <div className="departure-date-time-container">
            <button className="departure-date">{car?.departureDate}</button>
            {car?.departureTime && (
              <img
                className="clock-icon"
                src={clockIcon}
                alt="Departure Time Icon"
              />
            )}

            <button className="departure-time">{car?.departureTime}</button>
          </div>

          {/* <CarDetails activeCarIndex={carIndex} /> */}

          {/* if departure details is pressed, show date, time, leaving from, etc. (modal?) */}
        </>

        {/* end car details container  */}

        <div className="render-car-container">
          <DefaultCar carColor={car?.carColor || "#216191"} />
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
