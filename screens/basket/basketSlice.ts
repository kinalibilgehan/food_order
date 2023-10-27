import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {reduxstore} from '../../reduxstore/reduxstore';
import {
  ModalTypeEnum,
  setCustomModalModalResultState,
} from '../../components/general/modals/customModalComponentSlice';
import {BasketDto} from '../../dtos/order/subClasses/basketDto';
import {BasketItemDto} from '../../dtos/order/subClasses/basketItemDto';
import {BasketPropertiesDto} from '../../dtos/order/subClasses/basketPropertiesDto';
import {WorkingDayTimeSlotResponseDto} from '../account/storeAccount/IStoreAccount';
import {createOrUpdateBasket} from '../../components/store/storeProductSubComponents/StoreProductAddToCartComponent';

// declaring the types for our state

export type BasketState = {
  basket: BasketDto;
  updateBasketTimeoutId: number;
  lastSelectedBasketItem: BasketItemDto | null;
  availableWorkingDayTimeSlotsAll: WorkingDayTimeSlotResponseDto[];
  availableWorkingDayTimeSlotsWithCourrier: WorkingDayTimeSlotResponseDto[];
};

const initialState: BasketState = {
  basket: {
    basketItems: [],
    basketProperties: {
      totalPrice: 0,
      totalItemCount: 0,
    },
  },
  updateBasketTimeoutId: -4861,
  lastSelectedBasketItem: null,
  availableWorkingDayTimeSlotsAll: [],
  availableWorkingDayTimeSlotsWithCourrier: [],
};

const EmptyBasketModalPopup = (action: any) => {
  let helperModalState = {
    ...reduxstore.getState().customModalComponent.modalResult,
  };
  // let helperStoreState = {...reduxstore.getState().basket.basketProperties};
  helperModalState.modalText =
    'Farklı restorandan ürün eklemek sepetinizi boşaltacaktır. Devam etmek istiyor musunuz?';
  helperModalState.modalHeaderText = 'Ups!';
  helperModalState.showModal = true;
  helperModalState.modalType = ModalTypeEnum.DifferentRestaurantModal;
  helperModalState.help = action;
  reduxstore.dispatch(setCustomModalModalResultState(helperModalState));
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setBasketItems: (state, action: PayloadAction<BasketItemDto[]>) => {
      state.basket.basketItems = action.payload;
    },
    setBasketProperties: (
      state,
      action: PayloadAction<BasketPropertiesDto>,
    ) => {
      if (
        state.basket.basketProperties.deliveryType !==
          action.payload.deliveryType ||
        state.basket.basketProperties.orderNote !== action.payload.orderNote
      ) {
        state.basket.basketProperties = action.payload;
        state.basket.basketProperties.storeId = action.payload.storeId;
        setTimeout(() => {
          createOrUpdateBasket();
        }, 1);
      }
    },
    setBasketAvailableWorkingDayTimeSlotsWithCourrier: (
      state,
      action: PayloadAction<WorkingDayTimeSlotResponseDto[]>,
    ) => {
      state.availableWorkingDayTimeSlotsWithCourrier = action.payload;
    },
    setBasketAvailableWorkingDayTimeSlotsAll: (
      state,
      action: PayloadAction<WorkingDayTimeSlotResponseDto[]>,
    ) => {
      state.availableWorkingDayTimeSlotsAll = action.payload;
    },
    addItemToBasket: (state, action: PayloadAction<BasketItemDto>) => {
      if (action.payload === null) {
        return;
      }
      //#region Son Seçilen Ürün Hafızaya Alınıyor
      state.lastSelectedBasketItem = action.payload;
      //#endregion Son Seçilen Ürün Hafızaya Alınıyor
      let helperState = {...state};
      if (!helperState.basket.basketProperties.storeId) {
        state.basket.basketProperties.storeId = action.payload.storeId;
      } else {
        if (
          helperState.basket.basketProperties.storeId !== action.payload.storeId
        ) {
          setTimeout(() => {
            EmptyBasketModalPopup(action.payload);
          }, 0);
          return;
        }
      }
      const correspondingBasketItemIndex =
        helperState.basket.basketItems.findIndex(
          item => item.storeProductId === action.payload.storeProductId,
        );
      if (correspondingBasketItemIndex === -1) {
        helperState.basket.basketItems.push(action.payload);
        helperState.basket.basketProperties.totalPrice += action.payload.price;
        helperState.basket.basketProperties.totalItemCount++;
      } else {
        helperState.basket.basketItems[
          correspondingBasketItemIndex
        ].orderQuantity += 1;
        helperState.basket.basketProperties.totalPrice +=
          helperState.basket.basketItems[correspondingBasketItemIndex].price;
        helperState.basket.basketProperties.totalItemCount++;
      }
      state.basket.basketItems = helperState.basket.basketItems;
      state.basket.basketProperties = helperState.basket.basketProperties;
      setTimeout(() => {
        createOrUpdateBasket();
      }, 1);
    },
    removeItemFromBasket: (state, action: PayloadAction<BasketItemDto>) => {
      let helperState = {...state};
      const correspondingBasketItemIndex =
        helperState.basket.basketItems.findIndex(
          item => item.storeProductId === action.payload.storeProductId,
        );
      if (correspondingBasketItemIndex === -1) {
        return;
      } else {
        if (
          helperState.basket.basketItems[correspondingBasketItemIndex]
            .orderQuantity === 1
        ) {
          helperState.basket.basketProperties.totalItemCount--;
          helperState.basket.basketProperties.totalPrice -=
            helperState.basket.basketItems[correspondingBasketItemIndex].price;
          helperState.basket.basketItems =
            helperState.basket.basketItems.filter(
              item => item.storeProductId !== action.payload.storeProductId,
            );
        } else {
          helperState.basket.basketItems[
            correspondingBasketItemIndex
          ].orderQuantity -= 1;
          helperState.basket.basketProperties.totalPrice -=
            helperState.basket.basketItems[correspondingBasketItemIndex].price;
          helperState.basket.basketProperties.totalItemCount--;
        }
      }
      state.basket.basketProperties = helperState.basket.basketProperties;
      state.basket.basketItems = helperState.basket.basketItems;
      if (helperState.basket.basketItems.length === 0) {
        state.basket.basketProperties.storeId = null;
        state.basket.basketProperties = initialState.basket.basketProperties;
      }
      setTimeout(() => {
        createOrUpdateBasket();
      }, 1);
    },
    resetBasket: state => {
      state.basket.basketItems = initialState.basket.basketItems;
      state.basket.basketProperties = initialState.basket.basketProperties;
      state.basket.basketProperties.storeId = null;
    },
    setBasketId: (state, action: PayloadAction<string>) => {
      state.basket.id = action.payload;
    },
    setUpdateBasketTimeoutId: (state, action: PayloadAction<number>) => {
      state.updateBasketTimeoutId = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setBasketItems,
  setBasketProperties,
  addItemToBasket,
  removeItemFromBasket,
  resetBasket,
  setBasketId,
  setUpdateBasketTimeoutId,
  setBasketAvailableWorkingDayTimeSlotsWithCourrier,
  setBasketAvailableWorkingDayTimeSlotsAll,
} = basketSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.

// exporting the reducer here, as we need to add this to the storeScreen
export default basketSlice.reducer;
