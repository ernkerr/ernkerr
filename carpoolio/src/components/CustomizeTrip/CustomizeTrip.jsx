import { useState } from "react";
import hexRgb from "hex-rgb";
import TripName from "./TripName";
import TripDate from "./TripDate";
import { DepartureTime } from "./DepartureTime";
import Destination from "./Destination";
import TripBackground from "./TripBackground";
import NewCarButton from "../NewCarButton/NewCarButton.jsx";
import "./CustomizeTrip.css";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";

export default function CustomizeTrip({ formData, setFormData }) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  function handleClick() {
    // add to database
    // create a dynamic route
    console.log("send data to database");
    console.log(formData);
  }

  function handleNewCar() {
    <NewCarButton />;
  }

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
      glowColorGradient: lighterGlowColor,
    }));
  };

  return (
    <div className="customize-trip">
      <TripName formData={formData} />
      <Destination formData={formData} setFormData={setFormData} />
      {/* Set a Date */}
      <>
        <button
          style={{
            background: formData?.tripBackground?.scrim || "transparent",
          }}
          className="customize-trip-btns"
          onClick={toggleCalendar}
        >
          {formData.tripDate ? formData.tripDate : "Set a date"}
        </button>
        {/* Show Calendar  */}
        {isCalendarVisible && (
          <TripDate
            formData={formData}
            setFormData={setFormData}
            onClose={toggleCalendar}
          />
        )}
        {isCalendarVisible && (
          <div className="calendar-button-container">
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className="calendar-button"
              onClick={() => {
                toggleCalendar();
                formData.tripDate = "TBD";
              }}
            >
              Not sure yet
            </button>
            <button
              style={{
                background: formData?.tripBackground?.scrim || "transparent",
              }}
              className="calendar-button"
              onClick={() => {
                toggleCalendar();
              }}
            >
              okay
            </button>
          </div>
        )}
      </>
      {/* Set a Departure Time  */}
      {/* {isCalendarVisible ?? ()} */}
      <DepartureTime formData={formData} setFormData={setFormData} />
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

      {/* Render Cars  */}
      {formData.cars?.length > 0 && ( // check if there are cars in the cars array
        <>
          {formData.cars.map(
            (
              car,
              index // loop through each car in the cars array and render it's details // provide a unique key for each car
            ) => (
              <div key={index}>
                <CustomizeCar
                  formData={car} // pass the specific car data to the component
                  setFormData={(updatedCarData) => {
                    const updatedCars = formData.cars.map(
                      (
                        c,
                        carIndex // update only the car that was edited
                      ) =>
                        carIndex === index ? { ...c, ...updatedCarData } : c // if the current index matches a car index, merge the updatedCarData into that car's data
                    );
                    setFormData({ ...formData, cars: updatedCars }); // update the entire formData to save the changes in updatedCars
                  }}
                />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
