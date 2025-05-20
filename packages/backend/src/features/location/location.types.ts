// packages/backend/src/features/location/location.types.ts

export enum IncomingLocationDataSource {
    PROPERTY_FINDER = 'Property Finder',
    BAYUT = 'Bayut',
}

export interface CreateLocationDto {
  locationPath: string;
  city: string;
  community: string | null;
  subcommunity: string | null;
  property: string | null;
  locationType: string | null;
  source: IncomingLocationDataSource;
  sourceSpecificId?: string | null;
}

export type CreateManyLocationsDto = CreateLocationDto[];