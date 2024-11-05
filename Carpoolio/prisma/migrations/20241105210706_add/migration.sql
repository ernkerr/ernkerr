/*
  Warnings:

  - You are about to drop the column `cars` on the `Trip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tripId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "cars",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "tripId" TEXT;

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "carName" TEXT NOT NULL,
    "carColor" TEXT NOT NULL,
    "seatDistribution" JSONB NOT NULL,
    "seatNames" JSONB NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_tripId_key" ON "Trip"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_adminId_key" ON "Trip"("adminId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
