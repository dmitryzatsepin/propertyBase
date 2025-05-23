-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "propertyRefNo" TEXT NOT NULL,
    "propertyTitle" TEXT NOT NULL,
    "propertyTitleAR" TEXT NOT NULL,
    "propertyDescription" TEXT NOT NULL,
    "propertyDescriptionAR" TEXT NOT NULL,
    "unitNumber" TEXT,
    "externalPropertyId" TEXT,
    "availabilityDate" TIMESTAMP(3),
    "buildYear" INTEGER,
    "dtcmPermit" TEXT,
    "floor" INTEGER,
    "geopointLatitude" DECIMAL(65,30),
    "geopointLongitude" DECIMAL(65,30),
    "numberOfBathrooms" TEXT,
    "numberOfBedrooms" TEXT,
    "numberOfCheques" TEXT,
    "offPlan" BOOLEAN,
    "parking" INTEGER,
    "permitNumber" TEXT,
    "plotSize" DECIMAL(65,30),
    "price" DECIMAL(65,30),
    "priceOnApplication" BOOLEAN,
    "serviceChargeAEDPerSQFT" DECIMAL(65,30),
    "sizeSqft" DECIMAL(65,30),
    "stories" INTEGER,
    "titleDeedNumberYear" TEXT,
    "videoTourUrl" TEXT,
    "videosUrl" TEXT[],
    "view360Url" TEXT,
    "agentId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "propertyTypeId" TEXT,
    "propertyStatusId" TEXT,
    "offeringTypeId" TEXT,
    "completionStatusId" TEXT,
    "furnishedStatusId" TEXT,
    "ownershipTypeId" TEXT,
    "propertyPurposeId" TEXT,
    "rentFrequencyId" TEXT,
    "developerBitrixId" TEXT,
    "sellerLandlordPABitrixIds" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offering_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offering_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completion_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "completion_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "furnishing_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "furnishing_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ownership_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ownership_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_purposes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_purposes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent_frequencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rent_frequencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "order" INTEGER,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_documents" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT,
    "fileType" TEXT,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_floor_plans" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "order" INTEGER,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_floor_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommercialAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CommercialAmenities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PrivateAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PrivateAmenities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PropertyPortals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PropertyPortals_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "properties_propertyRefNo_key" ON "properties"("propertyRefNo");

-- CreateIndex
CREATE INDEX "properties_agentId_idx" ON "properties"("agentId");

-- CreateIndex
CREATE INDEX "properties_locationId_idx" ON "properties"("locationId");

-- CreateIndex
CREATE INDEX "properties_propertyTypeId_idx" ON "properties"("propertyTypeId");

-- CreateIndex
CREATE INDEX "properties_propertyStatusId_idx" ON "properties"("propertyStatusId");

-- CreateIndex
CREATE INDEX "properties_price_idx" ON "properties"("price");

-- CreateIndex
CREATE UNIQUE INDEX "property_types_name_key" ON "property_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "property_statuses_name_key" ON "property_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "offering_types_name_key" ON "offering_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "completion_statuses_name_key" ON "completion_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "furnishing_statuses_name_key" ON "furnishing_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ownership_types_name_key" ON "ownership_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "property_purposes_name_key" ON "property_purposes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rent_frequencies_name_key" ON "rent_frequencies"("name");

-- CreateIndex
CREATE INDEX "property_images_propertyId_idx" ON "property_images"("propertyId");

-- CreateIndex
CREATE INDEX "property_documents_propertyId_idx" ON "property_documents"("propertyId");

-- CreateIndex
CREATE INDEX "property_floor_plans_propertyId_idx" ON "property_floor_plans"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "amenities_name_key" ON "amenities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "portals_name_key" ON "portals"("name");

-- CreateIndex
CREATE INDEX "_CommercialAmenities_B_index" ON "_CommercialAmenities"("B");

-- CreateIndex
CREATE INDEX "_PrivateAmenities_B_index" ON "_PrivateAmenities"("B");

-- CreateIndex
CREATE INDEX "_PropertyPortals_B_index" ON "_PropertyPortals"("B");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "property_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_propertyStatusId_fkey" FOREIGN KEY ("propertyStatusId") REFERENCES "property_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_offeringTypeId_fkey" FOREIGN KEY ("offeringTypeId") REFERENCES "offering_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_completionStatusId_fkey" FOREIGN KEY ("completionStatusId") REFERENCES "completion_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_furnishedStatusId_fkey" FOREIGN KEY ("furnishedStatusId") REFERENCES "furnishing_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownershipTypeId_fkey" FOREIGN KEY ("ownershipTypeId") REFERENCES "ownership_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_propertyPurposeId_fkey" FOREIGN KEY ("propertyPurposeId") REFERENCES "property_purposes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_rentFrequencyId_fkey" FOREIGN KEY ("rentFrequencyId") REFERENCES "rent_frequencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_documents" ADD CONSTRAINT "property_documents_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_floor_plans" ADD CONSTRAINT "property_floor_plans_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommercialAmenities" ADD CONSTRAINT "_CommercialAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommercialAmenities" ADD CONSTRAINT "_CommercialAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrivateAmenities" ADD CONSTRAINT "_PrivateAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrivateAmenities" ADD CONSTRAINT "_PrivateAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyPortals" ADD CONSTRAINT "_PropertyPortals_A_fkey" FOREIGN KEY ("A") REFERENCES "portals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyPortals" ADD CONSTRAINT "_PropertyPortals_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
