const express = require("express"); // import express
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Await } = require("react-router-dom");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("Database URL:", process.env.POSTGRES_PRISMA_URL); // Debug

const app = express(); // create an app instance
app.use(express.json()); // middleware to parse data
const prisma = new PrismaClient();
const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.28:5173"], // frontend url (change to domain later)
};
app.use(cors(corsOptions));

// app.get("/api", (req, res) => {
//   console.log("Received a request on /api");
//   res.send("Hello from the backend!");
// });

app.post("/api/trip", async (req, res) => {
  try {
    const tripData = req.body; // full formData object from the client
    console.log(tripData);
    const newTrip = await prisma.trip.create({
      data: {
        tripName: tripData.tripName,
        tripDate: tripData.tripDate,
        tripTime: tripData.tripTime,
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

// PUT route to update a trip by its tripID
app.put("/api/trip/:tripId", async (req, res) => {
  const { tripId } = req.params;
  const tripData = req.body;

  try {
    const updatedTrip = await prisma.trip.update({
      where: { tripId },
      data: {
        tripName: tripData.tripName,
        tripDate: tripData.tripDate,
        tripTime: tripData.tripTime,
        tripBackground: tripData.tripBackground,
        departureTime: tripData.departureTime,
        destination: tripData.destination,
        tripDescription: tripData.tripDescription,
        glowColor: tripData.glowColor,
        lighterGlowColor: tripData.lighterGlowColor,
        transparentGlowColor: tripData.transparentGlowColor,
        cars: {
          upsert: tripData.cars.map((car) => ({
            where: { carId: car.carId || 0 }, // Use unique identifiers like `carId`
            update: {
              carName: car.carName,
              carColor: car.carColor,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
            },
            create: {
              carName: car.carName,
              carColor: car.carColor,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
            },
          })),
        },
      },
    });

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the trip" });
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

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
