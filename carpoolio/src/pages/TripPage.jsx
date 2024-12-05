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

import BottomNav from "../components/BottomNav/BottomNav";
import Header from "../components/Header/Header";
import "./TripPage.css";

export default function TripPage() {
  const { formData, setFormData } = useContext(TripContext);
  const { tripId, adminId } = useParams(); // Extract tripId and adminId from route parameters
  const isAdmin = !!adminId; // if adminId exists in the url, useParams() assigns a str to adminId (truthy),
  // otherwise if adminId is absent in the url, adminId will be undefined (falsy)

  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);

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
  if (!tripDetails) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div
        className="full-screen-wrapper"
        style={{
          backgroundImage: `url(${formData?.tripBackground?.path || bluegoo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animationDuration: `${formData?.tripBackground?.speed || 10}s`,
        }}
      >
        <Header />
        <CustomizeTrip isAdmin={isAdmin} />
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
