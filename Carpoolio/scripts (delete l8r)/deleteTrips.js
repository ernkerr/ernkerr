// deleteTrips.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.trip.deleteMany(); // Deletes all records in the Trip table
  console.log("All trips deleted.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

//   node deleteTrips.js
