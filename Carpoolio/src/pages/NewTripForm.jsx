import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";

import GetTripDate from "../components/NewTripForm/GetTripDate";
import axios from "axios";
import { TripContext } from "@/components/TripContext";

import ProgressBar from "../components/ProgressBar";
import NewEvent from "@components/NewEvent/NewEvent.jsx";
import NewCar from "@components/NewCar/NewCar.jsx";

export default function NewTripForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(TripContext);
  const [page, setPage] = useState(0);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false); // New state for CustomizeTrip
  const [currentStep, setCurrentStep] = useState(1);

  // onboarding:
  // step 1: NewEvent
  // step 2: NewCar
  // step 3: Share

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        // return <GetTripName />;
        return <NewEvent onNext={handleNext} />;
      case 1:
        return <NewCar onNext={handleNext} />;
      case 2:
        return <CustomizeTrip isPreviewingTrip={isPreviewingTrip} />;
    }
  };

  function handleBack() {
    setPage(page - 1);
    setCurrentStep(currentStep - 1);
  }

  function handlePreview() {
    setIsPreviewingTrip(true);
  }

  function handleEdit() {
    setIsPreviewingTrip(false);
  }

  // hitting next creates a trip in the backend
  const handleNext = async (e) => {
    e.preventDefault();
    try {
      if (formData.tripId) {
        const response = await axios.put(
          // `http://192.168.0.28:8080/api/trip/${formData.tripId}`,
          `http://127.0.2.2:8080/api/trip/${formData.tripId}`, // agape
          formData
        ); // update the existing trip

        if (response.status === 200) {
          console.log("Trip updated:", response.data);
          setPage(page + 1);
          setCurrentStep(currentStep + 1);
        } else {
          console.log("Failed to update trip");
        }
      } else {
        // if trip id does not exist, create a new trip
        const response = await axios.post(
          // `http://192.168.0.28:8080/api/trip`,
          `http://127.0.2.2:8080/api/trip/`, // agape
          formData
        ); // creates a new trip in the backend

        if (response.status === 201) {
          const { tripId, adminId } = response.data; // get tripId and adminId from backend
          console.log("Trip created:", response.data);

          setFormData((prevFormData) => ({
            // save tripId and adminId to formData
            ...prevFormData,
            tripId,
            adminId,
          }));

          setPage(page + 1);
          setCurrentStep(currentStep + 1);
          // navigate(`/trip/${tripId}/${adminId}`); // navigate to the trip page using tripId and adminId
          // if page = 3 where you can edit/share, navigate to ^
        } else {
          console.log("Failed to create trip");
        }
      }
    } catch (error) {
      console.error("Error processing trip:", error);
    }
  };

  return (
    <>
      <div
        className="full-screen-wrapper"
        style={{
          backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
          backgroundPosition: "center",
        }}
      >
        <ProgressBar currentStep={currentStep} />
        {conditionalComponent()}
        {/* back button  */}
        <div className="button-group">
          {page !== 0 && page !== 3 && (
            <button className="back-btn" onClick={handleBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
          )}
          {/* next btn */}
          {page <= 2 && (
            <button
              style={{
                background:
                  formData?.tripBackground?.scrim ||
                  formData?.transparentGlowColor,
                border: ` 1px solid ${formData?.glowColor}`,
                boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              }}
              className="primary-btn"
              onClick={handleNext}
            >
              Next
            </button>
          )}

          {/* on next, save to backend  */}
          {page > 2 &&
            (isPreviewingTrip ? (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                className="glow-button"
                onClick={handleEdit}
              >
                edit
              </button>
            ) : (
              <button
                style={{
                  background: formData?.tripBackground?.scrim || "transparent",
                  border: ` 2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                className="customize-trip-glow-btns"
                onClick={handlePreview}
              >
                preview
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
