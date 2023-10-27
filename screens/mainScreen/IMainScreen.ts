export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface StorePaginationParams extends PaginationParams {
  orderBy?: string;
  searchTerm?: string;
  types?: string;
  brands?: string;
  x: number;
  y: number;
}
export interface Coordinate {
  x?: number;
  y?: number;
  z?: number;
  m?: any;
  isValid?: boolean;
}

export interface Store {
  id?: string;
  name: string;
  bio1: string;
  bio2?: string;
  addressText?: string;
  headerImageUrl?: string;
  avatarImageUrl?: string;
  coordinate?: Coordinate;
  avarageDeliveryTimeInMinutes: string;
  totalDeliveryCount: number;
  hasCourrierService: boolean;
  createdDate?: Date;
  LastUpdatedDate?: Date;
  storeKind?: any;
  storeScore?: StoreScore;
  isActive?: boolean;
  isDeleted?: boolean;
  distance: number;
  isFavorited: boolean;
  hasActiveStory?: boolean;
}

// lalalalala
export interface StoreScore {
  deliveryScore?: number;
  flavorScore?: number;
  serviceScore?: number;
  avarageScore: number;
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface GetNearByStoresResponseDto {
  stores: Store[];
  metadata: Metadata;
}
