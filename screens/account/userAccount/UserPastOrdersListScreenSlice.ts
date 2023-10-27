import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderDto} from '../../../dtos/order/subClasses/orderDto';

// declaring the types for our state
export type UserPastOrdersListScreenState = {
  selectedOrder?: OrderDto;
};

const initialState: UserPastOrdersListScreenState = {};

export const UserPastOrdersListScreenSlice = createSlice({
  name: 'UserPastOrdersListScreen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setUserPastOrdersListScreenSelectedOrderState: (
      state,
      action: PayloadAction<OrderDto>,
    ) => {
      let helperState = {...action.payload};
      state.selectedOrder = helperState;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {setUserPastOrdersListScreenSelectedOrderState} =
  UserPastOrdersListScreenSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export default UserPastOrdersListScreenSlice.reducer;
