import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Globals} from '../../../globals';

// declaring the types for our state
export type CreateStoreProductScreenState = {
  isHeaderImageSelected: boolean;
  headerImageUrl: string;
  headerImageBase64: string;
  productName: string;
  productDescription: string;
  preperationTimeDay: string;
  preperationTimeHour: string;
  preperationTimeMinute: string;
  productStock: number | string;
  productPrice: number | string;
  productAisles: string[];
  selectedProductAisles: string[];
  productCategories: string[];
  selectedProductCategories: string[];
  specialIngredients: string[];
  selectedSpecialIngredients: string[];
  zIndexStoreProductAisleDropdown: number;
  zIndexStoreProductCategoryDropdown: number;
};

const initialState: CreateStoreProductScreenState = {
  isHeaderImageSelected: false,
  headerImageUrl: Globals.url.APPLICATIONIMAGEPATH + 'HeaderDefault.png',
  headerImageBase64: '',
  productName: '',
  productDescription: '',
  preperationTimeDay: '0',
  preperationTimeHour: '00',
  preperationTimeMinute: '30',
  productStock: 0,
  productPrice: 0,
  productAisles: [],
  selectedProductAisles: [],
  productCategories: [],
  selectedProductCategories: [],
  specialIngredients: [],
  selectedSpecialIngredients: [],
  zIndexStoreProductAisleDropdown: 88888,
  zIndexStoreProductCategoryDropdown: 99999,
};

export const createStoreProductScreenSlice = createSlice({
  name: 'createStoreProductScreen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setCreateStoreProductScreenState: (
      state,
      action: PayloadAction<CreateStoreProductScreenState>,
    ) => {
      let helperState = {...action.payload};
      state.headerImageUrl = helperState.headerImageUrl;
      state.isHeaderImageSelected = helperState.isHeaderImageSelected;
      state.headerImageBase64 = helperState.headerImageBase64;
      state.preperationTimeDay = helperState.preperationTimeDay;
      state.preperationTimeHour = helperState.preperationTimeHour;
      state.preperationTimeMinute = helperState.preperationTimeMinute;
      state.productDescription = helperState.productDescription;
      state.productName = helperState.productName;
      state.productPrice = helperState.productPrice;
      state.productStock = helperState.productStock;
      state.zIndexStoreProductAisleDropdown =
        helperState.zIndexStoreProductAisleDropdown;
      state.zIndexStoreProductCategoryDropdown =
        helperState.zIndexStoreProductCategoryDropdown;

      state.selectedProductCategories = helperState.selectedProductCategories;
    },
    setCreateStoreProductProductCategoriesState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.productCategories = action.payload;
    },
    setCreateStoreProductSelectedProductCategoriesState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedProductCategories = action.payload;
    },
    setCreateStoreProductProductAislesState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.productAisles = action.payload;
    },
    setCreateStoreProductProductSelectedAislesState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedProductAisles = action.payload;
    },
    setCreateStoreProductSpecialIngredientsState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.specialIngredients = action.payload;
    },
    setCreateStoreProductSelectedSpecialIngredientsState: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedSpecialIngredients = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setCreateStoreProductScreenState,
  setCreateStoreProductProductCategoriesState,
  setCreateStoreProductSelectedProductCategoriesState,
  setCreateStoreProductProductAislesState,
  setCreateStoreProductProductSelectedAislesState,
  setCreateStoreProductSpecialIngredientsState,
  setCreateStoreProductSelectedSpecialIngredientsState,
} = createStoreProductScreenSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export default createStoreProductScreenSlice.reducer;
