const express = require("express"); // import express
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Await } = require("react-router-dom");

const app = express(); // create an app instance
app.use(express.json()); // middleware to parse data
const prisma = new PrismaClient();
const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"], // frontend url (change to domain later)
};
app.use(cors(corsOptions));

// const corsOptions = {
//   origin: ["http://192.168.0.18:5173"], // frontend url (change to domain later)
// };
// app.use(cors(corsOptions));

//localhost:5173/trip/7aa186c5-d76e-4713-a991-a3eecc893393/bed6f574-b980-4e8d-a3e3-0dc2f75a3a86

// http: app.use(express.json()); // middleware to parse json

app.get("/api", (req, res) => {
  console.log("Received a request on /api");
  res.send("Hello from the backend!");
});

app.post("/api/trip", async (req, res) => {
  try {
    const tripData = req.body; // full formData object from the client
    console.log(tripData);
    const newTrip = await prisma.trip.create({
      data: {
        tripName: tripData.tripName,
        tripDate: tripData.tripDate,
        tripBackground: tripData.tripBackground,
        departureTime: tripData.departureTime,
        destination: tripData.destination,
        tripDescription: tripData.tripDescription,
        glowColor: tripData.glowColor,
        lighterGlowColor: tripData.lighterGlowColor,
        transparentGlowColor: tripData.transparentGlowColor,
        cars: {
          create: tripData.cars.map((car) => ({
            carName: car.carName,
            carColor: car.carColor,
            seatDistribution: car.seatDistribution,
            seatNames: car.seatNames,
          })),
        },
      },
    });
    res.status(201).json({
      tripId: newTrip.tripId,
      adminId: newTrip.adminId,
      ...newTrip,
    });
  } catch (error) {
    console.error("Error creating trip:", error);
  }
});

app.post("/api/saveFormData", (req, res) => {
  const formData = req.body;
  res.json(formData);
});

app.get("/api/trip/:tripId/:adminId", async (req, res) => {
  const { tripId, adminId } = req.params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { tripId },
      include: { cars: true },
    });

    // Validate if adminId matches
    if (!trip || trip.adminId !== adminId) {
      return res
        .status(404)
        .json({ error: "Trip not found or admin ID does not match" });
    }

    res.json(trip); // Send the trip data as JSON
  } catch (error) {
    console.error("Error fetching trip:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the trip" });
  }
});

// GET route to retrieve a trip by its tripId
app.get("/api/trip/:tripId", async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { tripId }, // Ensure tripId is the correct format (int if necessary)
      include: { cars: true }, // Include related cars if needed
    });

    if (trip) {
      res.json(trip); // Send the trip data as JSON
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (error) {
    console.error("Error retrieving trip:", error);
    res.status(500).json({ error: "Failed to retrieve trip" });
  }
});

app.put("/api/trip/:tripId", async (req, res) => {
  const { tripId } = req.params; // This will match the unique tripId string, not the database ID
  const { cars, ...updatedTripData } = req.body; // Separate cars from the rest of the trip data

  try {
    // Find the trip using `tripId` string to get the database ID
    const trip = await prisma.trip.findUnique({
      where: { tripId: tripId },
      include: { cars: true }, // Include cars in case you need to check for existing entries
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Step 1: Update the main trip data using the database `id`
    const updatedTrip = await prisma.trip.update({
      where: { id: trip.id },
      data: updatedTripData,
    });

    // Step 2: Update related cars if they are provided
    if (cars && cars.length > 0) {
      const existingCarIds = trip.cars.map((car) => car.id);
      // Iterate over the provided cars
      for (const car of cars) {
        if (car.id && existingCarIds.includes(car.id)) {
          // If car ID exists, update that specific car
          await prisma.car.update({
            where: { id: car.id },
            data: {
              carName: car.carName,
              carColor: car.carColor,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
            },
          });
        } else {
          // If no car ID, create a new car associated with this trip
          await prisma.car.create({
            data: {
              tripId: trip.id,
              carName: car.carName,
              carColor: car.carColor,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
            },
          });
        }
      }
      // Step 3: Remove any cars from the database that weren't included in the update
      const carIdsToUpdate = cars.filter((car) => car.id).map((car) => car.id);
      const carsToDelete = trip.cars.filter(
        (car) => !carIdsToUpdate.includes(car.id)
      );

      for (const car of carsToDelete) {
        await prisma.car.delete({
          where: { id: car.id },
        });
      }
    }

    // Send updated trip back to frontend
    res.json({ ...updatedTrip, cars });
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({ message: "Error updating trip", error });
  }
});

// example GET route
// app.get("/api", (req, res) => {
//   // send data here
//   res.json({ fruits: ["apple", "orange", "banana"] });
// });

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
