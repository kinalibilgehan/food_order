import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {type RootState} from '../../reduxstore/reduxstore';

// declaring the types for our state
export type TargetEnvironmentState = {
  OS?: OSType;
  AppScreenDimensions: AppScreenDimensions;
  ThemeSettings?: ThemeSettings;
  showAboveTopApplicationBar?: boolean;
  ScreenHeight: number;
  ScreenWidth: number;
};

export interface AppScreenDimensions {
  height: number;
  width: number;
  statusbarHeight: number;
  bottomBarHeight: number;
  safeAreaHeight: number;
  bottomApplicationBarHeight: number;
  topApplicationBarHeight: number;
  topApplicationBarAbsoluteHeight: number;
  middleApplicationBodyHeight: number;
}
export interface ThemeSettings {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  mainBackgroundColor?: string;
  darkBackgroundColor?: string;
  transparentBackgroundColor?: string;
  headlineColor?: string;
  subheadlineColor?: string;
  redColor?: string;
  lightTextColor?: string;
  highlightColor?: string;
  statusBarBackgroudColor?: string;
  topApplicationBarBackgroudColor?: string;
  cardBackgroundColor: string;
  goldenColor: string;
  themeOption?: ThemeOption;
  marginVerticalLarge: number;
  marginVerticalMedium: number;
  marginVerticalSmall: number;
  marginHorizontalLarge: number;
  marginHorizontalMedium: number;
  marginHorizontalSmall: number;
  headerFontSize: number;
  subHeaderFontSize: number;
  bodyFontSize: number;
  subBodyFontSize: number;
}
export enum ThemeOption {
  light = 'light',
  dark = 'dark',
}
export enum OSType {
  IOS = 'ios',
  ANDROID = 'android',
  OTHER = 'other',
}

const initialState: TargetEnvironmentState = {
  ScreenHeight: 0,
  ScreenWidth: 0,
  ThemeSettings: {
    firstColor: 'white',
    secondColor: '#65D384',
    thirdColor: '#EEEEEE',
    // mainBackgroundColor: '#abd1c6', // will be set by redux store on app start up.
    darkBackgroundColor: '#004643',
    transparentBackgroundColor: 'rgba(255, 255, 254, 0.2)',
    headlineColor: '#001e1d',
    redColor: '#e16162',
    subheadlineColor: '#0f3433',
    highlightColor: '#f9bc60',
    lightTextColor: '#fffffe',
    statusBarBackgroudColor: 'white',
    topApplicationBarBackgroudColor: '#65D384',
    cardBackgroundColor: 'rgba(254, 255, 252, 0.8)',
    mainBackgroundColor: '#F8F5F2',
    goldenColor: '#FFC300',
    marginVerticalLarge: 16,
    marginVerticalMedium: 10,
    marginVerticalSmall: 6,
    marginHorizontalLarge: 9,
    marginHorizontalMedium: 6,
    marginHorizontalSmall: 3,
    headerFontSize: 24,
    subHeaderFontSize: 20,
    bodyFontSize: 16,
    subBodyFontSize: 12,

    themeOption: ThemeOption.light,
  },
  AppScreenDimensions: {
    height: 800,
    width: 360,
    statusbarHeight: 10,
    bottomBarHeight: 50,
    safeAreaHeight: 10,
    bottomApplicationBarHeight: 50,
    topApplicationBarHeight: 50,
    topApplicationBarAbsoluteHeight: 50,
    middleApplicationBodyHeight: 10,
  },
  showAboveTopApplicationBar: true,
};

export const targetEnvironmentSlice = createSlice({
  name: 'targetEnvironment',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    settargetEnvironmentOSType: (state, action: PayloadAction<OSType>) => {
      state.OS = action.payload;
    },
    setScreenHeight: (state, action: PayloadAction<number>) => {
      state.ScreenHeight = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.ScreenWidth = action.payload;
    },
    settargetEnvironmentAppScreenDimensions: (
      state,
      action: PayloadAction<AppScreenDimensions>,
    ) => {
      state.AppScreenDimensions = action.payload;
    },
    setStatusBarBackgroundColor: (state, action: PayloadAction<string>) => {
      state.ThemeSettings!.statusBarBackgroudColor = action.payload;
    },
    setTopApplicationBarBackgroudColor: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.ThemeSettings!.topApplicationBarBackgroudColor = action.payload;
    },
    setshowAboveTopApplicationBar: (state, action: PayloadAction<boolean>) => {
      state.showAboveTopApplicationBar = action.payload;
    },
    settargetEnvironmentThemeSettings: (
      state,
      action: PayloadAction<ThemeOption>,
    ) => {
      if (action.payload === ThemeOption.light) {
        state.ThemeSettings = {
          firstColor: 'white',
          secondColor: '#65D384',
          thirdColor: '#EEEEEE',
          statusBarBackgroudColor: 'white',
          topApplicationBarBackgroudColor: 'white',
          cardBackgroundColor: 'rgba(254, 255, 252, 0.8)',
          mainBackgroundColor: '#F8F5F2',
          goldenColor: '#FFC300',
          marginVerticalLarge: 16,
          marginVerticalMedium: 10,
          marginVerticalSmall: 6,
          marginHorizontalLarge: 9,
          marginHorizontalMedium: 6,
          marginHorizontalSmall: 3,
          headerFontSize: 24,
          subHeaderFontSize: 20,
          bodyFontSize: 16,
          subBodyFontSize: 12,

          themeOption: ThemeOption.light,
        };
      } else if (action.payload === ThemeOption.dark) {
        state.ThemeSettings = {
          firstColor: 'black',
          secondColor: '#65D384',
          thirdColor: '#EEEEEE',
          statusBarBackgroudColor: 'white',
          topApplicationBarBackgroudColor: 'white',
          cardBackgroundColor: 'rgba(254, 255, 252, 0.8)',
          mainBackgroundColor: '#F8F5F2',
          goldenColor: '#FFC300',
          marginVerticalLarge: 16,
          marginVerticalMedium: 10,
          marginVerticalSmall: 6,
          marginHorizontalLarge: 9,
          marginHorizontalMedium: 6,
          marginHorizontalSmall: 3,
          headerFontSize: 24,
          subHeaderFontSize: 20,
          bodyFontSize: 16,
          subBodyFontSize: 12,
          themeOption: ThemeOption.dark,
        };
      }
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  settargetEnvironmentOSType,
  setScreenHeight,
  setScreenWidth,
  settargetEnvironmentAppScreenDimensions,
  settargetEnvironmentThemeSettings,
  setStatusBarBackgroundColor,
  setshowAboveTopApplicationBar,
  setTopApplicationBarBackgroudColor,
} = targetEnvironmentSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const gettargetEnvironmentOSType = (state: RootState) =>
  state.targetEnvironment.OS;
export const gettargetEnvironmentAppScreenDimensions = (state: RootState) =>
  state.targetEnvironment.AppScreenDimensions;
export const gettargetEnvironmentThemeSettings = (state: RootState) =>
  state.targetEnvironment.ThemeSettings;
export const getshowAboveTopApplicationBar = (state: RootState) =>
  state.targetEnvironment.showAboveTopApplicationBar;
// exporting the reducer here, as we need to add this to the targetEnvironment
export default targetEnvironmentSlice.reducer;
