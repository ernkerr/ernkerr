const express = require("express"); // import express
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

//
//
// add session middleware for session support (Login w google)
app.use(
  session({
    secret: process.env.AUTH_SECRET, // Replace with a secure secret
    resave: false, // Prevents session resave if unmodified
    saveUninitialized: false, // Does not save empty sessions
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

console.log("Session Middleware Registered");
console.log("Passport Middleware Initialized");
console.log("Routes Registered");

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session()); // Enables persistent login sessions
//
//
// o auth
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

app.get(
  "/api/auth/google",
  (req, res, next) => {
    // if the tripId is provided store it in the session
    if (req.query.tripId) {
      req.session.tripId = req.query.tripId;
      console.log("set tripId in session: ", req.query.tripId);
    } else {
      console.log("No tripId in query parameters.");
    }
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },

    async (accessToken, refreshToken, req, profile, cb) => {
      try {
        console.log("Inside Google strategy callback");
        const tripId = req.session.tripId;
        console.log("Retrieved tripId from session:", tripId); // Log tripId
        console.log("User Profile:", profile);

        // Check if user exists in the database
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (user) {
          console.log("User found in database:", user);
        } else {
          console.log("No user found, creating a new user");
        }

        // if a user already exists, update their record to asssociate them w the trip
        if (tripId && !user.tripId) {
          console.log("Updating user with tripId:", tripId); // Log update

          user = await prisma.user.update({
            where: { id: user.id },
            data: { trip: { connect: { id: tripId } } },
          });
        }

        // If not, create a new user
        if (!user) {
          console.log(
            "User not found. Creating new user with tripId: ",
            tripId
          );
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              ...(tripId && { trip: { connect: { id: tripId } } }), // Connect to trip if tripId exists
            },
          });
        }

        // Pass user to the next middleware
        return cb(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy callback:", error);
        return cb(error, null);
      }
    }
  )
);

// Serialize and deserialize user (required for persistent login sessions)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // make sure that req.user contains the logged in user's details
    const userId = req.user.id;
    console.log("userId: ", user.id);
    console.log("Authentication successful, redirecting to user profile...");
    // redirect to the userPage
    res.redirect(`http://localhost:5173/user/${userId}`);
  }
);

// fetch a user's trips (!)
//
//
// GET route to retrieve trips by their userId
app.get("/api/user/:userId", async (req, res) => {
  console.log("Logged-in user details:", req.user); // Debugging

  const { userId } = req.params;
  console.log("Fetching trips for userId:", userId); // Log userId from request

  try {
    const userTrips = await prisma.user.findUnique({
      where: { id: userId },
      include: { trip: true },
    });

    if (userTrips) {
      console.log("User trips fetched:", userTrips);
      res.json(userTrips); // Send the trip data as JSON
    } else {
      console.log("No trips found for userId:", userId);
      res.status(404).json({ error: "trips not found" });
    }
  } catch (error) {
    console.error("Error retrieving trip:", error);
    res.status(500).json({ error: "Failed to retrieve trip" });
  }
});
//

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
