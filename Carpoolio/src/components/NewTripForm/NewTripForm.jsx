import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "@/components/TripContext";
import { glowBtn } from "@styles/styles";
import axios from "axios";
import Header from "../Header/Header";
import ProgressBar from "../ProgressBar";
import NewEvent from "@components/NewEvent/NewEvent.jsx";
import NewCar from "@components/NewCar/NewCar.jsx";
import CustomizeTrip from "@components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../../assets/gifs/bluegoo.gif";
import "./NewTripForm.css";

export default function NewTripForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(TripContext);
  const [page, setPage] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [destination, setDestination] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // onboarding:
  // step 1: NewEvent
  // step 2: NewCar

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return (
          <NewEvent
            onNext={handleNext}
            onDestinationUpdate={handleDestinationUpdate}
          />
        );
      case 1:
        return <NewCar onNext={handleNext} />;
    }
  };

  function handleBack() {
    setPage(page - 1);
    setCurrentStep(currentStep - 1);
  }

  const handleDestinationUpdate = (data) => {
    console.log("Destination updated: ", data);
    setDestination(data); // save the address and lat/lng
  };

  // hitting next updates or creates trip in the backend
  const handleNext = async (e) => {
    e.preventDefault();
    try {
      if (formData.tripId) {
        // update the existing trip
        const response = await axios.put(
          `${API_BASE_URL}/api/trip/${formData.tripId}`,
          formData
        );

        if (response.status === 200) {
          console.log("Trip updated:", response.data);

          if (page >= 1) {
            navigate(`/trip/${formData?.tripId}/${formData?.adminId}`); // navigate to the trip page using tripId and adminId
          } else {
            setPage(page + 1);
            setCurrentStep(currentStep + 1);
          }
        } else {
          console.log("Failed to update trip");
        }
      } else {
        // if trip id does not exist, create a new trip
        const response = await axios.post(
          `${API_BASE_URL}/api/trip/`,
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
        <Header />
        <>
          {page !== 0 && (
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
          <ProgressBar currentStep={currentStep} />
        </>

        {conditionalComponent()}
        {/* back button  */}
        <div className="button-group">
          {/* next btn */}
          {page <= 2 && (
            <button
              style={glowBtn(formData)}
              className="primary-btn"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
