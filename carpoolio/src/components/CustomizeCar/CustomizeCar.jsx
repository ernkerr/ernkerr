import { useState, useEffect } from "react";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";

/**
 * cars = [
 *  {
 *      'name': 'jammydodger',
 *      'color': 'red'
 *  }
 * ]
 */

//   console.log("Send car to database");
//   console.log(newCar);
//   console.log(formData.cars);

export default function CustomizeCar({
  formData,
  setFormData,
  activeCarIndex,
  setIsCustomizingCar,
}) {
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

  useEffect(() => {
    console.log({
      carColor,
      numSeats,
      seatNames,
      seatDistribution,
    });
  }, [carColor, numSeats, seatNames, seatDistribution]);

  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor); // update local state to preview
    console.log(`new car color: ${newColor}`);
    console.log(`activeCarIndex: ${activeCarIndex}`);
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
        // add changes here
        // view changes in the state then save them to form data on save car
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
          carColor={carColor}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="render-seat-container">
          {/* row 1 */}
          <div className="render-seat-row">
            <button onClick={() => removeSeat("row1")}>-</button>

            {Array.from({ length: seatDistribution.row1 }).map((_, index) => (
              <input
                key={`row1-seat${index}`}
                value={seatNames.row1[index] || ""}
                onChange={(event) => handleSeatClick("row1", index, event)}
                className="seat-input"
              />
            ))}
            <button onClick={() => addSeat("row1")}>+</button>
          </div>
          {/* row 2 */}
          <div className="render-seat-row">
            <button onClick={() => removeSeat("row2")}>-</button>

            {Array.from({ length: seatDistribution.row2 }).map((_, index) => (
              <input
                key={`row2-seat${index}`}
                value={seatNames.row2[index] || ""}
                onChange={(event) => handleSeatClick("row2", index, event)}
                className="seat-input"
              />
            ))}
            <button onClick={() => addSeat("row2")}>+</button>
          </div>
          {/* row 3 */}
          <div className="render-seat-row">
            <button onClick={() => removeSeat("row3")}>-</button>

            {Array.from({ length: seatDistribution.row3 }).map((_, index) => (
              <input
                key={`row3-seat${index}`}
                value={seatNames.row3[index] || ""}
                onChange={(event) => handleSeatClick("row3", index, event)}
                className="seat-input"
              />
            ))}
            <button onClick={() => addSeat("row3")}>+</button>
          </div>

          {/* row 4 */}
          <div className="render-seat-row">
            <button onClick={() => removeSeat("row4")}>-</button>

            {Array.from({ length: seatDistribution.row4 }).map((_, index) => (
              <input
                key={`row4-seat${index}`}
                value={seatNames.row4[index] || ""}
                onChange={(event) => handleSeatClick("row4", index, event)}
                className="seat-input"
              />
            ))}
            <button onClick={() => addSeat("row4")}>+</button>
          </div>
        </div>
      </div>
      <>
        {/* <NumSeats formData={formData} setFormData={setFormData} /> */}

        <p className="custom-car-option">
          Number of avaliable seats: {numSeats}
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
            // Temporary
            position: "absolute",
            bottom: 0,
            right: 0,
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

//logic for if you want to add a new car and have it calculate how many seats per row based on numSeats
//maybe l8r
//   const handleSeatDistribution = () => {
//     const totalSeats = formData.numSeats; // account for the driver

//     // default seat distribution
//     const defaultFrontSeats = Math.min(2, totalSeats); // at least two front seats if there are seats
//     const defaultMiddleSeats = Math.min(3, totalSeats - defaultFrontSeats); // middle row gets remaining seats, max 3
//     const defaultBackSeats = Math.min(
//       3,
//       totalSeats - (defaultFrontSeats + defaultMiddleSeats)
//     ); // assign remaining seats to back, max 3
//     const remainingSeats =
//       totalSeats - (defaultFrontSeats + defaultMiddleSeats + defaultBackSeats);

//     // divide the seats into rows (max 3 seats per row)
//     const newSeats = {
//       row1: defaultFrontSeats, // front seats
//       row2: defaultMiddleSeats, // middle seats
//       row3: defaultBackSeats, // back seats
//       row4: Math.min(3, remainingSeats), // assign remaining seats to row 4
//     };

// const newSeatNames = {
//   // do I need?
//   // initialize seat names if they don't exist
//   row1: formData.cars[activeCarIndex].seatNames?.row1 || [],
//   row2: formData.cars[activeCarIndex].seatNames?.row2 || [],
//   row3: formData.cars[activeCarIndex].seatNames?.row3 || [],
//   row4: formData.cars[activeCarIndex].seatNames?.row4 || [],
// };

// update formData with new seat distribution and names

// setFormData({
//   ...formData,
//   seatDistribution: newSeats,
//   seatNames: newSeatNames,
// });
//   };
