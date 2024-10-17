import { useState, useEffect } from "react";
import DefaultCar from "../CustomizeCar/DefaultCar.jsx";

export default function NewCar({ formData, setFormData }) {
  return (
    <>
      <div className="car-container">
        <DefaultCar
          carColor="#216191"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="seat-container">
          {/* row 1 */}
          <div className="seat-row">
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
          </div>
          {/* row 2 */}
          <div className="seat-row">
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
          </div>
          {/* row 3 */}
          <div className="seat-row">
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
          </div>

          {/* row 4 */}
          <div className="seat-row">
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
          </div>
        </div>
      </div>
      <></>
    </>
  );
}
