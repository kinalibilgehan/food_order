import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum OrderTypeFilter {
  Default,
  Popular,
  StoreScore,
  DeliveryTime,
}

export enum OtherFilters {
  Promoted,
  ReadyForDelivery,
  HasDelivery,
  TakeAway,
  ScheduledOrder,
}

export enum SpecialIngredientsFilter {
  Vegetarian,
  Vegan,
  OliveOil,
  Hot,
  GlutenFree,
}

export enum CategoryFilter {
  Meal,
  Dessert,
  Grocery,
  Delicatessen,
  Bakery,
}

export interface IFilter {
  filterName: string;
  value: number;
}

// export interface ICategoryFilter {
//   filterName: string;
// }

// export interface ISpecialIngredients {
//   filterName: string;
// }

export interface IOrderAndFilter {
  orderType: OrderTypeFilter;
  otherFilters: OtherFilters[];
  filter: IFilter[];
  categoryFilter: CategoryFilter[];
  specialIngredients: SpecialIngredientsFilter[];
}

export interface IOtherFiltersState {
  value: boolean;
  filterType: OtherFilters;
}

export interface ISpecialIngredientsState {
  value: boolean;
  filterType: SpecialIngredientsFilter;
}

export interface ICategoryFiltersState {
  value: boolean;
  filterType: CategoryFilter;
}

// declaring the types for our state
export type FilterScreenState = {
  orderType: OrderTypeFilter;
  otherFilters: OtherFilters[];
  filter: IFilter[];
  categoryFilter: CategoryFilter[];
  specialIngredientsFilters: SpecialIngredientsFilter[];
};

const initialState: FilterScreenState = {
  orderType: OrderTypeFilter.Default,
  otherFilters: [],
  filter: [{filterName: 'Minimum Package', value: 50}],
  categoryFilter: [],
  specialIngredientsFilters: [],
};

export const filterScreenSlice = createSlice({
  name: 'filterScreen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    setOtherFiltersState: (
      state,
      action: PayloadAction<IOtherFiltersState>,
    ) => {
      let currentOtherFiltersState = {...state}.otherFilters;
      const e = action.payload.value;
      const haveFilter = currentOtherFiltersState.some(
        item => item === action.payload.filterType,
      );

      if (e && !haveFilter) {
        currentOtherFiltersState.push(action.payload.filterType);
        state.otherFilters = currentOtherFiltersState;
      }
      if (!e && haveFilter) {
        currentOtherFiltersState = currentOtherFiltersState.filter(
          item => item !== action.payload.filterType,
        );
        state.otherFilters = currentOtherFiltersState;
      }
      console.log(currentOtherFiltersState);
    },
    setSpecialIngredientsState: (
      state,
      action: PayloadAction<ISpecialIngredientsState>,
    ) => {
      let currentSpecialIngredientsFiltersState = {...state}
        .specialIngredientsFilters;
      const e = action.payload.value;
      const haveFilter = currentSpecialIngredientsFiltersState.some(
        item => item === action.payload.filterType,
      );

      if (e && !haveFilter) {
        currentSpecialIngredientsFiltersState.push(action.payload.filterType);
        state.specialIngredientsFilters = currentSpecialIngredientsFiltersState;
      }
      if (!e && haveFilter) {
        currentSpecialIngredientsFiltersState =
          currentSpecialIngredientsFiltersState.filter(
            item => item !== action.payload.filterType,
          );
        state.specialIngredientsFilters = currentSpecialIngredientsFiltersState;
      }

      console.log(currentSpecialIngredientsFiltersState);
    },
    setCategoryFilterState: (
      state,
      action: PayloadAction<ICategoryFiltersState>,
    ) => {
      let currentCategoryFiltersState = {...state}.categoryFilter;
      const e = action.payload.value;
      const haveFilter = currentCategoryFiltersState.some(
        item => item === action.payload.filterType,
      );

      if (e && !haveFilter) {
        currentCategoryFiltersState.push(action.payload.filterType);
        state.categoryFilter = currentCategoryFiltersState;
      }
      if (!e && haveFilter) {
        currentCategoryFiltersState = currentCategoryFiltersState.filter(
          item => item !== action.payload.filterType,
        );
        state.categoryFilter = currentCategoryFiltersState;
      }
      console.log(currentCategoryFiltersState);
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {setOtherFiltersState} = filterScreenSlice.actions;
export const {setSpecialIngredientsState} = filterScreenSlice.actions;
export const {setCategoryFilterState} = filterScreenSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export default filterScreenSlice.reducer;
