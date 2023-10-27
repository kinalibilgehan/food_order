export interface CreateNewStoreProductAisleRequestDto {
  aisleName: string;
  storeId: string;
  displayOrder: number;
}

export interface CreateStoreProductRequestDto {
  storeId: string;
  storeName?: string;
  productName: string;
  description: string;
  productPrice: number;
  preperationTime: string;
  stockQuantity: number;
  productAisles: string[];
  productCategories: string[];
  specialIngredients: string[];
  displayOrder?: number;
  imageBase64: string;
}
