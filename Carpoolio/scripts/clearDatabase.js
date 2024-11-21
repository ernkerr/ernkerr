const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

async function clearDatabase() {
  try {
    await prisma.car.deleteMany({});
    // Delete all trips and related cars
    await prisma.trip.deleteMany();
    console.log("All trips and related cars have been deleted.");
  } catch (error) {
    console.error("Error clearing the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();

// navigate to the root folder
// cd ..
