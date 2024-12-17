import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { TripContext } from "@components/TripContext";
import CustomizeTrip from "@components/CustomizeTrip/CustomizeTrip";

import Header from "../components/Header/Header";
import bluegoo from "../assets/gifs/bluegoo.gif";
import "@components/NewTripForm/NewTripForm.css";
import "@components/CustomizeTrip/CustomizeTrip.css";
import "./TripPage.css";
import Loader from "../components/Loader/Loader";

export default function TripPage() {
  const { formData, setFormData } = useContext(TripContext);
  const { tripId, adminId } = useParams(); // Extract tripId and adminId from route parameters
  const isAdmin = !!adminId; // if adminId exists in the url, useParams() assigns a str to adminId (truthy),
  // otherwise if adminId is absent in the url, adminId will be undefined (falsy)

  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Log API_BASE_URL for debugging
  useEffect(() => {
    console.log("API_BASE_URL is:", API_BASE_URL);
  }, [API_BASE_URL]);

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
      // Log full response for debugging
      console.log("Full Response:", response);

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
    console.log("Trip details are still loading...");

    return <Loader />;
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
        <div
          classsName="full-screen-wrapper"
          style={{
            backgroundImage: `url(${formData?.tripOverlay?.path || null})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        >
          <Header />
          <CustomizeTrip isAdmin={isAdmin} />
        </div>
      </div>
    </>
  );
}
