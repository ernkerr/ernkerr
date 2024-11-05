/*
  Warnings:

  - Made the column `adminId` on table `Trip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tripId` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "adminId" SET NOT NULL,
ALTER COLUMN "tripId" SET NOT NULL;
