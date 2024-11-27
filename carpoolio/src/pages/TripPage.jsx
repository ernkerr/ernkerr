import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CustomizeTrip from "@components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/gifs/bluegoo.gif";
import { TripContext } from "@components/TripContext";
import InviteBtn from "@components/InviteBtn.jsx";
import NewTripButton from "@components/NewTripButton/NewTripButton.jsx";
import "@components/NewTripForm/NewTripForm.css";
import "@components/CustomizeTrip/CustomizeTrip.css";
import "./TripPage.css";

export default function TripPage() {
  const { formData, setFormData } = useContext(TripContext);
  const { tripId, adminId } = useParams(); // Extract tripId and adminId from route parameters
  const isAdmin = !!adminId; // if adminId exists in the url, useParams() assigns a str to adminId (truthy),
  // otherwise if adminId is absent in the url, adminId will be undefined (falsy)

  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  // const [isPreviewingTrip, setIsPreviewingTrip] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // fetch trip details
  const getTripDetails = async () => {
    // construct the url based on the presence of adminId

    const url = isAdmin
      ? `${API_BASE_URL}/api/trip/${tripId}/${adminId}`
      : `${API_BASE_URL}/api/trip/${tripId}`;

    try {
      console.log("Requesting trip details...");
      console.log("Trip ID:", tripId);
      console.log("Admin ID:", adminId || "No Admin ID provided");
      console.log("Constructed URL:", url);

      // use axios to make the GET request
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log("Trip details fetched successfully:", response.data);
        setTripDetails(response.data); // store the fetched data in state
        setFormData(response.data); // populate formData with fetched trip data
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching trip details:", err);
      setError(err.message); // set the error state
    }
  };

  // useEffect to call getTripDetails
  useEffect(() => {
    getTripDetails();
  }, [tripId, adminId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // check if tripDetails have loaded, or show a loading state
  // TODO: add loading animation
  if (!tripDetails) {
    return <div>Loading...</div>;
  }

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
        <CustomizeTrip isAdmin={isAdmin} />

        <div
          className="bottom-nav-bar"
          style={
            {
              // background: formData?.glowColor || "transparent",
            }
          }
        >
          <InviteBtn tripId={tripId} />

          {/* {isAdmin ? (
            isPreviewingTrip ? (
              <button
                className="editBtn"
                style={{
                  background: formData?.transparentGlowColor || "transparent",
                  border: `2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                onClick={handleEdit}
              >
                <svg height="1em" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
            ) : (
              <button
                className="saveBtn"
                style={{
                  background: formData?.transparentGlowColor || "transparent",
                  border: `2px solid ${formData?.glowColor}`,
                  boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
                }}
                onClick={handleSave}
              >
                Save
              </button>
            )
          ) : (
            <NewTripButton
              className="new-trip-btn"
              style={{
                background: formData?.transparentGlowColor || "transparent",
                border: `2px solid ${formData?.glowColor}`,
                boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              }}
            >
              + New Trip
            </NewTripButton>
          )} */}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
