import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CustomizeTrip from "@components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/bluegoo.gif";
import "@components/NewTripForm/NewTripForm.css";
import "@components/CustomizeTrip/CustomizeTrip.css";
import "./TripPage.css";
import { TripContext } from "@components/TripContext";

export default function TripPage() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(TripContext);
  const { tripId, adminId } = useParams(); // Extract tripId and adminId from route parameters
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isPreviewingTrip, setIsPreviewingTrip] = useState(true);

  // Function to fetch trip details
  const getTripDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trip/${tripId}/${adminId}`
      );

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
  }, [tripId, adminId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if tripDetails have loaded, or show a loading state
  if (!tripDetails) {
    return <div>Loading...</div>;
  }

  // Validate the adminId
  if (tripDetails.adminId !== adminId) {
    return (
      <div>
        <h1>This link is invalid for the trip: {tripId}</h1>
      </div>
    );
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

  const handleInvite = () => {
    navigate(`/trip/${tripId}`);
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
        {/* <div
          className="container-wrapper"
          style={{
            boxShadow: `0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.glowColor}, 0 0 20px ${tripDetails?.lighterGlowColor}`,
            background: `${formData?.glowColor}`,
            height: "85dvh",
            width: "90dvw",
          }}
        > */}
        {/* // no more glow */}
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

          <button
            style={{
              background: formData?.tripBackground?.scrim || "transparent",
              border: ` 2px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            }}
            className="glow-button"
            onClick={handleInvite}
          >
            Invite Link
          </button>

          {isPreviewingTrip ? (
            // <button
            //   style={{
            //     background: formData?.tripBackground?.scrim || "transparent",
            //     border: ` 2px solid ${formData?.glowColor}`,
            //     boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            //   }}
            //   className="glow-button"
            //   onClick={handleEdit}
            // >
            //   edit
            // </button>

            <button
              className="editBtn"
              style={{
                background: formData?.transparentGlowColor || "transparent",
                border: ` 2px solid ${formData?.glowColor}`,
                boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              }}
            >
              <svg height="1em" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
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
              background: formData?.transparentGlowColor || "transparent",
              border: ` 2px solid ${formData?.glowColor}`,
              boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
            }}
            className="customize-trip-glow-btns"
            onClick={handleSave}
          >
            save
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

// wrap divs
// save button that will update the trip iod if it exisits (no edit and save button because not on form data)
