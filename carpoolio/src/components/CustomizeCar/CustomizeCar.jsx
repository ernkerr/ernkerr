import { useState, useEffect, useContext, act } from "react";
// import axios from "axios";
import { TripContext } from "@components/TripContext";
import { formResponseStyle, glowBtn } from "@styles/styles";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";

import "./CustomizeCar.css";

import "../RenderCar/RenderCar.css";
import CarNotes from "../CarNotes.jsx";
import DepartureDetails from "../DepartureDetails/DepartureDetails.jsx";
// import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import DeleteCarBtn from "../DeleteCarBtn/DeleteCar.jsx";

export default function CustomizeCar({ activeCarIndex, setIsCustomizingCar }) {
  const { formData, setFormData } = useContext(TripContext);
  const car = formData?.cars?.[activeCarIndex];

  // departure details
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [customizeCarBtn, setCustomizeCarBtn] = useState(false);

  const changeCarName = (event) => {
    const newCarName = event.target.value;

    // update the car name at activeCarIndex
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars]; // copy cars array

      updatedCars[activeCarIndex] = {
        // update the car name of the specific car
        ...updatedCars[activeCarIndex],
        carName: newCarName,
      };
      return { ...prevData, cars: updatedCars }; // return the updated formData with the new cars array
    });
  };

  const changeCarColor = (event) => {
    const newCarColor = event.target.value;
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        carColor: newCarColor,
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  // handle adding a new seat to the row
  const addSeat = (row) => {
    // pass row into the function as an argument
    const newSeats = { ...car.seatDistribution }; // get the currect seat distribution of the current car

    // if the row that was passed in has less than 3 seats..
    if (newSeats[row] < 3) {
      newSeats[row]++; // add one seat to the row
      console.log("Car data:", car);
      console.log("Current numSeats:", car?.numSeats);
    }

    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        seatDistribution: newSeats, // update seatDistribution for the specific car
        numSeats: Math.max((car.numSeats || 1) + 1, 0), // increment numSeats & make sure it doesn’t go below 0
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  // handle removing a seat from the row
  const removeSeat = (row) => {
    const newSeats = { ...car.seatDistribution };
    if (newSeats[row] > 0) {
      newSeats[row]--;
    }
    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        seatDistribution: newSeats,
        numSeats: Math.max((car.numSeats || 1) - 1, 0),
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  // handle seat click allow users to edit names
  // TODO: allow users to clear name with a button in customize trip?
  const handleSeatClick = (row, seatIndex, event) => {
    const newSeatNames = { ...car.seatNames };
    newSeatNames[row][seatIndex] = event.target.value; // update the name on the clicked seat

    setFormData((prevData) => {
      const updatedCars = [...prevData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        seatNames: newSeatNames,
      };
      return { ...prevData, cars: updatedCars };
    });
  };

  // Save or update car details
  const handleSaveCar = () => setIsCustomizingCar(false);

  const handleDeleteCar = () => {
    setIsCustomizingCar(false);
  };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };

  const handleCustomizeCar = () => {
    setCustomizeCarBtn((prevState) => !prevState);
  };

  return (
    <>
      <div className="modal">
        <div className="overlay">
          <div className="customize-car-container">
            <div className="customize-car-btn-container">
              <button
                className={`glass-btn ${customizeCarBtn ? "selected" : ""}`}
                id="car-details-btn"
                onClick={handleCustomizeCar}
              >
                Customize car +
              </button>
              {/* P2: add type of car, shape/color of seats, etc */}
              {customizeCarBtn && (
                <>
                  <input
                    className="form-response"
                    id="edit-carName"
                    key="carName"
                    type="text"
                    required
                    placeholder="Give your car a name?"
                    value={car?.carName || ""}
                    onChange={changeCarName}
                  />
                  <div className="color-picker-container">
                    <label className="form-response" htmlFor="car-color">
                      Change car color?
                    </label>
                    <input
                      className="car-color-picker"
                      type="color"
                      id="car-color"
                      name="carColor"
                      key="carColor"
                      value={car?.carColor}
                      onChange={changeCarColor}
                    />
                  </div>
                </>
              )}

              <button
                className={`glass-btn ${isShowingOptions ? "selected" : ""}`}
                id="car-details-btn"
                onClick={handleMoreOptions}
              >
                Edit departure details +
              </button>

              {/* if departure details is pressed, show date, time, leaving from, etc. (modal?) */}
              {isShowingOptions && (
                <>
                  <DepartureDetails activeCarIndex={activeCarIndex} />
                </>
              )}

              {/* </div> */}
            </div>
            {/* </div> */}

            <div className="render-car-container">
              <DefaultCar
                key={activeCarIndex}
                carColor={car?.carColor}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="render-seat-container">
                {/* row 1 */}
                <div className="render-seat-row">
                  <button
                    className="seat-buttons"
                    onClick={() => removeSeat("row1")}
                  >
                    -
                  </button>

                  {Array.from({
                    length: car?.seatDistribution.row1,
                  }).map((_, index) => (
                    <input
                      key={`row1-seat${index}`}
                      value={car?.seatNames.row1[index] || ""}
                      onChange={(event) =>
                        handleSeatClick("row1", index, event)
                      }
                      className="seat-input"
                    />
                  ))}
                  <button
                    className="seat-buttons"
                    onClick={() => addSeat("row1")}
                  >
                    +
                  </button>
                </div>
                {/* row 2 */}
                <div className="render-seat-row">
                  <button
                    className="seat-buttons"
                    onClick={() => removeSeat("row2")}
                  >
                    -
                  </button>

                  {Array.from({
                    length: car?.seatDistribution.row2,
                  }).map((_, index) => (
                    <input
                      key={`row2-seat${index}`}
                      value={car?.seatNames.row2[index] || ""}
                      onChange={(event) =>
                        handleSeatClick("row2", index, event)
                      }
                      className="seat-input"
                    />
                  ))}
                  <button
                    className="seat-buttons"
                    onClick={() => addSeat("row2")}
                  >
                    +
                  </button>
                </div>
                {/* row 3 */}
                <div className="render-seat-row">
                  <button
                    className="seat-buttons"
                    onClick={() => removeSeat("row3")}
                  >
                    -
                  </button>

                  {Array.from({
                    length: car?.seatDistribution.row3,
                  }).map((_, index) => (
                    <input
                      key={`row3-seat${index}`}
                      value={car?.seatNames.row3[index] || ""}
                      onChange={(event) =>
                        handleSeatClick("row3", index, event)
                      }
                      className="seat-input"
                    />
                  ))}
                  <button
                    className="seat-buttons"
                    onClick={() => addSeat("row3")}
                  >
                    +
                  </button>
                </div>

                {/* row 4 */}
                <div className="render-seat-row">
                  <button
                    className="seat-buttons"
                    onClick={() => removeSeat("row4")}
                  >
                    -
                  </button>

                  {Array.from({
                    length: car?.seatDistribution.row4,
                  }).map((_, index) => (
                    <input
                      key={`row4-seat${index}`}
                      value={car?.seatNames.row4[index] || ""}
                      onChange={(event) =>
                        handleSeatClick("row4", index, event)
                      }
                      className="seat-input"
                    />
                  ))}
                  <button
                    className="seat-buttons"
                    onClick={() => addSeat("row4")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DeleteCarBtn
            carId={car?.carId}
            onDelete={handleDeleteCar}
            className="secondary-btn"
            id="customize-car-delete-btn"
          >
            Delete Car
          </DeleteCarBtn>

          <button
            className="primary-btn"
            id="save-car-btn"
            onClick={handleSaveCar}
            style={glowBtn(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
