-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "departureDate" TEXT,
ADD COLUMN     "departureLocation" TEXT,
ADD COLUMN     "departureTime" TEXT,
ADD COLUMN     "numSeats" INTEGER,
ALTER COLUMN "carName" DROP NOT NULL,
ALTER COLUMN "carColor" DROP NOT NULL,
ALTER COLUMN "seatDistribution" DROP NOT NULL,
ALTER COLUMN "seatNames" DROP NOT NULL;
