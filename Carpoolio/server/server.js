const express = require("express"); // import express
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env.development"),
});

if (!process.env.POSTGRES_PRISMA_URL) {
  console.log("Database URL:", process.env.POSTGRES_PRISMA_URL); // Debug
  console.error("DATABASE_URL not set in environment variables!");
  process.exit(1);
}
const app = express(); // create an app instance
app.use(express.json()); // middleware to parse data
const prisma = new PrismaClient();

//
//
// server debugging
console.log("Starting server setup...");
const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      console.error(err);
    }
  });

console.log("Server setup complete.");

const corsOptions = {
  origin: ["https://carpoolio.vercel.app", "http://localhost:5173"], // frontend url, change to domain later
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// create a new trip in the backend
app.post("/api/trip", async (req, res) => {
  try {
    const tripData = req.body; // full formData object from the client
    console.log("received formData from client:", tripData); // log the incoming data

    // create a new trip record in the db
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
            numSeats: car.numSeats,
            seatDistribution: car.seatDistribution,
            seatNames: car.seatNames,
            departureDate: car.departureDate,
            departureTime: car.departureTime,
            departureLocation: car.departureLocation,
          })),
        },
      },
    });
    console.log("New trip created successfully:", newTrip); // log the trip saved to the db

    // send newly created tripId and adminId back to the client
    res.status(201).json({
      tripId: newTrip.tripId,
      adminId: newTrip.adminId,
      ...newTrip,
    });
  } catch (error) {
    console.error("Error creating trip:", error.message); // Log the error message
    console.error("Full error stack trace:", error); // Log the full error details for debugging
    res.status(500).json({ error: "Failed to create trip." });
  }
});

// PUT route to update a trip by its tripID
app.put("/api/trip/:tripId", async (req, res) => {
  const { tripId } = req.params;
  const tripData = req.body;

  try {
    console.log("Received trip update data for tripId:", tripId, tripData);
    console.log("Received destination data:", tripData.destination);

    const updatedTrip = await prisma.trip.update({
      where: { tripId },
      data: {
        tripName: tripData.tripName,
        tripDate: tripData.tripDate,
        tripTime: tripData.tripTime,
        tripBackground: tripData.tripBackground,
        destination: tripData.destination,
        tripDescription: tripData.tripDescription,
        glowColor: tripData.glowColor,
        lighterGlowColor: tripData.lighterGlowColor,
        transparentGlowColor: tripData.transparentGlowColor,
        cars: {
          upsert: tripData.cars.map((car) => ({
            where: { carId: car.carId }, // use unique identifiers like `carId`
            update: {
              carName: car.carName,
              carColor: car.carColor,
              numSeats: car.numSeats,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
              departureDate: car.departureDate,
              departureTime: car.departureTime,
              departureLocation: car.departureLocation,
            },
            create: {
              carName: car.carName,
              carColor: car.carColor,
              numSeats: car.numSeats,
              seatDistribution: car.seatDistribution,
              seatNames: car.seatNames,
              departureDate: car.departureDate,
              departureTime: car.departureTime,
              departureLocation: car.departureLocation,
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

app.post("/api/saveFormData", (req, res) => {
  const formData = req.body;
  res.json(formData);
});

//
//
//
// GET route to retrieve a trip by its tripId
app.get("/api/trip/:tripId", async (req, res) => {
  const { tripId } = req.params;
  console.log("Fetching trip without adminId:", tripId);

  try {
    console.log("Received tripId type:", typeof tripId, "Value:", tripId);

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

// GET route to retrieve a trip by it's tripId and adminId
app.get("/api/trip/:tripId/:adminId", async (req, res) => {
  const { tripId, adminId } = req.params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { tripId },
      include: { cars: true },
    });

    // validate if adminId matches
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

//
//
//
//
//

//
//
//

// new post route to save cars
app.post("/api/car", async (req, res) => {
  const carData = req.body; // getcar data from client
  const { tripId } = carData;
  try {
    const newCar = await prisma.car.create({
      data: {
        carName: carData.carName,
        carColor: carData.carColor,
        numSeats: carData.numSeats,
        seatDistribution: carData.seatDistribution,
        seatNames: carData.seatNames,
        departureDate: carData.departureDate,
        departureTime: carData.departureTime,
        departureLocation: carData.departureLocation,
        trip: { connect: { tripId: tripId } }, // foreign key to link car to trip (tripId is a str)
      },
    });
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error saving car:", error);
    res.status(500).json({ error: "An error occurred while saving the car" });
  }
});

// handle car deletion
app.delete("/api/car/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    await prisma.car.delete({
      where: { carId },
    });
    res.status(200).json({ message: "car deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting car: ", error);
    res.status(500).json({ error: "Failed to delete car" });
  }
});

// app.listen(PORT, () => {
//   console.log("Server started on port: ", PORT);
// });

// Serve static files from the 'dist' folder after building
// app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all route for React (placed last)
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });
