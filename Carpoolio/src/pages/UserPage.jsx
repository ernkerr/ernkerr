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

export default function UserPage() {
  const { formData, setFormData } = useContext(TripContext);
  const { userId } = useParams(); // extract userId from route parameters

  const [tripDetails, setTripDetails] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getTrips = async () => {
    console.log("attempting to get trips linked to profile...");
    console.log("for userId:", userId);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`);
      console.log("Response from /api/user/:userId:", response.data); // Log API response
      console.log("response:", response);
      // TODO: make a backend route to catch this
      if (response.status === 200) {
        console.log(
          "trips relating to profile fetched successfully:",
          response.data
        );

        setTripDetails(response.data); // store the fetched data in state
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error("error fetching profile details:", err);
    }
  };

  // useEffect to call getTrips
  useEffect(() => {
    getTrips();
  }, [userId]);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // check if tripDetails have loaded, or show a loading state
  //   if (!tripDetails) {
  //     console.log("Trip details are still loading...");

  //     return <Loader />;
  //   }

  // new component for fetching and displaying each trip
  // render trip like render car??

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
        <p> Page with user's trips</p>
        <Loader />

        {/* for each trip.. 

        send info to trip preview? 
        
        <Trip Preview /> 
        */}

        {/* <CustomizeTrip isAdmin={isAdmin} /> */}
      </div>
    </>
  );
}

// call db to get the trips relating to the user that's signed in

// add these trips to an array? and map through them and for each:

// make a TripPreview component using: trip name, dest, date, background
// hyperlink them with the link to edit the trip
