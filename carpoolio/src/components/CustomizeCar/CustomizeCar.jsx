import { useState, useEffect } from "react";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";
import RenderCar from "../CustomizeTrip/RenderCar.jsx";

export default function CustomizeCar({ formData, setFormData, toggleModal }) {
  const [carColor, setCarColor] = useState("#216191");

  const handleSeatDistribution = () => {
    const totalSeats = formData.numSeats; // account for the driver

    // default seat distribution
    const defaultFrontSeats = Math.min(2, totalSeats); // at least two front seats if there are seats
    const defaultMiddleSeats = Math.min(3, totalSeats - defaultFrontSeats); // middle row gets remaining seats, max 3
    const defaultBackSeats = Math.min(
      3,
      totalSeats - (defaultFrontSeats + defaultMiddleSeats)
    ); // assign remaining seats to back, max 3
    const remainingSeats =
      totalSeats - (defaultFrontSeats + defaultMiddleSeats + defaultBackSeats);

    // divide the seats into rows (max 3 seats per row)
    const newSeats = {
      row1: defaultFrontSeats, // front seats
      row2: defaultMiddleSeats, // middle seats
      row3: defaultBackSeats, // back seats
      row4: Math.min(3, remainingSeats), // assign remaining seats to row 4
    };

    // initialize seat names if they don't exist
    const newSeatNames = {
      row1: formData.seatNames?.row1 || [],
      row2: formData.seatNames?.row2 || [],
      row3: formData.seatNames?.row3 || [],
      row4: formData.seatNames?.row4 || [],
    };

    // update formData with new seat distribution and names

    setFormData({
      ...formData,
      seatDistribution: newSeats,
      seatNames: newSeatNames,
    });
  };

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
      // add a seat if there are less than 3 seats in the row
      newSeats[row]++;
      setFormData({
        ...formData,
        seatDistribution: newSeats,
        numSeats: formData.numSeats + 1,
      });
    }
  };

  // handle removing a seat from the row
  const removeSeat = (row) => {
    const newSeats = { ...formData.seatDistribution };
    if (newSeats[row] > 0) {
      newSeats[row]--;
      setFormData({
        ...formData,
        seatDistribution: newSeats,
        numSeats: formData.numSeats - 1,
      });
    }
  };

  // change car color
  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
    setFormData({ ...formData, carColor: newColor });
  };

  const handleSaveCar = () => {
    // add car to formData
    const newCar = {
      carColor: formData.carColor,
      seatNames: formData.seatNames,
      seatDistribution: formData.seatDistribution,
    };

    setFormData((formData) => ({
      ...formData,
      cars: [
        ...(formData.cars || []), // spread the existing cars array or use an empty array if there are no cars yet
        newCar, // add the new car object to the array of saved cars
      ],
    }));

    // console.log("Closing modal...");
    toggleModal();

    // //render car
    // console.log("Attempting to render car ");
    // <RenderCar formData={formData} />;

    //functionality to send car to database with formData
    console.log("Send car to database");
    console.log(newCar);
    console.log(formData.cars);
  };

  return (
    <>
      <div className="car-container">
        <DefaultCar
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="seat-container">
          {/* row 1 */}
          <div className="seat-row">
            <button onClick={() => removeSeat("row1")}>-</button>

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
            <button onClick={() => addSeat("row1")}>+</button>
          </div>
          {/* row 2 */}
          <div className="seat-row">
            <button onClick={() => removeSeat("row2")}>-</button>

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
            <button onClick={() => addSeat("row2")}>+</button>
          </div>
          {/* row 3 */}
          <div className="seat-row">
            <button onClick={() => removeSeat("row3")}>-</button>

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
            <button onClick={() => addSeat("row3")}>+</button>
          </div>

          {/* row 4 */}
          <div className="seat-row">
            <button onClick={() => removeSeat("row4")}>-</button>

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
            <button onClick={() => addSeat("row4")}>+</button>
          </div>
        </div>
      </div>
      <>
        {/* <NumSeats formData={formData} setFormData={setFormData} /> */}

        <p className="custom-car-option">
          Number of avaliable seats: {formData.numSeats}
        </p>

        <div className="custom-car-option">
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
        <button
          className="glow-button"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
          }}
          onClick={handleSaveCar}
        >
          save car
        </button>
      </>

      {/* // spotify playlist 

            // car chat  */}

      {/* <CarIcon fill={carColor} /> {/* Set the color dynamically */}
      {/* <button className="glow-button" onClick={changeCarColor}>Change Car Color</button> */}

      {/* <h6>{formData.name}</h6> */}
    </>
  );
}
