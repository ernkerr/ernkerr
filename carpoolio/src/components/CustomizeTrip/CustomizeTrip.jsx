import { useEffect, useState } from "react";
import hexRgb from "hex-rgb";
import TripName from "./TripName";
// import { DepartureTime } from "./TimeSelector/DepartureTime.jsx";
import Destination from "./Destination";
import TripBackground from "./TripBackground";
import "./CustomizeTrip.css";
import RenderCar from "../CustomizeTrip/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import DateSelector from "./DateSelector/DateSelector.jsx";

export default function CustomizeTrip({ formData, setFormData }) {
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
    <div className="customize-trip">
      <TripName formData={formData} setFormData={setFormData} />
      <DateSelector formData={formData} setFormData={setFormData} />
      {/* Set a Departure Time  */}
      {/* {isCalendarVisible ?? ()} */}
      {/* <DepartureTime formData={formData} setFormData={setFormData} /> */}
      <Destination formData={formData} setFormData={setFormData} />
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
          value={formData.glowColor || "#04aa6d"}
          onChange={handleGlowColorChange} // update the glow color on change
        />
      </button>

      <button
        onClick={handleAddNewCar}
        className="glow-button"
        style={{
          background: formData?.tripBackground?.scrim || "transparent",
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
      >
        add a car
      </button>
      {/* // style it like a plus in the bottom corner + add a car  */}

      {/* 
        cars = [
          {
            'color': 'red',
            'seatDistribution': ['jam', 'ern', 'joris']
          },
          {
            'color': 'grey',
          },
        ]
      */}
      {/* 5 cars | activeCarIndex = 3 */}
      {/* Check if formData.cars exists and has more than 0 items */}
      {/* {formData.cars?.length > 0 && */}
      {formData.cars.map((car, index) => {
        if (index === activeCarIndex && isCustomizingCar) {
          return (
            <CustomizeCar
              key={index}
              formData={formData}
              setFormData={setFormData}
              activeCarIndex={activeCarIndex}
              setActiveCarIndex={setActiveCarIndex}
              setIsCustomizingCar={setIsCustomizingCar}
            />
          );
        } else {
          return (
            <RenderCar
              formData={formData}
              setFormData={setFormData}
              key={index}
              car={car}
              carIndex={index}
              setIsCustomizingCar={setIsCustomizingCar}
              setActiveCarIndex={setActiveCarIndex}
            />
          );
        }
      })}
    </div>
  );
}
