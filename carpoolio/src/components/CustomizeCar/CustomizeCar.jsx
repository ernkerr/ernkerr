import { useState, useEffect } from "react";

import CustomizeTrip from "../CustomizeTrip/CustomizeTrip.jsx";
import DefaultCar from "./DefaultCar.jsx";
import "./CustomizeCar.css";

export default function CustomizeCar({ formData, setFormData }) {
  const [carColor, setCarColor] = useState("#216191");

  // const [underglowColor, setUnderglow] = useState();

  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
    setFormData({ ...formData, carColor: newColor });
  };

  // const changeUnderglow = (event) => {
  //   setUnderglow(event.target.value);
  //   setFormData({ ...formData, underglowColor: underglowColor });
  // };

  const handleSeatDistribution = () => {
    const totalSeats = formData.numSeats;

    // update the numSeats per row
    const newFrontSeats = Math.min(2, totalSeats); // At least two front seats if there are seats
    const newMiddleSeats = Math.min(Math.max(totalSeats - 1, 0), 3); // Up to 3 middle seats
    const newBackSeats = Math.max(
      totalSeats - newFrontSeats - newMiddleSeats,
      0
    ); // Remaining seats for back

    setFormData({
      ...formData,
      frontSeats: newFrontSeats,
      middleSeats: newMiddleSeats,
      backSeats: newBackSeats,
    });
  };

  useEffect(() => {
    console.log("Number of seats changed:", formData.numSeats);
    handleSeatDistribution();
  }, [formData.numSeats]); // Call when numSeats changes

  const handleSeatClick = (seatType, seatIndex) => {
    const seatName = prompt(
      `Assign a name to ${seatType} seat ${seatIndex + 1}`
    );
    // Logic to store the seat assignment
    console.log(`${seatType} seat ${seatIndex + 1}: ${seatName}`);
  };

  // function handleClick() {
  //   <CustomizeTrip />;
  // }
  useEffect(() => {
    console.log("Front seats:", formData.frontSeats);
    console.log("Middle seats:", formData.middleSeats);
    console.log("Back seats:", formData.backSeats);
    handleSeatDistribution();
  }, [formData.numSeats]); // Call when numSeats changes

  return (
    <>
      <div className="car-container">
        <DefaultCar
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="seat-container">
          <div className="front-seats">
            {Array.from({ length: formData.frontSeats }).map((_, index) => (
              <button
                key={`front-seat-${index}`}
                onClick={() => handleSeatClick("front", index)}
                className="seat-button"
              >
                Front Seat {index + 1}
              </button>
            ))}
          </div>

          <div className="middle-seats">
            {Array.from({ length: formData.middleSeats }).map((_, index) => (
              <button
                key={`middle-seat-${index}`}
                onClick={() => handleSeatClick("middle", index)}
                className="seat-button"
              >
                Middle Seat {index + 1}
              </button>
            ))}
          </div>

          <div className="back-seats">
            {Array.from({ length: formData.backSeats }).map((_, index) => (
              <button
                key={`back-seat-${index}`}
                onClick={() => handleSeatClick("back", index)}
                className="seat-button"
              >
                Back Seat {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="body">Change Car Color: </label>
        <input
          type="color"
          name="body"
          value={carColor}
          onChange={changeCarColor}
        />{" "}
        {/* <br></br>
        <label htmlFor="underglow">Change Car Underglow: </label>
        <input
          type="color"
          name="underglow"
          value={underglowColor}
          onChange={changeUnderglow}
        /> */}
      </div>

      {/* // spotify playlist 

            // car chat  */}

      {/* <CarIcon fill={carColor} /> {/* Set the color dynamically */}
      {/* <button className="glow-button" onClick={changeCarColor}>Change Car Color</button> */}

      {/* <h6>{formData.name}</h6> */}
    </>
  );
}
