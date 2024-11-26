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

export default function CustomizeTrip({
  isPreviewingTrip,
  // setIsPreviewingTrip,
  // destinationInfo,
  isAdmin,
}) {
  const { formData, setFormData } = useContext(TripContext); // access TripContext here
  const [destinationModal, setDestinationModal] = useState(false);
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isShowingStyleOptions, setIsShowingStyleOptions] = useState(false);
  const [isNewCarVisible, setIsNewCarVisible] = useState(false);
  // const [autoAddCar, setAutoAddCar] = useState(false);

  const handleDestinationModal = () => {
    setDestinationModal((prev) => !prev);
    console.log("destination modal state changed");
  };

  // handle get directions
  const isAddress = formData?.destination && formData.destination.includes(","); // Check if destination has a comma
  // check if the destination resembles an address by looking for a comma

  const handleGetDirections = () => {
    const destination = encodeURIComponent(formData?.destination || "");
    const url = `http://maps.apple.com/?q=${destination}`;
    window.open(url, "_blank");
  };

  const handleShowStyleOptions = () => {
    setIsShowingStyleOptions((prevState) => !prevState);
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

  const toggleNewCar = () => {
    setIsNewCarVisible((prev) => !prev); // Toggle visibility
  };

  const glowStyle = {
    background:
      formData?.tripBackground?.scrim || formData?.transparentGlowColor,
    border: ` 2px solid ${formData?.glowColor}`,
    boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
  };

  return (
    <div className="customize-trip-container">
      <div className="details-container">
        <TripName isPreviewingTrip={isPreviewingTrip} />
        {/* make a map */}

        <div className={isAddress ? "destination-container" : ""}>
          {/* // map  */}
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
                    className="destination-customize-trip"
                  >
                    {formData?.destination}
                  </button>
                  {destinationModal && (
                    <div
                      className="customize-trip-modal"
                      style={{
                        backgroundImage: `url(${
                          formData?.tripBackground?.path || bluegoo
                        })`,
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="customize-trip-modal-content">
                        <p id="edit-dest-btn">edit your destination: </p>
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

        <>
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
                      style={{
                        background:
                          formData?.tripBackground?.scrim || "transparent",
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
              </>
            )}
          </>
        </>
      </div>

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
            <NewCar autoAddCar={true} setAutoAddCar={setAutoAddCar} />
            <button
              className="customize-trip-btn"
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
    </div>
  );
}

// else if no coordinates
//  const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)
