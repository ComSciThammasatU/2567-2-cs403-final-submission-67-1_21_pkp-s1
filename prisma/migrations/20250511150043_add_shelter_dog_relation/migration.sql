-- CreateEnum
CREATE TYPE "VaccinationStatus" AS ENUM ('COMBINED', 'RABIES', 'BOTH', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "DogSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breedId" TEXT,
    "customBreed" TEXT,
    "gender" TEXT NOT NULL,
    "estimatedAge" INTEGER NOT NULL,
    "estimatedYear" INTEGER NOT NULL,
    "size" "DogSize" NOT NULL,
    "vaccinated" "VaccinationStatus" NOT NULL DEFAULT 'UNKNOWN',
    "neutered" BOOLEAN NOT NULL,
    "otherIllnesses" TEXT,
    "description" TEXT,
    "dogImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shelterId" TEXT NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
