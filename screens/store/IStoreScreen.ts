export interface StoreProduct {
  storeId?: string;
  isMenu?: boolean;
  isReadyForDelivery?: boolean;
  storeProductCategory?: StoreProductCategory;
  imageUrl?: string;
  preperationTime?: string;
  preperationTimeString?: string;
  stockQuantity: number;
  orderQuantity?: number;
  price: StoreProductPrice;
  takeAwayPrice?: number;
  discountedPrice?: number;
  discountRatio?: number;
  description?: string;
  isVegan?: boolean;
  subStoreProducts?: StoreProduct[];
  parentStoreProducts?: StoreProduct[];
  campaigns?: Campaign[];
  id?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  createdDateUTC?: Date;
  lastUpdatedDate?: Date;
  lastUpdatedDateUTC?: Date;
}

export interface Campaign {
  campaignDescription?: string;
  isUsed?: boolean;
  discountRatio?: number;
  storeProducts?: StoreProduct[];
  campaignType?: number;
  id?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdDate?: Date;
  createdDateUTC?: Date;
  lastUpdatedDate?: Date;
  lastUpdatedDateUTC?: Date;
}

export interface StoreCategoryAndProductsDto {
  aisleName?: string;
  data?: StoreProduct[];
  aisles?: string[];
}

export interface StoreProductCategory {
  categoryName?: string;
  categoryOrder?: number;
}

export interface StoreProductPrice {
  price: number;
  campaignPrice: number;
  effectiveDate: string;
  expiryDate: string | null;
  currencyId: number;
  currency: Currency;
}
export interface Currency {
  id: number;
  code: string;
  name: string;
}
