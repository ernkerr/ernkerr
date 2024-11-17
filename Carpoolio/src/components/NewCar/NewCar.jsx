import { useContext, useState } from "react";
import { TripContext } from "@components/TripContext";

import CustomizeCar from "../CustomizeCar/CustomizeCar";
import RenderCar from "../CustomizeTrip/RenderCar";
import NumSeats from "@components/NumSeats.jsx";
import "./NewCar.css";

export default function NewCar({ onNext }) {
  const { formData, setFormData } = useContext(TripContext);

  const [isDriving, setIsDriving] = useState(null);
  const [driverName, setDriverName] = useState("");

  const [isNumSeatsSet, setIsNumSeatsSet] = useState(null);
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const handleYes = () => {
    setIsDriving(true);
  };

  const handleNo = () => {
    setIsDriving(false);
  };

  const changeDriverName = (event) => {
    const driverName = event.target.value;
    setDriverName(driverName);
    // handleDriverNameUpdate(driverName);
  };

  const handleNumSeatsUpdate = (numSeats) => {
    if (numSeats) {
      setIsNumSeatsSet(true);
    }
  };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
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

      {isDriving ? (
        <>
          {/* is driving  */}
          <p className="form-question">What should we call you?</p>
          <input
            className="form-response"
            key="driverName"
            id="driverName"
            type="text"
            placeholder="Your name here"
            value={driverName}
            onChange={changeDriverName}
            // style={{ marginBottom: "4dvh" }}
          />
          {/* if driver name is set, show num seats slider  */}
          {driverName && <NumSeats onUpdate={handleNumSeatsUpdate} />}
          {/* if NumSeats is set render car and customize car btn */}
          {(isNumSeatsSet || formData?.numSeats) && (
            <>
              {isCustomizingCar ? (
                <CustomizeCar
                  activeCarIndex={activeCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                />
              ) : (
                <RenderCar
                  activeCarIndex={activeCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                />
              )}
            </>
          )}

          {/* if customize car btn is pressed show carName, color, etc. (modal?) */}
          {/* edit car modal : build? */}
          {/* if departure details is pressed, show date, time, leaving from, etc. (modal?) */}
          <button
            className={`secondary-btn ${isShowingOptions ? "active" : ""}`}
            onClick={handleMoreOptions}
          >
            Departure details +{" "}
          </button>
          {isShowingOptions && (
            <>
              <p className="form-question">Add Departure Details</p>
            </>
          )}
        </>
      ) : (
        <>
          {/* not driving  */}
          <p className="form-question">Who's driving?</p>
          <input
            className="form-response"
            key="driverName"
            id="driverName"
            type="text"
            placeholder="Optional"
            value={formData.driverName}
            onChange={changeDriverName}
            style={{ marginBottom: "4dvh" }}
          />
          {/* skip button  */}
          {/* invite someone else to add a car to your trip? */}
        </>
      )}

      {(isNumSeatsSet || formData?.numSeats) && (
        <>
          {/* render car  */}

          {/* customize car btn */}
        </>
      )}
    </div>
  );
}

{
  /* toggle  */
}
{
  /* <div className="checkbox">
          <input
            className="tgl"
            id="toggle"
            type="checkbox"
            checked={isDriving}
            onChange={handleToggle}
          />
          <label className="tgl-btn" htmlFor="toggle"></label>
        </div> */
}
