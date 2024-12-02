import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CustomizeTrip from "@components/CustomizeTrip/CustomizeTrip";
import bluegoo from "../assets/gifs/bluegoo.gif";
import { TripContext } from "@components/TripContext";
import InviteBtn from "@components/BottomNav/InviteBtn.jsx";
import "@components/NewTripForm/NewTripForm.css";
import "@components/CustomizeTrip/CustomizeTrip.css";
import "./TripPage.css";
import BottomNav from "../components/BottomNav/BottomNav";

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
      {/* <Helmet>
        <title>
          {tripDetails.tripName || "carpoolio - plan your next trip!"}
        </title>
        <meta
          name="description"
          content={tripDetails.description || "Join your next adventure!"}
        />
        <meta
          property="og:title"
          content={tripDetails.title || "Carpoolio - Plan Your Trip"}
        />
        <meta
          property="og:description"
          content={tripDetails.description || "Plan your carpool with ease."}
        />
        <meta
          property="og:image"
          content={tripDetails.image || "/default-preview.jpg"}
        />
        <meta
          property="og:url"
          content={`${window.location.origin}/trip/${tripDetails.id}`}
        />
      </Helmet> */}
      {/* these didn't go through */}
      <div
        className="full-screen-wrapper"
        style={{
          backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CustomizeTrip isAdmin={isAdmin} />

        <BottomNav />

        {/* <NewTripButton
              className="new-trip-btn"
              style={{
                background: formData?.transparentGlowColor || "transparent",
                border: `2px solid ${formData?.glowColor}`,
                boxShadow: `0 0 10px ${formData?.glowColor}, 0 0 5px ${formData?.glowColor}, 0 0 15px ${formData?.lighterGlowColor}`,
              }}
            >
              + New Trip
            </NewTripButton> */}
        {/* </div> */}
      </div>
    </>
  );
}
