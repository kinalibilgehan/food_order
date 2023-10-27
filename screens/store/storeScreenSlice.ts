import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FlatList} from 'react-native';
import type {RootState} from '../../reduxstore/reduxstore';
import {StoreCategoryAndProductsDto} from './IStoreScreen';

// declaring the types for our state
export type StoreScreenState = {
  CategoryAreas?: CategoryArea[];
  FlatListRef?: FlatList<StoreCategoryAndProductsDto> | any;
  StoreScreenStickyHeaderSelectorFlatListRefAbsolute?:
    | FlatList<StoreScreenStickyHeaderSelectorState>
    | any;
  StoreScreenStickyHeaderSelectorFlatListRef?:
    | FlatList<StoreScreenStickyHeaderSelectorState>
    | any;
  SelectedCategorySelectionIndex: number;
  CategoryAreaOffsets: number[];
  StoreScreenStickyHeaderSelectorStates: StoreScreenStickyHeaderSelectorState[];
};

export interface StoreScreenStickyHeaderSelectorState {
  index: number;
  isSelected: boolean;
  title: string;
  topOffset: number;
  height: number;
}

export interface CategoryArea {
  index?: number;
  height?: number;
}
const initialState: StoreScreenState = {
  CategoryAreaOffsets: [],
  SelectedCategorySelectionIndex: 0,
  StoreScreenStickyHeaderSelectorStates: [],
};

export const storeScreenSlice = createSlice({
  name: 'storeScreen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setCategoryAreas: (state, action: PayloadAction<CategoryArea[]>) => {
      state.CategoryAreas = action.payload;
    },
    setStoreProductsFlatListRef: (
      state,
      action: PayloadAction<FlatList<StoreCategoryAndProductsDto> | null | any>,
    ) => {
      state.FlatListRef = action?.payload;
    },
    setStoreScreenStickyHeaderSelectorFlatListRef: (
      state,
      action: PayloadAction<FlatList<StoreScreenStickyHeaderSelectorState> | null>,
    ) => {
      state.StoreScreenStickyHeaderSelectorFlatListRef = action.payload;
    },
    setStoreScreenStickyHeaderSelectorFlatListRefAbsolute: (
      state,
      action: PayloadAction<FlatList<StoreScreenStickyHeaderSelectorState> | null>,
    ) => {
      state.StoreScreenStickyHeaderSelectorFlatListRefAbsolute = action.payload;
    },
    setSelectedCategorySelectionIndex: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.SelectedCategorySelectionIndex = action.payload;
    },
    setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.StoreScreenStickyHeaderSelectorFlatListRef?.scrollToIndex({
        animated: true,
        index: action.payload,
      });
      state.StoreScreenStickyHeaderSelectorFlatListRefAbsolute?.scrollToIndex({
        animated: true,
        index: action.payload,
      });
    },
    setCategoryAreaOffsets: (state, action: PayloadAction<number[]>) => {
      state.CategoryAreaOffsets = action.payload;
    },
    setStoreScreenStickyHeaderSelectorStates: (
      state,
      action: PayloadAction<StoreScreenStickyHeaderSelectorState[]>,
    ) => {
      state.StoreScreenStickyHeaderSelectorStates = action.payload;
    },
    setStoreScreenStickyHeaderSelectorState: (
      state,
      action: PayloadAction<StoreScreenStickyHeaderSelectorState>,
    ) => {
      const crrState = [...state.StoreScreenStickyHeaderSelectorStates];
      // gelen değer zaten seçili olan mı?
      if (action.payload.isSelected) {
        // Toplam bir tane seçili olabilir. Seçili olanın indeksi bulunuyor.
        const selectedIndex =
          state.StoreScreenStickyHeaderSelectorStates.findIndex(
            item => item.isSelected,
          );
        // seçili olan değişiyorsa, eski seçili olanı iptal et.
        if (selectedIndex > -1 && action.payload.index !== selectedIndex) {
          crrState[selectedIndex].isSelected = false;
        }
      }
      crrState[action.payload.index] = action.payload;
      // gelen statei kendi indeksine setle.
      state.StoreScreenStickyHeaderSelectorStates = crrState;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setCategoryAreas,
  setStoreProductsFlatListRef,
  setStoreScreenStickyHeaderSelectorFlatListRef,
  setStoreScreenStickyHeaderSelectorFlatListRefAbsolute,
  setSelectedCategorySelectionIndex,
  setCategoryAreaOffsets,
  setStoreScreenStickyHeaderSelectorStates,
  setStoreScreenStickyHeaderSelectorState,
  setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex,
} = storeScreenSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getCategoryAreas = (state: RootState) =>
  state.storeScreen.CategoryAreas;
export const getSelectedCategorySelectionIndex = (state: RootState) =>
  state.storeScreen.SelectedCategorySelectionIndex;
export const getStoreScreenStickyHeaderSelectorStates = (state: RootState) =>
  state.storeScreen.StoreScreenStickyHeaderSelectorStates;
// exporting the reducer here, as we need to add this to the storeScreen
export default storeScreenSlice.reducer;
