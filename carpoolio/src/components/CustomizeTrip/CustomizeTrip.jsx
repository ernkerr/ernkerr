import { useEffect, useState } from "react";
import { useContext } from "react";
import hexRgb from "hex-rgb";
import TripName from "./TripName/TripName.jsx";
import DateSelector from "./DateSelector/DateSelector.jsx";
import Destination from "./Destination/Destination.jsx";
import TripBackground from "./TripBackground";
import RenderCar from "../CustomizeTrip/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import Description from "./Description/Description.jsx";
import "./CustomizeTrip.css";
import { TripContext } from "@components/TripContext";

export default function CustomizeTrip({ isPreviewingTrip }) {
  const { formData, setFormData } = useContext(TripContext); // Access TripContext here
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
    setNewCarCreated(true);
    setIsCustomizingCar(true);
  };

  // styling
  const handleGlowColorChange = (event) => {
    const newGlowColor = event.target.value;
    const { red: r, green: g, blue: b } = hexRgb(newGlowColor);
    const lighterGlowColor = `rgb(${Math.min(r + 10, 255)}, ${Math.min(
      g + 10,
      255
    )}, ${Math.min(b + 10, 255)})`;
    const transparentGlowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;

    setFormData((prevData) => ({
      ...prevData,
      glowColor: newGlowColor,
      lighterGlowColor: lighterGlowColor,
      transparentGlowColor: transparentGlowColor,
    }));
  };

  return (
    <div className="customize-trip-container">
      <div className="details-container">
        <TripName isPreviewingTrip={isPreviewingTrip} />
        <Destination isPreviewingTrip={isPreviewingTrip} />
        <DateSelector isPreviewingTrip={isPreviewingTrip} />
        <Description isPreviewingTrip={isPreviewingTrip} />

        {!isPreviewingTrip && (
          <div className="styling-container">
            <TripBackground />
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
                value={formData?.glowColor || " #34bd34"}
                onChange={handleGlowColorChange} // update the glow color on change
              />
            </button>
          </div>
        )}
      </div>
      <div className="car-container">
        {formData?.cars?.map((car, index) => {
          if (index === activeCarIndex && isCustomizingCar) {
            return (
              <CustomizeCar
                key={index}
                activeCarIndex={activeCarIndex}
                setActiveCarIndex={setActiveCarIndex}
                setIsCustomizingCar={setIsCustomizingCar}
              />
            );
          } else {
            return (
              <RenderCar
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
        className="customize-trip-glow-btns"
        id="new-car-btn"
        style={{
          background:
            formData?.tripBackground?.scrim || formData.transparentGlowColor,
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
      >
        + add a car
      </button>
    </div>
  );
}
