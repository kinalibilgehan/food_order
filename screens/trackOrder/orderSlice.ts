import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum OrderStateEnum {
  Forwarded,
  Preparing,
  OnWay,
  Delivered,
}

type OrderState = {
  orderState: OrderStateEnum;
};

const initialState: OrderState = {
  orderState: OrderStateEnum.Forwarded,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderState: (state, action: PayloadAction<OrderState>) => {
      state.orderState = action.payload.orderState;
    },
  },
});
export const {setOrderState} = orderSlice.actions;

export default orderSlice.reducer;
