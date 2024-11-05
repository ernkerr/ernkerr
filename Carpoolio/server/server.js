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

app.post("/api/trips", async (req, res) => {
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

// example GET route
// app.get("/api", (req, res) => {
//   // send data here
//   res.json({ fruits: ["apple", "orange", "banana"] });
// });

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
