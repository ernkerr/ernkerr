import { useEffect, useState } from "react";
import { useContext } from "react";
import hexRgb from "hex-rgb";
import DateSelector from "@components/DateSelector/DateSelector.jsx";
import TripBackground from "@components/TripBackground.jsx";
import RenderCar from "../RenderCar/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import Description from "@components/Description/Description.jsx";
import "./CustomizeTrip.css";
import { TripContext } from "@components/TripContext";
import navArrow from "../../assets/img/navarrow.png";
import locationIcon from "../../assets/img/location-icon.png";

import Destination from "../Destination/Destination.jsx";
import TripName from "../TripName.jsx";

export default function CustomizeTrip({
  isPreviewingTrip,
  setIsPreviewingTrip,
  isAdmin,
}) {
  const { formData, setFormData } = useContext(TripContext); // Access TripContext here
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);

  const handlePreviewToggle = () => {
    setIsPreviewingTrip((prev) => !prev);
  };

  // handle get directions
  const isAddress = formData?.destination && formData.destination.includes(","); // Check if destination has a comma
  // check if the destination resembles an address by looking for a comma

  const handleGetDirections = () => {
    const destination = encodeURIComponent(formData?.destination || "");
    const url = `http://maps.apple.com/?q=${destination}`;
    window.open(url, "_blank");
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

        <div className="destination-container">
          <img
            className="location-icon"
            src={locationIcon}
            alt="Location Icon"
          />
          <Destination isPreviewingTrip={isPreviewingTrip} />
          {isAddress && (
            <button className="get-directions" onClick={handleGetDirections}>
              <img
                className="nav-arrow"
                src={navArrow}
                alt="Navigational Arrow"
              />
              Get Directions
            </button>
          )}
        </div>

        <div className="date-selector">
          <DateSelector isPreviewingTrip={isPreviewingTrip} />
        </div>

        <Description isPreviewingTrip={isPreviewingTrip} />

        <button
          className="preview-btn"
          style={{
            background:
              formData?.tripBackground?.scrim || formData?.transparentGlowColor,
            border: ` 1px solid ${formData?.glowColor}`,
            boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
          }}
          onClick={handlePreviewToggle}
        >
          {isPreviewingTrip ? "Edit Trip" : "Preview Trip"}
        </button>

        {!isPreviewingTrip && (
          <>
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
          </>
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
                setIsCustomizingCar={setIsCustomizingCar}
                setActiveCarIndex={setActiveCarIndex}
              />
            );
          }
        })}
      </div>

      {/* <button
        onClick={handleAddNewCar}
        className="new-car-btn"
        style={{
          background:
            formData?.tripBackground?.scrim || formData.transparentGlowColor,
          border: ` 2px solid ${formData.glowColor}`,
          boxShadow: `0 0 10px ${formData.glowColor}, 0 0 5px ${formData.glowColor}, 0 0 15px ${formData.lighterGlowColor}`,
        }}
      >
        + Add Car
      </button> */}
    </div>
  );
}
