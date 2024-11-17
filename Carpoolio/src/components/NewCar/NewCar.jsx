import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";

import "./NewCar.css";
import CustomizeCar from "../CustomizeCar/CustomizeCar";
import RenderCar from "../CustomizeTrip/RenderCar";

export default function NewCar({ onNext }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);

  // const car = formData.cars[0];

  const handleToggle = (e) => {
    setIsDriving(e.target.checked);
  };

  const handleYes = () => {
    setIsDriving(true);
  };

  const handleNo = () => {
    setIsDriving(false);
  };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };

  const handleAddNewCar = () => {
    const newCar = {
      carName: "",
      carColor: "#216191",
      seatDistribution: { row1: 2, row2: 3, row3: 0, row4: 0 },
      seatNames: { row1: [""], row2: [""], row3: [""], row4: [""] },
    };
    setFormData(() => {
      const updatedCars = [...(formData.cars || []), newCar];

      return {
        ...formData,
        cars: updatedCars,
      };
    });

    const newCarIndex = formData?.cars.length;
    console.log(`new car index: ${newCarIndex}`);

    setActiveCarIndex(newCarIndex);
  };

  // if /trip/create conditionally render are you drivin toggle and link to share trip
  // else if /trip/:tripId/addcar don't show ^
  return (
    <div className="form-question-container">
      <p className="form-question">Are you driving?</p>

      <div className="glass-buttons-container">
        <button
          onClick={handleYes}
          className={`glass-button ${isDriving ? "selected" : ""}`}
        >
          Yes
        </button>

        <button
          onClick={handleNo}
          className={`glass-button ${!isDriving ? "selected" : ""}`}
        >
          No
        </button>
      </div>

      {/* toggle  */}
      {/* <div className="checkbox">
          <input
            className="tgl"
            id="toggle"
            type="checkbox"
            checked={isDriving}
            onChange={handleToggle}
          />
          <label className="tgl-btn" htmlFor="toggle"></label>
        </div> */}

      {isDriving ? (
        <div>
          {/* is driving  */}
          <p className="form-question">What's your name?</p>
          <input
            className="form-response"
            type="text"
            required
            placeholder="Enter your name here"
            onChange={(event) => {
              setFormData({
                ...formData,
                name: event.target.value,
              });
            }}
          />
          <p className="form-question">Avaliable seats:</p>
          {/* scroll bar  */}
          <CustomizeCar
            activeCarIndex={activeCarIndex}
            setIsCustomizingCar={true}
          />
          {/* <RenderCar /> */}
        </div>
      ) : (
        <div>
          {/* not driving  */}
          <p className="form-question">Add a car btn or next </p>
          {/* link for them to add a car (copy to clipboard)  */}
          {/* skip button  */}
          {/* invite someone else to add a car to your trip (don't worry you)  */}
        </div>
      )}
    </div>
  );
}
