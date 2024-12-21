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
  const [isAddress, setIsAddress] = useState(
    formData?.destination?.location != null
  ); // set initial state based on initial destination
  //
  const [isCustomizingCar, setIsCustomizingCar] = useState(false);
  const [activeCarIndex, setActiveCarIndex] = useState(null);
  const [isNewCarVisible, setIsNewCarVisible] = useState(false);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false); // state for invite btn modal

  // useEffect(() => {
  //   console.log("isAddress: ", isAddress);
  // }, [isAddress]);

  useEffect(() => {
    // once address changes setIsAddress based on the new value of destination;
    setIsAddress(formData?.destination?.location != null);
    // console.log("is address? ", isAddress);
    // if (!isAddress) {
    //   console.log({ el: selectDestinationInputRef.current });
    //   selectDestinationInputRef.current?.focus();
    // }
    console.log(
      "destination location changed: ",
      formData?.destination?.location
    );
  }, [formData.destination?.location]); // when destination is changed, check to see it lat/lng is avaliable

  const handleEditDestination = () => {
    setIsAddress(false); // remove map, location, icon, etc.
  };

  // const selectDestinationInputRef = useRef();

  const handleGetDirections = () => {
    const destination = encodeURIComponent(
      formData?.destination?.address || ""
    );
    const url = `http://maps.apple.com/?q=${destination}`;
    window.open(url, "_blank");
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
  // const modalStyle = {
  //   backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
  //   backgroundPosition: "center",
  // };

  // sync changes in backend
  useEffect(
    () => {
      const updateTripDetails = async () => {
        try {
          console.log(
            "trying to update trip destination: ",
            formData.destination
          );
          console.log(
            "Sending the following data to update the trip:",
            formData
          ); // Log the entire formData

          const response = await axios.put(
            `${API_BASE_URL}/api/trip/${formData.tripId}`, // update the trip in the backend
            formData
          );
          if (response.status === 200) {
            console.log("trip update sucess! yes! ", response.data);
          }
        } catch (error) {
          console.error("houston, we have an error: ", error);
          if (error.response) {
            console.error("Error response from server:", error.response);
            console.error("Error status code:", error.response.status);
            console.error("Error details:", error.response.data);
            // Log the full error response for debugging
            console.error("Server error details: ", error.response);
          } else {
            console.error("Network or other error: ", error);
          }
        }
      };

      // console.log("Axios configuration:", {
      //   baseURL: API_BASE_URL,
      //   url: `${API_BASE_URL}/api/trip/${formData.tripId}`,
      //   data: formData,
      // });

      const debounceTimer = setTimeout(() => {
        updateTripDetails(); // call after the debounce time
      }, 1000); // debounce to prevent excessive API calls

      return () => clearTimeout(debounceTimer);
    },
    [formData],
    [formData.cars]
  );

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

        {isAddress ? (
          <div
            className="destination-container"
            style={formResponseStyle({ formData, isPreviewingTrip })}
          >
            {/* make a map */}
            <DestinationMap destination={formData?.destination} />
            <div className="address-directions-container">
              <div className="address-container">
                <>
                  <img
                    className="location-icon"
                    src={locationIcon}
                    alt="Location Icon"
                  />
                  <button
                    onClick={handleEditDestination}
                    className="destination-btn"
                  >
                    {formData?.destination?.name}
                  </button>
                </>
              </div>

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
            </div>
          </div>
        ) : (
          <>
            <Destination isPreviewingTrip={isPreviewingTrip} />
          </>
        )}

        <div className="date-selector">
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
            <NewCar
              triggerHandleYes={true}
              onCloseNewCar={() => setIsNewCarVisible(false)} // Pass callback
            />
            <button
              className="primary-btn"
              style={glowStyle}
              onClick={() => {
                setIsNewCarVisible(false); // close new car modal when done
              }}
            >
              Save
            </button>
          </div>
        </>
      )}
      {/* mildly unacceptable prop drilling but it works so here is some explanation to understand :/ */}
      {/* to update setIsNewCarVisible in NewCar (to get back to customizing trip) when a car is deleted  */}
      {/* we need to pass a callback function as a prop from CustomizeTrip->NewCar */}
      {/* to use this in NewCar you just accept onCloseNewCar callback as a prop and call it when a car is deleted */}

      <>
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
      </>
    </div>
  );
}
