import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../reduxstore/reduxstore';

// declaring the types for our state
export type AuthenticationStatusState = {
  Authenticated: boolean;
  Token: string | null;
  Guest: boolean;
  LoginAuthenticatedUsername?: string;
  LoginUsername?: string;
  LoginEmail?: string;
  LoginPhoneNumber?: string;
  LoginPassword?: string;
  SignupUsername?: string;
  SignupEmail?: string;
  SignupPhoneNumber?: string;
  SignupPassword?: string;
  SignupConfirmPassword?: string;
};

const initialState: AuthenticationStatusState = {
  Authenticated: false,
  Token: null,
  Guest: true,
  LoginAuthenticatedUsername: undefined,
  LoginUsername: undefined,
  LoginEmail: undefined,
  LoginPhoneNumber: undefined,
  LoginPassword: undefined,
  SignupUsername: undefined,
  SignupEmail: undefined,
  SignupPhoneNumber: undefined,
  SignupPassword: undefined,
  SignupConfirmPassword: undefined,
};

export enum LoginSignupInputTypeEnum {
  LoginAuthenticatedUsername,
  LoginUsername,
  LoginEmail,
  LoginPhoneNumber,
  LoginPassword,
  SignupUsername,
  SignupEmail,
  SignupPhoneNumber,
  SignupPassword,
  SignupConfirmPassword,
}

export const authenticationStatusSlice = createSlice({
  name: 'authenticationStatus',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
      state.Authenticated = action.payload;
    },
    setGuestStatus: (state, action: PayloadAction<boolean>) => {
      state.Guest = action.payload;
    },
    setJWTTokenValue: (state, action: PayloadAction<string>) => {
      state.Token = action.payload;
    },
    setLoginSignupInputValue: (
      state,
      action: PayloadAction<{
        inputType: LoginSignupInputTypeEnum;
        value: string;
      }>,
    ) => {
      if (
        action.payload.inputType ===
        LoginSignupInputTypeEnum.LoginAuthenticatedUsername
      ) {
        state.LoginAuthenticatedUsername = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.LoginUsername
      ) {
        state.LoginUsername = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.LoginEmail
      ) {
        state.LoginEmail = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.LoginPhoneNumber
      ) {
        state.LoginPhoneNumber = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.LoginPassword
      ) {
        state.LoginPassword = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.SignupUsername
      ) {
        state.SignupUsername = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.SignupEmail
      ) {
        state.SignupEmail = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.SignupPhoneNumber
      ) {
        state.SignupPhoneNumber = action.payload.value;
      } else if (
        action.payload.inputType === LoginSignupInputTypeEnum.SignupPassword
      ) {
        state.SignupPassword = action.payload.value;
      } else if (
        action.payload.inputType ===
        LoginSignupInputTypeEnum.SignupConfirmPassword
      ) {
        state.SignupConfirmPassword = action.payload.value;
      } else {
      }
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setAuthenticationStatus,
  setJWTTokenValue,
  setGuestStatus,
  setLoginSignupInputValue,
} = authenticationStatusSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getAuthenticationStatus = (state: RootState) =>
  state.authenticationStatus.Authenticated;
export const getGuestStatus = (state: RootState) =>
  state.authenticationStatus.Guest;
export const getJWTTokenValue = (state: RootState) =>
  state.authenticationStatus.Token;
export const getLoginSignupInputValue = (
  state: RootState,
  inputType: LoginSignupInputTypeEnum,
) => {
  if (inputType === LoginSignupInputTypeEnum.LoginAuthenticatedUsername) {
    return state.authenticationStatus.LoginAuthenticatedUsername;
  } else if (inputType === LoginSignupInputTypeEnum.LoginUsername) {
    return state.authenticationStatus.LoginUsername;
  } else if (inputType === LoginSignupInputTypeEnum.LoginEmail) {
    return state.authenticationStatus.LoginEmail;
  } else if (inputType === LoginSignupInputTypeEnum.LoginPhoneNumber) {
    return state.authenticationStatus.LoginPhoneNumber;
  } else if (inputType === LoginSignupInputTypeEnum.LoginPassword) {
    return state.authenticationStatus.LoginPassword;
  } else if (inputType === LoginSignupInputTypeEnum.SignupUsername) {
    return state.authenticationStatus.SignupUsername;
  } else if (inputType === LoginSignupInputTypeEnum.SignupEmail) {
    return state.authenticationStatus.SignupEmail;
  } else if (inputType === LoginSignupInputTypeEnum.SignupPhoneNumber) {
    return state.authenticationStatus.SignupPhoneNumber;
  } else if (inputType === LoginSignupInputTypeEnum.SignupPassword) {
    return state.authenticationStatus.SignupPassword;
  } else if (inputType === LoginSignupInputTypeEnum.SignupConfirmPassword) {
    return state.authenticationStatus.SignupConfirmPassword;
  } else {
  }
};
// exporting the reducer here, as we need to add this to the AuthenticationStatus
export default authenticationStatusSlice.reducer;
