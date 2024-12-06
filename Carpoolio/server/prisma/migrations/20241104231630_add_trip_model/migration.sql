-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "tripName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "tripDate" TIMESTAMP(3) NOT NULL,
    "tripBackground" JSONB NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "tripDescription" TEXT,
    "underglowColor" TEXT NOT NULL,
    "glowColor" TEXT NOT NULL DEFAULT '#34bd34',
    "lighterGlowColor" TEXT,
    "transparentGlowColor" TEXT NOT NULL DEFAULT '#4bfe4b52',
    "carName" TEXT,
    "carColor" TEXT,
    "numSeats" INTEGER NOT NULL,
    "seatDistribution" JSONB NOT NULL,
    "seatNames" JSONB NOT NULL,
    "cars" JSONB,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
