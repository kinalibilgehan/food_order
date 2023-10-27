import {ModalResult} from '../../../components/general/modals/customModalComponentSlice';
import {Coordinate} from '../../mainScreen/IMainScreen';

export interface CreateStoreRequestDto {
  ownerId: string | null;
  managerIds: string[] | null;
  addressText: string;
  avarageDeliveryTime: string;
  defaultOpeningTime: string;
  defaultClosingTime: string;
  bio1: string;
  bio2: string;
  postalCode?: string;
  provinceName: string;
  cityName: string;
  coordinate: Coordinate;
  countryName: string;
  hasCourrierService: boolean;
  headerImageBase64: string;
  avatarImageBase64: string;
  storeName: string;
}

export interface ApiResult {
  hasError: boolean;
  hasWarning: boolean;
  isSuccess: boolean;
  resultMessage: string;
  warningMessage: string;
  statusCode: number;
}

export interface BaseApiResponse {
  result: ApiResult;
  modalResult: ModalResult;
}

export interface CreateStoreResponseDto extends BaseApiResponse {
  storeId: string;
}
