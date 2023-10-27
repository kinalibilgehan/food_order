import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coordinate} from '../../../mainScreen/IMainScreen';
import {Globals} from '../../../../globals';

// declaring the types for our state
export type CreateCusineScreenState = {
  bio1: string;
  bio2: string;
  storeName: string;
  storeLocation?: Coordinate;
  showWorkingHoursSelector: boolean;
  hasCourrierService: boolean;
  minimumOrderPrice: number;
  countryName?: string;
  postalCode?: string;
  provinceName: string;
  cityName: string;
  disctrictName?: string;
  streetName?: string;
  doorNumber?: string;
  addressText: string;
  defaultOpenningTime: string;
  defaultClosingTime: string;
  isHeaderImageSelected: boolean;
  headerImageUrl: string;
  headerImageBase64: string;
  isAvatarImageSelected: boolean;
  avatarImageUrl: string;
  avatarImageBase64: string;
};

const initialState: CreateCusineScreenState = {
  bio1: '',
  bio2: '',
  storeName: '',
  storeLocation: undefined,
  showWorkingHoursSelector: false,
  hasCourrierService: false,
  minimumOrderPrice: 90,
  countryName: '',
  provinceName: '',
  cityName: '',
  postalCode: '',
  addressText: '',
  defaultOpenningTime: '12:00',
  defaultClosingTime: '20:00',
  isHeaderImageSelected: false,
  headerImageUrl: Globals.url.APPLICATIONIMAGEPATH + 'HeaderDefault.png',
  headerImageBase64: '',
  isAvatarImageSelected: false,
  avatarImageUrl: Globals.url.APPLICATIONIMAGEPATH + 'AvatarDefault.png',
  avatarImageBase64: '',
};

export const createCusineScreenSlice = createSlice({
  name: 'createCusineScreen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setCreateCusineScreenState: (
      state,
      action: PayloadAction<CreateCusineScreenState>,
    ) => {
      let helperState = {...action.payload};
      state.addressText = helperState.addressText;
      state.avatarImageBase64 = helperState.avatarImageBase64;
      state.avatarImageUrl = helperState.avatarImageUrl;
      state.bio1 = helperState.bio1;
      state.bio2 = helperState.bio2;
      state.cityName = helperState.cityName;
      state.countryName = helperState.countryName;
      state.defaultClosingTime = helperState.defaultClosingTime;
      state.defaultOpenningTime = helperState.defaultOpenningTime;
      state.hasCourrierService = helperState.hasCourrierService;
      state.headerImageBase64 = helperState.headerImageBase64;
      state.headerImageUrl = helperState.headerImageUrl;
      state.isAvatarImageSelected = helperState.isAvatarImageSelected;
      state.isHeaderImageSelected = helperState.isHeaderImageSelected;
      state.minimumOrderPrice = helperState.minimumOrderPrice;
      state.postalCode = helperState.postalCode;
      state.provinceName = helperState.provinceName;
      state.showWorkingHoursSelector = helperState.showWorkingHoursSelector;
      state.storeLocation = helperState.storeLocation;
      state.storeName = helperState.storeName;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {setCreateCusineScreenState} = createCusineScreenSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export default createCusineScreenSlice.reducer;
