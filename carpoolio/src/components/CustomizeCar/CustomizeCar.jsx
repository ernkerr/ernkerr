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
    const newBackSeats = Math.min(Math.max(totalSeats - 1, 0), 3);
    // const newBackSeats = Math.max(
    //   totalSeats - newFrontSeats - newMiddleSeats,
    //   0
    // );

    setFormData({
      ...formData,
      frontSeats: newFrontSeats,
      middleSeats: newMiddleSeats,
      backSeats: newBackSeats,
      seatNames: formData.seatNames || { front: [], middle: [], back: [] },
    });
  };

  useEffect(() => {
    console.log("Number of seats changed:", formData.numSeats);
    handleSeatDistribution();
  }, [formData.numSeats]); // Call when numSeats changes

  const handleSeatClick = (seatRow, seatIndex, event) => {
    const newSeatNames = { ...formData.seatNames };
    newSeatNames[seatRow][seatIndex] = event.target.value;
    setFormData({ ...formData, seatNames: newSeatNames });
  };

  // useEffect(() => {
  //   console.log("Front seats:", formData.frontSeats);
  //   console.log("Middle seats:", formData.middleSeats);
  //   console.log("Back seats:", formData.backSeats);
  //   handleSeatDistribution();
  // }, [formData.numSeats]); // Call when numSeats changes

  return (
    <>
      <div className="car-container">
        <DefaultCar
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />{" "}
        <div className="seat-container">
          <div className="front-seats">
            {Array.from({ length: formData.frontSeats }).map((_, index) => (
              <input
                key={`front-seat-${index}`}
                value={formData.seatNames.front[index] || ""}
                onChange={(event) => handleSeatClick("front", index, event)}
                className="seat-input"
              />
            ))}
          </div>

          <div className="middle-seats">
            {Array.from({ length: formData.middleSeats }).map((_, index) => (
              <input
                key={`middle-seat-${index}`}
                value={formData.seatNames.middle[index] || ""}
                onChange={(event) => handleSeatClick("middle", index, event)}
                className="seat-input"
              />
            ))}
          </div>

          <div className="back-seats">
            {Array.from({ length: formData.backSeats }).map((_, index) => (
              <input
                key={`back-seat-${index}`}
                value={formData.seatNames.back[index] || ""}
                onChange={(event) => handleSeatClick("back", index, event)}
                className="seat-input"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="car-color">
        <label htmlFor="car-color">Change Car Color </label>
        <input
          className="car-color-picker"
          type="color"
          id="car-color"
          name="carColor"
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
