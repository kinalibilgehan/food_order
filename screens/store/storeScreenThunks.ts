import {AppThunk} from '../../reduxstore/reduxstore';
import {setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex} from './storeScreenSlice';

export const setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndexThunk =
  (currentSelectedIndex: number): AppThunk =>
  async (dispatch, getState) => {
    getState();
    // Eğer burada asenkron bir işlem yapacaksanız, yapabilirsiniz.
    // Örneğin:
    // await someAsyncFunction();

    // Asenkron işlemler tamamlandıktan sonra normal Redux action'ınızı çağırabilirsiniz.
    dispatch(
      setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex(
        currentSelectedIndex,
      ),
    );
  };
