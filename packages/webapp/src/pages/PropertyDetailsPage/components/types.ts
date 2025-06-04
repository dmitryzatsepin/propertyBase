// packages/webapp/src/pages/PropertyDetailsPage/components/types.ts
export type PropertyPortal = {
  id: string;
  name: string;
  websiteUrl?: string | null;
};
export type PropertyAmenity = { id: string; name: string };
export type PropertyLocation = {
  id: string;
  locationPath: string;
  city: string;
  community?: string | null;
  subcommunity?: string | null;
  property?: string | null;
  createdAt: string;
  updatedAt: string;
  locationType?: string | null;
  source: "PROPERTY_FINDER" | "BAYUT";
  sourceSpecificId?: string | null;
};
export type PropertyAgent = { id: string; name?: string | null; email: string; avatarUrl?: string | null;};
export type DictionaryModel = {
  id: string;
  name: string;
  description?: string | null;
} | null;

export type PropertyWithDetails = {
  id: string;
  propertyRefNo: string;
  propertyTitle: string;
  propertyTitleAR?: string | null;
  propertyDescription?: string | null;
  propertyDescriptionAR?: string | null;
  unitNumber?: string | null;
  externalPropertyId?: string | null;
  availabilityDate?: string | null;
  buildYear?: number | null;
  dtcmPermit?: string | null;
  floor?: number | null;
  geopointLatitude?: string | null;
  geopointLongitude?: string | null;
  numberOfBathrooms?: string | null;
  numberOfBedrooms?: string | null;
  numberOfCheques?: string | null;
  offPlan?: boolean | null;
  parking?: number | null;
  permitNumber?: string | null;
  plotSize?: string | null;
  price?: string | null;
  priceOnApplication?: boolean | null;
  serviceChargeAEDPerSQFT?: string | null;
  sizeSqft?: string | null;
  stories?: number | null;
  titleDeedNumberYear?: string | null;
  videoTourUrl?: string | null;
  videosUrl?: string[] | null;
  view360Url?: string | null;
  developerBitrixId?: string | null;
  sellerLandlordPABitrixIds?: string | null;
  createdAt: string;
  updatedAt: string;
  location: PropertyLocation | null;
  agent: PropertyAgent | null;
  propertyType: DictionaryModel;
  propertyStatus: DictionaryModel;
  offeringType: DictionaryModel;
  completionStatus: DictionaryModel;
  furnishedStatus: DictionaryModel;
  ownershipType: DictionaryModel;
  propertyPurpose: DictionaryModel;
  rentFrequency: DictionaryModel;
  portals: PropertyPortal[];
  commercialAmenities: PropertyAmenity[];
  privateAmenities: PropertyAmenity[];
  images: Array<{
    id: string;
    url: string;
    altText?: string | null;
    order?: number | null;
  }>;
  propertyDocuments: Array<{
    id: string;
    url: string;
    fileName?: string | null;
    fileType?: string | null;
  }>;
  floorPlans: Array<{
    id: string;
    url: string;
    title?: string | null;
    order?: number | null;
  }>;
};

export interface PropertySectionProps {
  property: PropertyWithDetails;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}
