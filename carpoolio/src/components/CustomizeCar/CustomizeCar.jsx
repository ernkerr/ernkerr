import { useState, useEffect } from "react";
import DefaultCar from "./DefaultCar.jsx";
import NumSeats from "./NumSeats.jsx";

export default function CustomizeCar({ formData, setFormData }) {
  const [customizeCar, setCustomizeCar] = useState(false); // state to control when 'customize car' feature is active
  const [carColor, setCarColor] = useState("#216191");

  const handleSeatDistribution = () => {
    const totalSeats = formData.numSeats + 1; // account for the driver

    // default seat distribution
    const defaultFrontSeats = Math.min(2, totalSeats); // at least two front seats if there are seats
    const defaultMiddleSeats = Math.min(3, totalSeats - defaultFrontSeats); // middle row gets remaining seats, max 3
    const defaultBackSeats = Math.max(
      0,
      totalSeats - (defaultFrontSeats + defaultMiddleSeats)
    ); // assign remaining seats to back

    // divide the seats into rows (max 3 seats per row)
    const newSeats = {
      row1: Math.min(3, defaultFrontSeats),
      row2: Math.min(3, defaultMiddleSeats),
      row3: Math.min(3, defaultBackSeats),
      row4: Math.min(3, 0), // starts with 0 seats
      row5: Math.min(3, 0),
    };

    // initialize seat names if they don't exist
    const newSeatNames = {
      row1: formData.seatNames?.row1 || [],
      row2: formData.seatNames?.row2 || [],
      row3: formData.seatNames?.row3 || [],
      row4: formData.seatNames?.row4 || [],
      row5: formData.seatNames?.row5 || [],
    };

    // update formData with new seat distribution and names

    setFormData({
      ...formData,
      seatDistribution: newSeats,
      seatNames: newSeatNames,
    });
  };

  // when numSeats changes, distribute seats again
  useEffect(() => {
    console.log("Number of seats changed:", formData.numSeats);
    handleSeatDistribution();
  }, [formData.numSeats]); // call when numSeats changes

  // handle seat name changes for specific seats

  const handleSeatClick = (row, seatIndex, event) => {
    const newSeatNames = { ...formData.seatNames }; // create a copy of seat names
    newSeatNames[row][seatIndex] = event.target.value; // update the specific seat name in the row
    setFormData({ ...formData, seatNames: newSeatNames });
  };

  // handle adding a seat to the row
  const addSeat = (row) => {
    const newSeats = { ...formData.seatDistribution };
    if (newSeats[row] < 3) {
      // add a seat if there are less than 3 seats in teh row
      newSeats[row]++;
      setFormData({ ...formData, seatDistribution: newSeats });
    }
  };

  // handle removing a seat from the row
  const removeSeat = (row) => {
    const newSeats = { ...formData.seatDistribution };
    if (newSeats[row] > 0) {
      newSeats[row]--;
      setFormData({ ...formData, seatDistribution: newSeats });
    }
  };

  // change car color
  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
    setFormData({ ...formData, carColor: newColor });
  };

  // toggle visibility of customize car options
  const toggleCustomizeCar = () => {
    setCustomizeCar((prev) => !prev);
  };

  // to do: change css classNames

  return (
    <>
      <div className="car-container">
        <DefaultCar
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="seat-container">
          {/* row 1 */}
          <div className="front-seats">
            {Array.from({ length: formData.seatDistribution.row1 }).map(
              (_, index) => (
                <input
                  key={`row1-seat${index}`}
                  value={formData.seatNames.row1[index] || ""}
                  onChange={(event) => handleSeatClick("row1", index, event)}
                  className="seat-input"
                />
              )
            )}
            {customizeCar && (
              <>
                <button onClick={() => removeSeat("row1")}>-</button>
                <button onClick={() => addSeat("row1")}>+</button>
              </>
            )}
          </div>
          {/* row 2 */}
          <div className="middle-seats">
            {Array.from({ length: formData.seatDistribution.row2 }).map(
              (_, index) => (
                <input
                  key={`row2-seat${index}`}
                  value={formData.seatNames.row2[index] || ""}
                  onChange={(event) => handleSeatClick("row2", index, event)}
                  className="seat-input"
                />
              )
            )}
            {customizeCar && (
              <>
                <button onClick={() => removeSeat("row2")}>-</button>
                <button onClick={() => addSeat("row2")}>+</button>
              </>
            )}
          </div>
          {/* row 3 */}
          <div className="back-seats">
            {Array.from({ length: formData.seatDistribution.row3 }).map(
              (_, index) => (
                <input
                  key={`row3-seat${index}`}
                  value={formData.seatNames.row3[index] || ""}
                  onChange={(event) => handleSeatClick("row3", index, event)}
                  className="seat-input"
                />
              )
            )}
            {customizeCar && (
              <>
                <button onClick={() => removeSeat("row3")}>-</button>
                <button onClick={() => addSeat("row3")}>+</button>
              </>
            )}
          </div>

          {/* row 4 */}
          <div className="back-seats">
            {Array.from({ length: formData.seatDistribution.row4 }).map(
              (_, index) => (
                <input
                  key={`row4-seat${index}`}
                  value={formData.seatNames.row4[index] || ""}
                  onChange={(event) => handleSeatClick("row4", index, event)}
                  className="seat-input"
                />
              )
            )}
            {customizeCar && (
              <>
                <button onClick={() => removeSeat("row4")}>-</button>
                <button onClick={() => addSeat("row4")}>+</button>
              </>
            )}
          </div>

          {/* row 5 */}
          <div className="back-seats">
            {Array.from({ length: formData.seatDistribution.row5 }).map(
              (_, index) => (
                <input
                  key={`row5-seat${index}`}
                  value={formData.seatNames.row5[index] || ""}
                  onChange={(event) => handleSeatClick("row5", index, event)}
                  className="seat-input"
                />
              )
            )}
            {customizeCar && (
              <>
                <button onClick={() => removeSeat("row5")}>-</button>
                <button onClick={() => addSeat("row5")}>+</button>
              </>
            )}
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
          <NumSeats formData={formData} setFormData={setFormData} />
        )}
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
