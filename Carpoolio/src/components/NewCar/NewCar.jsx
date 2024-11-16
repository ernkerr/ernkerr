import { useContext, useState, useRef } from "react";
import { TripContext } from "@components/TripContext";

import "./NewCar.css";

export default function NewCar({ onNext }) {
  const { formData, setFormData } = useContext(TripContext);
  const [isDriving, setIsDriving] = useState(false);
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  const handleToggle = (e) => {
    setIsDriving(e.target.checked);
  };

  const handleMoreOptions = () => {
    setIsShowingOptions((prevState) => !prevState);
  };
  // if /trip/create conditionally render are you drivin toggle and link to share trip
  // else if /trip/:tripId/addcar don't show ^
  return (
    <div className="form-question-container">
      <p className="form-question">Are you drivin?</p>
      {/* toggle  */}
      <div className="checkbox">
        <input
          className="tgl"
          id="toggle"
          type="checkbox"
          checked={isDriving}
          onChange={handleToggle}
        />
        <label className="tgl-btn" htmlFor="toggle"></label>
      </div>

      {isDriving ? (
        <div>
          {/* is driving  */}
          <p className="form-question">What should we call you?</p>
          <p className="form-question">Avaliable seats in your car?</p>
          {/* scroll bar  */}
        </div>
      ) : (
        <div>
          {/* not driving  */}
          <p className="form-question">Who's drivin? </p>
          {/* link for them to add a car (copy to clipboard)  */}
        </div>
      )}
    </div>
  );
}
