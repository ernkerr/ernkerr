import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomizeTrip from "../components/CustomizeTrip/CustomizeTrip";

export default function TripPage() {
  const { tripId, adminId } = useParams(); // Extract tripId and adminId from route parameters
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message); // Store error in state if fetching fails
    }
  };

  // useEffect to call getTripDetails when component mounts
  useEffect(() => {
    getTripDetails();
  }, [tripId, adminId]);

  // Show error message if there was an error
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

  // Render the trip customization and details once data is loaded and valid
  return (
    <div>
      <CustomizeTrip formData={tripDetails} />{" "}
      {/* Pass trip details as props */}
      <h1>Hello {tripId}</h1>
      <p>You are currently editing "{tripDetails.tripName}"</p>
    </div>
  );
}

// Example query to fetch a trip with its associated cars
// const tripWithCars = await prisma.trip.findUnique({
//   where: { id: tripId },
//   include: { cars: true },
// });
