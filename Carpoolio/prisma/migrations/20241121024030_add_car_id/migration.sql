/*
  Warnings:

  - A unique constraint covering the columns `[carId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - The required column `carId` was added to the `Car` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "carId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_carId_key" ON "Car"("carId");
