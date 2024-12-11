import { useEffect, useState, useContext, useRef } from "react";
import { TripContext } from "@components/TripContext";
import hexRgb from "hex-rgb";
import axios from "axios";

import DateSelector from "@components/DateSelector/DateSelector.jsx";
import TripBackground from "@components/TripBackground.jsx";
import TripOverlay from "../TripOverlay.jsx";
import RenderCar from "../RenderCar/RenderCar.jsx";
import CustomizeCar from "../CustomizeCar/CustomizeCar.jsx";
import Description from "@components/Description/Description.jsx";
import Destination from "../Destination/Destination.jsx";
import TripName from "../TripName.jsx";
import NewCar from "../NewCar/NewCar.jsx";

import DestinationMap from "../Destination/DestinationMap.jsx";
import navArrow from "../../assets/img/navarrow.png";
import locationIcon from "../../assets/img/location-icon.png";

import bluegoo from "../../assets/gifs/bluegoo.gif";
import { formResponseStyle, glowBtn } from "@styles/styles";
import "./CustomizeTrip.css";
import MoreBtn from "../MoreBtn/MoreBtn.jsx";
import InviteBtn from "../InviteBtn/InviteBtn.jsx";
import EditBtn from "../EditBtn/EditBtn.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CustomizeTrip({ isAdmin }) {
  const { formData, setFormData } = useContext(TripContext); // access TripContext here
  const [destinationModal, setDestinationModal] = useState(false);
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isShowingStyleOptions, setIsShowingStyleOptions] = useState(false);
  const [isNewCarVisible, setIsNewCarVisible] = useState(false);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(true);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // state for invite btn modal

  const handleDestinationModal = () => {
    setDestinationModal((prev) => !prev);
    console.log("destination modal state changed");
  };

  // handle get directions
  // check if the destination resembles an address (some form of truth?) by looking for a comma
  // not the best way to do this
  // BUG IT IS BUG
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

  const togglePreview = () => {
    setIsPreviewingTrip((prev) => !prev);
  };

  // toggle visibility of NewCar modal (open/close)
  const toggleNewCar = () => {
    setIsNewCarVisible((prev) => !prev); // toggle visibility
  };

  // style for dynamic glow
  const glowStyle = {
    background:
      formData?.tripBackground?.scrim || formData?.transparentGlowColor,
    border: ` 2px solid ${formData?.glowColor}`,
    boxShadow: `inset 0 0 5px ${formData?.glowColor}, 0 0 10px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
  };

  // style for modal
  const modalStyle = {
    backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
    backgroundPosition: "center",
  };

  // sync changes in backend
  useEffect(
    () => {
      const updateTripDetails = async () => {
        // validate to make sure tripId exists
        try {
          const response = await axios.put(
            `${API_BASE_URL}/api/trip/${formData.tripId}`, // update the trip in the backend
            formData
          );
          if (response.status === 200) {
            console.log("trip update sucess! yes! ", response.data);
          }
        } catch (error) {
          console.error("houston, we have an error: ", error);
        }
      };

      const debounceTimer = setTimeout(() => {
        updateTripDetails(); // call after the debounce time
      }, 1000); // debounce to prevent excessive API calls

      return () => clearTimeout(debounceTimer);
    },
    [formData],
    [formData.cars]
  );

  // const triggerHandleYes = () => {
  //   console.log();
  // };

  return (
    <div className="customize-trip-container">
      <>
        {/* {!isPreviewingTrip && <p>Edit Event</p>} */}
        <InviteBtn
          isVisible={isInviteModalVisible}
          setIsVisible={setIsInviteModalVisible}
        />
        <MoreBtn
          isAdmin={isAdmin}
          isPreviewingTrip={isPreviewingTrip}
          togglePreview={togglePreview}
          isInviteModalVisible={isInviteModalVisible}
          setIsInviteModalVisible={setIsInviteModalVisible}
        />

        <TripName isPreviewingTrip={isPreviewingTrip} />

        <div
          className={isAddress ? "destination-container" : ""}
          style={formResponseStyle({ formData, isPreviewingTrip })}
        >
          {/* make a map */}
          {isAddress && <DestinationMap address={formData?.destination} />}

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
                        className="next-modal-btn "
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
          {/* <div
          className={isAddress ? "destination-container" : ""}
          style={formResponseStyle({ formData, isPreviewingTrip })}
        ></div> */}
          <DateSelector isPreviewingTrip={isPreviewingTrip} />
        </div>

        <Description isPreviewingTrip={isPreviewingTrip} />

        <>
          {isPreviewingTrip && (
            <button
              onClick={toggleNewCar} // toggle the NewCar modal
              className="glow-btn"
              id="add-car-btn"
              style={glowBtn(formData)}
            >
              + add a car
            </button>
          )}

          <>
            {!isPreviewingTrip && (
              <>
                <EditBtn
                  isAdmin={isAdmin}
                  isPreviewingTrip={isPreviewingTrip}
                  togglePreview={togglePreview}
                />
                <TripBackground isPreviewingTrip={isPreviewingTrip} />

                <TripOverlay />
                <button
                  className="style-btns"
                  id="glow-color-picker"
                  style={{
                    background: isPreviewingTrip
                      ? "transparent"
                      : formData?.tripBackground?.scrim || undefined,
                    pointerEvents: isPreviewingTrip ? "none" : "auto",
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
        </>
      </>

      {/* render NewCar component conditionally */}
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
            {/* pass handler to NewCar */}
            <NewCar triggerHandleYes={true} />
            <button
              className="next-modal-btn"
              style={glowStyle}
              onClick={() => {
                setIsNewCarVisible(false); // close new car modal when done
              }}
            >
              Close
            </button>
          </div>
        </>
      )}

      <div>
        {/* <div className="car-container"> */}
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
