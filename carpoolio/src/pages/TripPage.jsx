import { useParams } from "react-router-dom";

// Replace with function calling back-end
const getTripDetails = () => ({
  adminId: "placeholder",
});

export default function TripPage() {
  const { tripId, adminId } = useParams();

  // use tripId to query backend
  const trip = getTripDetails();

  if (trip.adminId !== adminId) {
    return (
      <div>
        <h1>This link is invalid for the trip: {tripId}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello {tripId}</h1>
      {/* // you're on the editing page for (spec css for editing mode ~ ) */}
      <p>You are currently editing "Trip Name" </p>
    </div>
  );
}

// Example query to fetch a trip with its associated cars
// const tripWithCars = await prisma.trip.findUnique({
//   where: { id: tripId },
//   include: { cars: true },
// });
