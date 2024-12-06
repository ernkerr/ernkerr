/*
  Warnings:

  - You are about to drop the column `carColor` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `carName` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `numSeats` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `seatDistribution` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `seatNames` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `underglowColor` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "carColor",
DROP COLUMN "carName",
DROP COLUMN "numSeats",
DROP COLUMN "seatDistribution",
DROP COLUMN "seatNames",
DROP COLUMN "underglowColor",
DROP COLUMN "userEmail",
DROP COLUMN "userName",
ALTER COLUMN "departureTime" SET DATA TYPE TEXT;
