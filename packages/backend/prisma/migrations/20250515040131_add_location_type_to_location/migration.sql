-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "locationType" TEXT;

-- CreateIndex
CREATE INDEX "locations_locationType_idx" ON "locations"("locationType");
