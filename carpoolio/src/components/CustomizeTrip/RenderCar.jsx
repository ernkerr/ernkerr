import DefaultCar from "../CustomizeCar/DefaultCar";

export default function RenderCar({ formData }) {
  console.log("render car");

  return (
    <>
      {formData.cars.map((car, carIndex) => (
        <div key={carIndex} className="car-container">
          <DefaultCar
            carColor="#216191"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="seat-container">
            <div className="seat-row">
              {Array.from({ length: car.seatDistribution.row1 }).map(
                (_, index) => (
                  <input
                    key={`row1-seat${index}`}
                    value={car.seatNames.row1[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row1", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>

            <div className="seat-row">
              {Array.from({ length: car.seatDistribution.row2 }).map(
                (_, index) => (
                  <input
                    key={`row2-seat${index}`}
                    value={car.seatNames.row2[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row2", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>

            <div className="seat-row">
              {Array.from({ length: car.seatDistribution.row3 }).map(
                (_, index) => (
                  <input
                    key={`row3-seat${index}`}
                    value={car.seatNames.row3[index] || ""}
                    onChange={(event) =>
                      handleSeatClick("row3", carIndex, index, event)
                    }
                    className="seat-input"
                  />
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
