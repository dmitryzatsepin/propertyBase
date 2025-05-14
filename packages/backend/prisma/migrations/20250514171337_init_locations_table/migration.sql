-- CreateEnum
CREATE TYPE "LocationDataSource" AS ENUM ('PROPERTY_FINDER', 'BAYUT');

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "locationPath" TEXT NOT NULL,
    "city" TEXT,
    "community" TEXT,
    "subcommunity" TEXT,
    "property" TEXT,
    "source" "LocationDataSource" NOT NULL,
    "sourceSpecificId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "locations_locationPath_idx" ON "locations"("locationPath");

-- CreateIndex
CREATE INDEX "locations_city_idx" ON "locations"("city");

-- CreateIndex
CREATE INDEX "locations_community_idx" ON "locations"("community");

-- CreateIndex
CREATE INDEX "locations_source_idx" ON "locations"("source");

-- CreateIndex
CREATE UNIQUE INDEX "locations_locationPath_source_key" ON "locations"("locationPath", "source");
