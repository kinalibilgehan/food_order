import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {subscribeAndConsumePushNotifications} from '../../helperFunctions/pushNotifications/pushNotifications';
import {UserDto} from '../../dtos/identity/subClasses/userDto';

// declaring the types for our state
export type IUserAccountState = {
  user?: UserDto;
};

const initialState: IUserAccountState = {};

export const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setUserAccountState: (state, action: PayloadAction<UserDto>) => {
      let helperState = {...action.payload};
      state.user = helperState;
      setTimeout(() => {
        subscribeAndConsumePushNotifications();
      }, 10);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserAccountInitialState: (state, action: PayloadAction<boolean>) => {
      let helperState = {...initialState};
      state.user = helperState.user;
    },
  },
});
export const {setUserAccountState, setUserAccountInitialState} =
  userAccountSlice.actions;

export default userAccountSlice.reducer;
