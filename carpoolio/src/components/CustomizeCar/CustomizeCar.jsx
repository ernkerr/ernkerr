import { useState, useEffect, useContext } from "react";
import { TripContext } from "@/components/TripContext";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";
import "../CustomizeTrip/RenderCar.css";

export default function CustomizeCar({ activeCarIndex, setIsCustomizingCar }) {
  const { formData, setFormData } = useContext(TripContext);
  const [carColor, setCarColor] = useState(
    formData.cars[activeCarIndex].carColor
  );
  const [numSeats, setNumSeats] = useState(
    formData.cars[activeCarIndex].numSeats
  );
  const [seatNames, setSeatNames] = useState(
    formData.cars[activeCarIndex].seatNames
  );
  const [seatDistribution, setSeatDistribution] = useState(
    formData.cars[activeCarIndex].seatDistribution
  );
  const [carName, setCarName] = useState(formData.cars[activeCarIndex].carName);

  // useEffect(() => {
  //   console.log({
  //     carColor,
  //     numSeats,
  //     seatNames,
  //     seatDistribution,
  //   });
  // }, [carColor, numSeats, seatNames, seatDistribution]);

  const changeCarName = (event) => {
    const carName = event.target.value;
    setCarName(carName);
  };

  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
  };

  const handleSeatClick = (row, seatIndex, event) => {
    const newSeatNames = { ...seatNames };
    newSeatNames[row][seatIndex] = event.target.value; // update the name on the clicked seat
    setSeatNames(newSeatNames); // update local state
  };

  // handle adding a new seat to the row
  const addSeat = (row) => {
    const newSeats = { ...seatDistribution };
    if (newSeats[row] < 3) {
      newSeats[row]++;
      setSeatDistribution(newSeats);
      setNumSeats(numSeats - 1);
    }
  };

  // handle removing a seat from the row
  const removeSeat = (row) => {
    const newSeats = { ...seatDistribution };
    if (newSeats[row] > 0) {
      newSeats[row]--;
      setSeatDistribution(newSeats);
      setNumSeats(numSeats - 1);
    }
  };

  const handleSaveCar = () => {
    setFormData((formData) => {
      const updatedCars = [...formData.cars];
      updatedCars[activeCarIndex] = {
        ...updatedCars[activeCarIndex],
        carName: carName,
        carColor: carColor,
        numSeats: numSeats,
        seatNames: seatNames,
        seatDistribution: seatDistribution,
      };
      return {
        ...formData,
        cars: updatedCars,
      };
    });
    setIsCustomizingCar(false);
  };

  return (
    <>
      <div className="render-car-container">
        <DefaultCar
          key={activeCarIndex}
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="render-seat-container">
          {/* row 1 */}
          <div className="render-seat-row">
            <button className="seat-buttons" onClick={() => removeSeat("row1")}>
              -
            </button>

            {Array.from({ length: seatDistribution.row1 }).map((_, index) => (
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

            {Array.from({ length: seatDistribution.row2 }).map((_, index) => (
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

            {Array.from({ length: seatDistribution.row3 }).map((_, index) => (
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

            {Array.from({ length: seatDistribution.row4 }).map((_, index) => (
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
      </div>

      <div className="custom-car-option">
        <input
          className="car-name"
          key="carName"
          id="carName"
          value={carName}
          placeholder="Optional Car Name"
          onChange={changeCarName}
        />

        <div className="color-picker-container">
          <label htmlFor="car-color">Change Car Color</label>
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

        <button
          className="glow-button"
          id="save-car-btn"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
          }}
          onClick={handleSaveCar}
        >
          save car
        </button>
      </div>
    </>
  );
}
