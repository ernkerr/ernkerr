const express = require("express"); // import express
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Await } = require("react-router-dom");

const app = express(); // create an app instance
const prisma = new PrismaClient();
const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"], // frontend url (change to domain later)
};
app.use(cors(corsOptions));

app.use(express.json()); // middleware to parse json

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
      where: { tripId: parseInt(tripId) }, // Ensure tripId is the correct format (int if necessary)
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

// example GET route
// app.get("/api", (req, res) => {
//   // send data here
//   res.json({ fruits: ["apple", "orange", "banana"] });
// });

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
