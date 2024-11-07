import NewTripButton from "../components/NewTripButton/NewTripButton.jsx";
import NewCarButton from "../components/NewCarButton/NewCarButton.jsx";

// this is all repeated
// instead use Trip Page and conditionally show or hide the edit button based on whether the admin id is in the route or not

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "../components/NewTripForm/NewTripForm.css";
import "@components/CustomizeTrip/CustomizeTrip.css";
import { TripContext } from "@components/TripContext";

export default function InvitePage() {
  const { formData, setFormData } = useContext(TripContext);
  const { tripId } = useParams(); // Extract tripId and adminId from route parameters
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(true);

  // Function to fetch trip details
  const getTripDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/trip/${tripId}`);

      if (!response.ok) {
        throw new Error("Network response error");
      }

      const data = await response.json();
      setTripDetails(data); // Store the fetched data in state
      setFormData(data); // populate formData with fetched trip data
    } catch (err) {
      setError(err.message); // Store error in state if fetching fails
    }
  };

  // useEffect to call getTripDetails when component mounts
  useEffect(() => {
    getTripDetails();
  }, [tripId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if tripDetails have loaded, or show a loading state
  if (!tripDetails) {
    return <div>Loading...</div>;
  }

  // Validate the tripId
  // if (tripDetails.tripId !== tripId) {
  //   return (
  //     <div>
  //       <h1>This link is invalid for the trip: {tripId}</h1>
  //     </div>
  //   );
  // }

  function handlePreview() {
    setIsPreviewingTrip(true);
  }

  function handleEdit() {
    setIsPreviewingTrip(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Check if tripId from the route exists (indicating an existing trip)
      if (tripId) {
        // Update existing trip using PUT request if tripId is present
        const response = await axios.put(
          `http://localhost:8080/api/trip/${tripId}`,
          formData // Send the updated formData object
        );

        if (response.status === 200) {
          console.log("Trip updated:", response.data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...response.data,
          }));
        } else {
          console.log("Failed to update trip");
        }
      }
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };

  // Render the trip customization and details once data is loaded and valid
  return (
    <>
      <div
        className="full-screen-wrapper"
        style={{
          backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container-wrapper"
          style={{
            boxShadow: `0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}, 0 0 20px ${tripDetails?.lighterGlowColor}`,
            background: `${formData?.glowColor}`,
            height: "85dvh",
            width: "90dvw",
          }}
        >
          <div
            className="container"
            style={{
              backgroundImage: `url(${
                formData?.tripBackground?.path || bluegoo
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CustomizeTrip isPreviewingTrip={isPreviewingTrip} />

            {isPreviewingTrip ? (
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
            )}
            {/* save trip functionality  */}
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
            <NewTripButton>Create your own trip</NewTripButton>
          </div>
        </div>
      </div>
    </>
  );
}

// wrap divs
// save button that will update the trip iod if it exisits (no edit and save button because not on form data)
