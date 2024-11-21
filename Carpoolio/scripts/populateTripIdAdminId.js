// Create a script called populateTripIdAdminId.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const trips = await prisma.trip.findMany();

  for (const trip of trips) {
    await prisma.trip.update({
      where: { id: trip.id },
      data: {
        tripId: trip.tripId || require("cuid")(),
        adminId: trip.adminId || require("cuid")(),
      },
    });
  }

  console.log("tripId and adminId populated for existing trips.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
