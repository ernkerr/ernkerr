// EditCar.jsx
import { useState } from "react";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";

export default function EditCar({ car, onUpdate }) {
  const [carColor, setCarColor] = useState(car.carColor);
  const [seatNames, setSeatNames] = useState(car.seatNames);
  const [seatDistribution, setSeatDistribution] = useState(
    car.seatDistribution
  );

  const handleSeatClick = (row, seatIndex, event) => {
    const newSeatNames = { ...seatNames }; // create a copy of seat names
    newSeatNames[row][seatIndex] = event.target.value; // update the specific seat name in the row
    setSeatNames(newSeatNames);
  };

  const addSeat = (row) => {
    const newSeats = { ...seatDistribution };
    if (newSeats[row] < 3) {
      // add a seat if there are less than 3 seats in the row
      newSeats[row]++;
      setSeatDistribution(newSeats);
    }
  };

  const removeSeat = (row) => {
    const newSeats = { ...seatDistribution };
    if (newSeats[row] > 0) {
      newSeats[row]--;
      setSeatDistribution(newSeats);
    }
  };

  const changeCarColor = (event) => {
    const newColor = event.target.value;
    setCarColor(newColor);
  };

  const handleSaveChanges = () => {
    onUpdate({
      ...car,
      carColor,
      seatNames,
      seatDistribution,
    });
  };

  return (
    <div className="edit-car-container">
      <DefaultCar carColor={carColor} />
      <div>
        <label>Change Car Color</label>
        <input type="color" value={carColor} onChange={changeCarColor} />
      </div>

      {["row1", "row2", "row3"].map((row) => (
        <div key={row} className="seat-row">
          <button onClick={() => removeSeat(row)}>-</button>
          {Array.from({ length: seatDistribution[row] }).map((_, index) => (
            <input
              key={`${row}-seat${index}`}
              value={seatNames[row][index] || ""}
              onChange={(event) => handleSeatClick(row, index, event)}
            />
          ))}
          <button onClick={() => addSeat(row)}>+</button>
        </div>
      ))}

      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}
