import { useEffect, useState, useContext, useRef } from "react";
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
import NewCar from "../NewCar/NewCar.jsx";
import bluegoo from "../../assets/gifs/bluegoo.gif";

import DestinationMap from "../Destination/DestinationMap.jsx";

export default function CustomizeTrip({ isAdmin }) {
  const { formData, setFormData } = useContext(TripContext); // access TripContext here
  const [destinationModal, setDestinationModal] = useState(false);
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isShowingStyleOptions, setIsShowingStyleOptions] = useState(false);
  const [isNewCarVisible, setIsNewCarVisible] = useState(false);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false); // New state for CustomizeTrip

  const handleDestinationModal = () => {
    setDestinationModal((prev) => !prev);
    console.log("destination modal state changed");
  };

  // handle get directions
  // check if the destination resembles an address by looking for a comma
  const isAddress = formData?.destination && formData.destination.includes(","); // Check if destination has a comma

  const handleGetDirections = () => {
    const destination = encodeURIComponent(formData?.destination || "");
    const url = `http://maps.apple.com/?q=${destination}`;
    window.open(url, "_blank");
  };

  // styling
  const handleShowStyleOptions = () => {
    setIsShowingStyleOptions((prevState) => !prevState);
  };

  // change glow color
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

  // toggle visibility of NewCar component
  const toggleNewCar = () => {
    setIsNewCarVisible((prev) => !prev); // toggle visibility
  };

  // style for dynamic glow
  const glowStyle = {
    background:
      formData?.tripBackground?.scrim || formData?.transparentGlowColor,
    border: ` 2px solid ${formData?.glowColor}`,
    boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
  };

  // style for modal
  const modalStyle = {
    backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
    backgroundPosition: "center",
  };

  const handlePreviewToggle = () => {
    setIsPreviewingTrip((prev) => !prev);
  };

  return (
    <div className="customize-trip-container">
      <>
        <TripName isPreviewingTrip={isPreviewingTrip} />

        <div className={isAddress ? "destination-container" : ""}>
          {/* make a map */}
          <DestinationMap address={formData?.destination} />

          <div className="address-directions-container">
            <div className={isAddress ? "address-container" : ""}>
              {isAddress ? (
                <>
                  <img
                    className="location-icon"
                    src={locationIcon}
                    alt="Location Icon"
                  />
                  <button
                    onClick={handleDestinationModal}
                    className="destination-modal-btn"
                  >
                    {formData?.destination}
                  </button>
                  {destinationModal && (
                    <div className="customize-trip-modal" style={modalStyle}>
                      <div className="customize-trip-modal-content">
                        <p id="edit-destination">edit your destination: </p>
                        <Destination />
                      </div>
                      <button
                        className="customize-trip-btn"
                        id="done-btn"
                        style={glowStyle}
                        onClick={handleDestinationModal}
                      >
                        done
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Destination isPreviewingTrip={isPreviewingTrip} />
              )}
            </div>
            {isAddress && (
              <>
                <button
                  className="get-directions-btn"
                  onClick={handleGetDirections}
                >
                  <img
                    className="nav-arrow"
                    src={navArrow}
                    alt="Navigational Arrow"
                  />
                  Get Directions
                </button>
              </>
            )}
          </div>
        </div>

        <div className="date-selector">
          <DateSelector isPreviewingTrip={isPreviewingTrip} />
        </div>

        <Description isPreviewingTrip={isPreviewingTrip} />

        <div>
          {isPreviewingTrip && (
            <button
              onClick={toggleNewCar}
              className="add-car-btn"
              style={glowStyle}
            >
              + Add Car
            </button>
          )}

          <>
            {!isPreviewingTrip && (
              <>
                <button
                  className="style-options-btn"
                  style={glowStyle}
                  onClick={handleShowStyleOptions}
                >
                  {isShowingStyleOptions ? "Close" : "Style Options"}
                </button>
                {isShowingStyleOptions && (
                  <>
                    <TripBackground />

                    <button
                      className="style-btns"
                      id="glow-color-picker"
                      // style={{
                      //   background:
                      //     formData?.tripBackground?.scrim || "transparent",
                      // }}
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
              </>
            )}
          </>
        </div>
      </>

      {/* Render NewCar component conditionally */}
      {isNewCarVisible && (
        <>
          <div
            className="customize-trip-modal"
            style={{
              backgroundImage: `url(${
                formData?.tripBackground?.path || bluegoo
              })`,
              backgroundPosition: "center",
            }}
          >
            <NewCar />
            <button
              className="next-modal-btn"
              style={glowStyle}
              onClick={() => {
                setIsNewCarVisible(false); // close new car modal when done
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

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

      {isAdmin && (
        <button
          className="editBtn"
          style={{
            background: "none",
            border: ` 1px solid ${formData?.glowColor}`,
            boxShadow: `0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
          }}
          onClick={handlePreviewToggle}
        >
          {isPreviewingTrip ? (
            <svg height="1em" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          ) : (
            "Preview"
          )}
        </button>
      )}
    </div>
  );
}

// {isAdmin ? (
//   isPreviewingTrip ? (
//     <button
//       className="editBtn"
//       style={{
//         background: formData?.transparentGlowColor || "transparent",
//         border: `2px solid ${formData?.glowColor}`,
//         boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
//       }}
//       onClick={handleEdit}
//     >
//       <svg height="1em" viewBox="0 0 512 512">
//         <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
//       </svg>
//     </button>
//   ) : (
//     <button
//       className="saveBtn"
//       style={{
//         background: formData?.transparentGlowColor || "transparent",
//         border: `2px solid ${formData?.glowColor}`,
//         boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
//       }}
//       onClick={handleSave}
//     >
//       Preview
//     </button>
//   )}

// else if no coordinates
//  const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)
