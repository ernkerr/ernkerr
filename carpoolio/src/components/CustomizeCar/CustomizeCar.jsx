import { useState, useEffect, useContext, act } from "react";
import axios from "axios";
import { TripContext } from "@components/TripContext";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";

import "./CustomizeCar.css";

import "../CustomizeTrip/RenderCar.css";

export default function CustomizeCar({ activeCarIndex, setIsCustomizingCar }) {
  const { formData, setFormData } = useContext(TripContext);
  const car = formData?.cars?.[activeCarIndex];

  // const [seatNames, setSeatNames] = useState(
  //   car?.seatNames || { row1: [], row2: [], row3: [], row4: [] }
  // );

  const changeCarName = (event) => {
    const newCarName = event.target.value;

    // update the car name at activeCarIndex
    setFormData((prevData) => {
      const updatedCars = [...prevData.car]; // copy cars array

      updatedCars[activeCarIndex] = {
        // update the car name of the specific car
        ...updatedCars[activeCarIndex],
        carName: newCarName,
      };
      return { ...prevData, cars: updatedCars }; // return the updated formData with the new cars array
    });

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
        setSeatDistribution(newSeats);
      }

      setFormData((prevData) => {
        const updatedCars = [...prevData.cars];
        updatedCars[activeCarIndex] = {
          ...updatedCars[activeCarIndex],
          setSeatDistribution: newSeats, // update seatDistribution for the specific car
          numSeats: numSeats + 1, // update numSeats to reflect change
        };
        return { ...prevData, cars: updatedCars };
      });
    };

    // handle removing a seat from the row
    const removeSeat = (row) => {
      const newSeats = { ...car.seatDistribution };
      if (newSeats[row] > 0) {
        newSeats[row]--;
        setSeatDistribution(newSeats);
      }
      setFormData((prevData) => {
        const updatedCars = [...prevData.cars];
        updatedCars[activeCarIndex] = {
          ...updatedCars[activeCarIndex],
          setSeatDistribution: newSeats,
          numSeats: numSeats - 1,
        };
        return { ...prevData, cars: updatedCars };
      });
    };
    // const changeCarColor = (event) => {
    //   const newCarColor = event.target.value;
    //   setFormData((prevData) => {
    //     const updatedCars = [...prevData.cars];
    //     updatedCars[activeCarIndex] = {
    //       ...updatedCars[activeCarIndex],
    //     };
    //   });
    // };

    const handleSeatClick = (row, seatIndex, event) => {
      const newSeatNames = { ...seatNames };
      newSeatNames[row][seatIndex] = event.target.value; // update the name on the clicked seat
      setSeatNames(newSeatNames); // update local state
    };

    // Save or update car details
    const handleSaveCar = async (e) => {
      console.log("Car:", car);
      e.preventDefault(); // prevent page refresh
      try {
        if (car) {
          const response = await axios.put(
            `http://192.168.0.28:8080/api/trip/${formData.tripId}/car/${car.carId}`,
            car
          ); // update existing car
          console.log("Car:", car);

          if (response.status === 200) {
            console.log("Car updated in backend:", response.data);
          }
        } else {
          // if car doesn't exist, make one
          const response = await axios.post(
            `http://192.168.0.28:8080/api/trip/${formData.tripId}/car`,
            car
          ); // should create a new car associated with that tripId
          console.log("Car being created:", response.date);

          if (response.status === 201) {
            console.log("Car created:", response.data);
          } else {
            console.log("Failed to save car");
          }
        }
      } catch (error) {
        console.error("Error saving car:", error);
      }
    };
    // const handleSaveCar = async () => {
    //   try {
    //     const updatedCar = {
    //       carName,
    //       carColor,
    //       numSeats,
    //       seatNames,
    //       seatDistribution,
    //     };

    //     let updatedFormData;

    //     if (activeCarIndex === null) {
    //       // Add a new car
    //       updatedFormData = {
    //         ...formData,
    //         cars: [...(formData.cars || []), updatedCar],
    //       };
    //     } else {
    //       // Update existing car
    //       const updatedCars = [...formData.cars];
    //       updatedCars[activeCarIndex] = updatedCar;
    //       updatedFormData = { ...formData, cars: updatedCars };
    //     }

    //     // Send to backend
    //     const response = await fetch(`/api/trip/${formData.tripId}/car`, {
    //       method: activeCarIndex === null ? "POST" : "PUT",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(updatedFormData),
    //     });

    //     if (!response.ok)
    //       throw new Error(`Failed to save car: ${response.statusText}`);

    //     const updatedTrip = await response.json();
    //     setFormData(updatedTrip);
    //     setIsCustomizingCar(false);
    //   } catch (error) {
    //     console.error("Error saving car:", error);
    //   }
    // };

    const handleDeleteCar = () => {
      setFormData((prevData) => {
        const updatedCars = prevData.cars.filter(
          (_, index) => index !== activeCarIndex
        );
        return {
          ...prevData,
          cars: updatedCars,
        };
      });
    };

    return (
      <>
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <p className="form-question">Give your car a name?</p>
              <input
                className="form-response"
                key="carName"
                id="carName"
                type="text"
                required
                placeholder="Optional"
                value={carName}
                onChange={changeCarName}
                style={{ marginBottom: "4dvh" }}
              />
              <div className="color-picker-container">
                <label htmlFor="car-color" className="form-question">
                  Change car color
                </label>
                <input
                  className="car-color-picker"
                  type="color"
                  id="car-color"
                  name="carColor"
                  key="carColor"
                  value={carColor}
                  onChange={changeCarColor}
                />
              </div>
              <div className="render-car-container">
                <DefaultCar
                  key={activeCarIndex}
                  carColor={carColor}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="render-seat-container">
          {/* row 1 */}
          <div className="render-seat-row">
            <button className="seat-buttons" onClick={() => removeSeat("row1")}>
              -
            </button>

            {Array.from({
              length: formData.cars[activeCarIndex].seatDistribution.row1,
            }).map((_, index) => (
              <input
                key={`row1-seat${index}`}
                value={seatNames.row1[index] || ""}
                onChange={(event) => handleSeatClick("row1", index, event)}
                className="seat-input"
              />
            ))}
            <button className="seat-buttons" onClick={() => addSeat("row1")}>
              +
            </button>
          </div>
          {/* row 2 */}
          <div className="render-seat-row">
            <button className="seat-buttons" onClick={() => removeSeat("row2")}>
              -
            </button>

            {Array.from({
              length: formData.cars[activeCarIndex].seatDistribution.row2,
            }).map((_, index) => (
              <input
                key={`row2-seat${index}`}
                value={seatNames.row2[index] || ""}
                onChange={(event) => handleSeatClick("row2", index, event)}
                className="seat-input"
              />
            ))}
            <button className="seat-buttons" onClick={() => addSeat("row2")}>
              +
            </button>
          </div>
          {/* row 3 */}
          <div className="render-seat-row">
            <button className="seat-buttons" onClick={() => removeSeat("row3")}>
              -
            </button>

            {Array.from({
              length: formData.cars[activeCarIndex].seatDistribution.row3,
            }).map((_, index) => (
              <input
                key={`row3-seat${index}`}
                value={seatNames.row3[index] || ""}
                onChange={(event) => handleSeatClick("row3", index, event)}
                className="seat-input"
              />
            ))}
            <button className="seat-buttons" onClick={() => addSeat("row3")}>
              +
            </button>
          </div>

          {/* row 4 */}
          <div className="render-seat-row">
            <button className="seat-buttons" onClick={() => removeSeat("row4")}>
              -
            </button>

            {Array.from({
              length: formData.cars[activeCarIndex].seatDistribution.row4,
            }).map((_, index) => (
              <input
                key={`row4-seat${index}`}
                value={seatNames.row4[index] || ""}
                onChange={(event) => handleSeatClick("row4", index, event)}
                className="seat-input"
              />
            ))}
            <button className="seat-buttons" onClick={() => addSeat("row4")}>
              +
            </button>
          </div>
        </div>

        <div className="customize-car-btn-container">
          <button
            className="customize-car-btn"
            id="delete-car-btn"
            onClick={handleDeleteCar}
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData.glowColor}`,
              boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
            }}
          >
            Delete
          </button>
          <button
            className="primary-btn"
            id="save-car-btn"
            onClick={handleSaveCar}
            style={{
              background:
                formData?.tripBackground?.scrim ||
                formData?.transparentGlowColor,
              border: ` 1px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              Zindex: "100",
            }}
          >
            Done editing
          </button>
        </div>
      </>
    );
  };
}
