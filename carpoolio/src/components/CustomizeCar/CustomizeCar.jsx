import { useState, useEffect } from "react";

import DefaultCar from "./DefaultCar.jsx";
// import "./CustomizeCar.css";

export default function CustomizeCar({ formData, setFormData }) {
  const [customizeCar, setCustomizeCar] = useState(false);
  const [carColor, setCarColor] = useState("#216191");

  // const [underglowColor, setUnderglow] = useState();

  // const changeUnderglow = (event) => {
  //   setUnderglow(event.target.value);
  //   setFormData({ ...formData, underglowColor: underglowColor });
  // };

  const handleSeatDistribution = () => {
    const totalSeats = formData.numSeats + 1; // account for the driver

    // update the numSeats per row
    const newFrontSeats = Math.min(2, totalSeats); // At least two front seats if there are seats

    const newMiddleSeats = Math.min(3, totalSeats - newFrontSeats); // Up to 3 middle seats

    const newBackSeats = Math.max(
      0,
      totalSeats - (newFrontSeats + newMiddleSeats)
    ); // Assign remaining seats to back

    console.log("Front Seats:", newFrontSeats);
    console.log("Middle Seats:", newMiddleSeats);
    console.log("Back Seats:", newBackSeats);

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

  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
    setFormData({ ...formData, carColor: newColor });
  };

  const toggleCustomizeCar = () => {
    setCustomizeCar((prev) => !prev);
  };

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
      <>
        <button
          onClick={toggleCustomizeCar}
          className="glow-button"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
          }}
        >
          Customize Car
        </button>
        {customizeCar && (
          <div className="car-color">
            <label htmlFor="car-color">Change Car Color </label>
            <input
              className="car-color-picker"
              type="color"
              id="car-color"
              name="carColor"
              value={carColor}
              onChange={changeCarColor}
            />
            {/* <br></br>
        <label htmlFor="underglow">Change Car Underglow: </label>
        <input
          type="color"
          name="underglow"
          value={underglowColor}
          onChange={changeUnderglow}
        /> */}
          </div>
        )}
      </>

      {/* // spotify playlist 

            // car chat  */}

      {/* <CarIcon fill={carColor} /> {/* Set the color dynamically */}
      {/* <button className="glow-button" onClick={changeCarColor}>Change Car Color</button> */}

      {/* <h6>{formData.name}</h6> */}
    </>
  );
}
