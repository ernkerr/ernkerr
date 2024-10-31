import { useEffect, useState } from "react";
import hexRgb from "hex-rgb";
import TripName from "./TripName/TripName.jsx";
import DateSelector from "./DateSelector/DateSelector.jsx";
import Destination from "./Destination/Destination.jsx";
import TripBackground from "./TripBackground";
import RenderCar from "../CustomizeTrip/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import "./CustomizeTrip.css";
import Description from "./Description/Description.jsx";

export default function CustomizeTrip({
  formData,
  setFormData,
  isPreviewingTrip,
}) {
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [newCarCreated, setNewCarCreated] = useState(false);

  // handle add new car
  useEffect(() => {
    if (newCarCreated) {
      setActiveCarIndex(formData.cars.length - 1);
      setNewCarCreated(false);
    }
  }, [newCarCreated]);

  const handleAddNewCar = () => {
    // Add a new car to formData.cars
    // [...existingCars, new car: {}]
    const newCar = {
      carColor: "#216191",
      numSeats: 5,
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
    console.log(`active car index: ${newCarIndex}`);

    setActiveCarIndex(newCarIndex);
    setNewCarCreated(true);

    setIsCustomizingCar(true);
    console.log("entering customizing mode for new car... ");
  };

  // styling
  const handleGlowColorChange = (event) => {
    const newGlowColor = event.target.value;
    const { red: r, green: g, blue: b } = hexRgb(newGlowColor);
    // TODO : refactor so that the r, g, b are stored seperately as TINYINTs
    const lighterGlowColor = `rgb(${Math.min(r + 10, 255)}, ${Math.min(
      g + 10,
      255
    )}, ${Math.min(b + 10, 255)})`;
    // TODO: recalculate lighterGlowColor without having to store it in the database

    setFormData((prevData) => ({
      ...prevData,
      glowColor: newGlowColor,
      lighterGlowColor: lighterGlowColor,
    }));
  };

  function handleClick() {
    // add to database
    // create a dynamic route
    console.log("send data to database");
    console.log(formData);
  }

  return (
    <div className="customize-trip-container">
      <div className="details-container">
        <TripName
          formData={formData}
          setFormData={setFormData}
          isPreviewingTrip={isPreviewingTrip}
        />

        <Destination
          formData={formData}
          setFormData={setFormData}
          isPreviewingTrip={isPreviewingTrip}
        />
        <DateSelector
          formData={formData}
          setFormData={setFormData}
          isPreviewingTrip={isPreviewingTrip}
        />
        <Description
          formData={formData}
          setFormData={setFormData}
          isPreviewingTrip={isPreviewingTrip}
        />

        {!isPreviewingTrip && (
          <div className="styling-container">
            <TripBackground formData={formData} setFormData={setFormData} />
            {/* set the glow color  */}
            <button
              className="customize-trip-btns"
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
            >
              <label htmlFor="glowColor">Change Glow Color </label>
              <input
                className="glowColor"
                type="color"
                id="glowColor"
                name="glowColor"
                value={formData.glowColor || " #34bd34"}
                onChange={handleGlowColorChange} // update the glow color on change
              />
            </button>
          </div>
        )}

        <div className="customize-car-container">
          {formData.cars.map((car, index) => {
            if (index === activeCarIndex && isCustomizingCar) {
              return (
                // <div className="customize-car">
                <CustomizeCar
                  key={index}
                  formData={formData}
                  setFormData={setFormData}
                  activeCarIndex={activeCarIndex}
                  setActiveCarIndex={setActiveCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                />
                // </div>
              );
            } else {
              return (
                <RenderCar
                  formData={formData}
                  setFormData={setFormData}
                  key={index}
                  car={car}
                  carIndex={index}
                  activeCarIndex={activeCarIndex}
                  setIsCustomizingCar={setIsCustomizingCar}
                  setActiveCarIndex={setActiveCarIndex}
                />
              );
            }
          })}
        </div>
        <button
          onClick={handleAddNewCar}
          className="glow-button"
          id="new-car-btn"
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
            border: ` 2px solid ${formData.glowColor}`,
            boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
          }}
        >
          + add a car
        </button>
      </div>
    </div>
  );
}
