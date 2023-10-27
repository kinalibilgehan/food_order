import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// declaring the types for our state
export type IStoreAccountState = {
  storeName?: string;
  storeHeaderImageUrl?: string;
  storeAvatarImageUrl?: string;
  takenOrders?: any;
  storeProducts?: any;
  storeAisles?: any;
  storeCampaigns?: any;
  generalWeeklyWorkingHours?: any;
};

const initialState: IStoreAccountState = {};

export const storeAccountSlice = createSlice({
  name: 'storeAccount',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setStoreAccountState: (
      state,
      action: PayloadAction<IStoreAccountState>,
    ) => {
      let helperState = {...action.payload};
      state.storeName = helperState.storeName;
      state.storeHeaderImageUrl = helperState.storeHeaderImageUrl;
      state.storeAvatarImageUrl = helperState.storeAvatarImageUrl;
      state.takenOrders = helperState.takenOrders;
      state.storeProducts = helperState.storeProducts;
      state.storeAisles = helperState.storeAisles;
      state.storeCampaigns = helperState.storeCampaigns;
      state.generalWeeklyWorkingHours = helperState.generalWeeklyWorkingHours;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setStoreAccountInitialState: (state, action: PayloadAction<boolean>) => {
      let helperState = {...initialState};
      state.storeName = helperState.storeName;
      state.storeHeaderImageUrl = helperState.storeHeaderImageUrl;
      state.storeAvatarImageUrl = helperState.storeAvatarImageUrl;
      state.takenOrders = helperState.takenOrders;
      state.storeProducts = helperState.storeProducts;
      state.storeAisles = helperState.storeAisles;
      state.storeCampaigns = helperState.storeCampaigns;
      state.generalWeeklyWorkingHours = helperState.generalWeeklyWorkingHours;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {setStoreAccountState, setStoreAccountInitialState} =
  storeAccountSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export default storeAccountSlice.reducer;
