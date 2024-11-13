import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";
import GetTripName from "../components/NewTripForm/GetTripName";
import GetTripDate from "../components/NewTripForm/GetTripDate";
import GetDestination from "../components/NewTripForm/GetDestination";
import axios from "axios";
import { TripContext } from "@/components/TripContext";

import NewEvent from "@components/NewEvent/NewEvent.jsx";

export default function NewTripForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(TripContext);
  const [page, setPage] = useState(0);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(false); // New state for CustomizeTrip

  // onboarding:
  // step 1: NewEvent
  // step 2: NewCar
  // step 3: Share

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        // return <GetTripName />;
        return <NewEvent />;
      case 1:
        return <GetDestination />;
      case 2:
        return <GetTripDate />;

      case 3:
        return <CustomizeTrip isPreviewingTrip={isPreviewingTrip} />;
    }
  };

  function handleNext() {
    setPage(page + 1);
  }

  function handlePreview() {
    setIsPreviewingTrip(true);
  }

  function handleEdit() {
    setIsPreviewingTrip(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/trip",
        formData
      ); // send formData object to the server

      if (response.status === 201) {
        const { tripId, adminId } = response.data; // create admin id
        console.log("Trip created:", response.data);
        navigate(`/trip/${tripId}/${adminId}`); // navigate to the trip page using tripId and adminId
      } else {
        console.log("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div
      className="full-screen-wrapper"
      style={{
        backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
        backgroundPosition: "center",
      }}
    >
      {conditionalComponent()}
      <div className="button-group">
        {page !== 0 && page !== 3 && (
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            }}
            className="glow-button"
            onClick={() => setPage(page - 1)}
          >
            back
          </button>
        )}
        {/* Show the continue button on all pages except page 4 */}
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
        {/* save trip functionality  */}
        {page > 2 && (
          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            }}
            className="customize-trip-glow-btns"
            onClick={handleSave}
          >
            save
          </button>
        )}
      </div>
    </div>
    // </div>
    // </div>
  );
}
