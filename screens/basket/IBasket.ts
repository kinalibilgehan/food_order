import {WorkingDayTimeSlotResponseDto} from '../account/storeAccount/IStoreAccount';
import {UserAddress} from '../account/userAccount/userAddress/IUserAddress';
import {Coordinate} from '../mainScreen/IMainScreen';

export interface BasketItem {
  storeProductId: string;
  storeId: string;
  name: string;
  orderQuantity: number;
  description: string;
  orderNote?: string;
  thumbnailUrl?: string;
  price: number;
  campaignPrice?: number;
  discountAmount?: number;
  currencyId?: number;
  currencyCode?: string;
  currencyName?: string;
  ingredients?: string[] | null;
  usedCampaignIds?: string[] | null;
}

export interface BasketProperties {
  id?: string;
  shopperId?: string;
  shopperAddress?: UserAddress;
  storeId?: string;
  storeName?: string;
  storeLocation?: Coordinate;
  deliveryTime?: string;
  deliveryType: string;
  deliveryFee?: number;
  orderNote?: string;
  availableWorkingDayTimeSlotsAll?: WorkingDayTimeSlotResponseDto[];
  availableWorkingDayTimeSlotsWithCourrier?: WorkingDayTimeSlotResponseDto[];
  totalPrice: number;
  totalItemCount: number;
}

export interface Basket {
  basketProperties?: BasketProperties;
  basketItems?: BasketItem[] | null;
}
