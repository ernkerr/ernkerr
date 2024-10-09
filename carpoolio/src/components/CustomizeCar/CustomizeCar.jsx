import { useState } from "react";

import NumSeats from "./NumSeats";
import CustomizeTrip from "../CustomizeTrip/CustomizeTrip.jsx";
import DefaultCar from "./DefaultCar.jsx";
import "./CustomizeCar.css";

export default function CustomizeCar({ formData, setFormData }) {
  const [carColor, setCarColor] = useState("#b79700");
  const [underglowColor, setUnderglow] = useState();

  const changeCarColor = (event) => {
    setCarColor(event.target.value);
    setFormData({ ...formData, carColor: carColor });
  };

  const changeUnderglow = (event) => {
    setUnderglow(event.target.value);
    setFormData({ ...formData, underglowColor: underglowColor });
  };

  function handleClick() {
    <CustomizeTrip />;
  }

  return (
    <>
      <NumSeats />
      <DefaultCar carColor={carColor} />
      <div>
        <label for="body">Change Car Color: </label>
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

      {/* <CarIcon /> */}

      {/* render basic car */}

      {/* // make  */}

      {/* // spotify playlist 

            // car chat  */}

      {/* <CarIcon fill={carColor} /> {/* Set the color dynamically */}
      {/* <button className="glow-button" onClick={changeCarColor}>Change Car Color</button> */}

      <button className="glow-button" onClick={handleClick}>
        continue
      </button>
      {/* <h6>{formData.name}</h6> */}
    </>
  );
}
