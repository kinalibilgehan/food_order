import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import StoreProductsWithAisle from '../../components/store/StoreProductsWithAisle';
import agent from '../../api/agent';
import {StoreCategoryAndProductsDto} from './IStoreScreen';
import {reduxstore} from '../../reduxstore/reduxstore';
import {
  setshowAboveTopApplicationBar,
  setStatusBarBackgroundColor,
  setTopApplicationBarBackgroudColor,
} from '../start/targetEnvironmentSlice';
import {useAppSelector} from '../../reduxstore/reduxhooks';
import StoreScreenStickyHeaderComponent from '../../components/store/headers/StoreScreenStickyHeaderComponent';
import {
  setStoreProductsFlatListRef,
  setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex,
  setStoreScreenStickyHeaderSelectorState,
  setStoreScreenStickyHeaderSelectorStates,
  StoreScreenStickyHeaderSelectorState,
} from './storeScreenSlice';
import StoreHeaderComponent from '../../components/store/headers/StoreHeaderComponent';
import StoreScreenStickyHeaderComponentAbsolute from '../../components/store/headers/StoreScreenStickyHeaderComponentAbsolute';

export const throttler = (
  timeOut: number,
  lastEventTime: React.MutableRefObject<Date>,
): boolean => {
  const currentTime = new Date();
  const timeSpan = Math.abs(
    currentTime.getTime() - lastEventTime.current.getTime(),
  );
  if (timeSpan >= timeOut) {
    lastEventTime.current = new Date();
    return true;
  } else {
    return false;
  }
};

const StoreScreen = memo(() => {
  const selectedStore = reduxstore.getState().mainScreen.selectedStore!;
  //alt satır UseParam örneği
  //const {storeId} = useParams();
  console.log('StoreScreenRendered');
  const lastScrollEventTime = useRef(new Date());
  const [storeCategoryAndProductsDtos, setStoreCategoryAndProductsDtos] =
    useState<StoreCategoryAndProductsDto[]>([]);
  const marginTop =
    -reduxstore.getState().targetEnvironment.AppScreenDimensions
      .statusbarHeight -
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .topApplicationBarHeight;
  const storeHeaderHeight =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width * 0.65;
  const backgroundColor = useAppSelector(
    data => data.targetEnvironment.ThemeSettings?.firstColor,
  );
  const flatListDefaultTopOffset = storeHeaderHeight + marginTop;
  const storeProductsFlatListRef =
    useRef<FlatList<StoreCategoryAndProductsDto>>(null);

  const getStoreProducts = async () => {
    try {
      const response = await agent.Store.getStoreProducts(selectedStore.id!);
      arrangeStoreScreenStickyHeaderSelectorStates(response);
      setStoreCategoryAndProductsDtos(response);
    } catch (error) {
      console.log(error);
    }
  };
  const arrangeStoreScreenStickyHeaderSelectorStates = (
    data: StoreCategoryAndProductsDto[],
  ) => {
    let helper: StoreScreenStickyHeaderSelectorState[] = [];
    if (data && data[1] && data[1].aisles && data[1].aisles.length > 0) {
      data[1].aisles.forEach((element, index) => {
        if (index === 0) {
          const obj: StoreScreenStickyHeaderSelectorState = {
            index: index,
            isSelected: true,
            title: element,
            topOffset: 0,
            height: -1,
          };
          helper.push(obj);
        } else {
          const obj: StoreScreenStickyHeaderSelectorState = {
            index: index,
            isSelected: false,
            title: element,
            topOffset: 0,
            height: -1,
          };
          helper.push(obj);
        }
      });
      reduxstore.dispatch(setStoreScreenStickyHeaderSelectorStates(helper));
    }
  };

  useEffect(() => {
    reduxstore.dispatch(
      setStoreProductsFlatListRef(storeProductsFlatListRef.current),
    );
    reduxstore.dispatch(setStatusBarBackgroundColor('transparent'));
    reduxstore.dispatch(setTopApplicationBarBackgroudColor('transparent'));
    reduxstore.dispatch(setshowAboveTopApplicationBar(false));
    getStoreProducts();
    return () => {
      reduxstore.dispatch(
        setStatusBarBackgroundColor(
          reduxstore.getState().targetEnvironment.ThemeSettings?.firstColor!,
        ),
      );
      reduxstore.dispatch(
        setTopApplicationBarBackgroudColor(
          reduxstore.getState().targetEnvironment.ThemeSettings?.firstColor!,
        ),
      );
      reduxstore.dispatch(setshowAboveTopApplicationBar(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!throttler(16.666, lastScrollEventTime)) {
      return;
    }
    let offSetY = event.nativeEvent.contentOffset.y;
    if (offSetY > flatListDefaultTopOffset) {
      if (!reduxstore.getState().targetEnvironment.showAboveTopApplicationBar) {
        reduxstore.dispatch(setStatusBarBackgroundColor('white'));
        reduxstore.dispatch(setTopApplicationBarBackgroudColor('white'));
        reduxstore.dispatch(setshowAboveTopApplicationBar(true));
      }
    } else if (offSetY <= flatListDefaultTopOffset) {
      if (reduxstore.getState().targetEnvironment.showAboveTopApplicationBar) {
        reduxstore.dispatch(setStatusBarBackgroundColor('transparent'));
        reduxstore.dispatch(setTopApplicationBarBackgroudColor('transparent'));
        reduxstore.dispatch(setshowAboveTopApplicationBar(false));
      }
    }
    let storeScreenStickyHeaderSelectorStates = [
      ...reduxstore.getState().storeScreen
        .StoreScreenStickyHeaderSelectorStates,
    ];
    //storeScreenStickyHeaderSelectorStates = storeScreenStickyHeaderSelectorStates.sort(function (a: any, b: any) { return a.index! - b.index! });

    for (let i = 0; i < storeScreenStickyHeaderSelectorStates.length; i++) {
      let minval =
        i === 0 ? -10 : storeScreenStickyHeaderSelectorStates[i - 1].topOffset;
      let maxval =
        i === storeScreenStickyHeaderSelectorStates.length - 1
          ? 99999
          : storeScreenStickyHeaderSelectorStates[i].topOffset;
      //console.log(minval, maxval, i);
      if (minval - 150 <= offSetY && offSetY + 150 <= maxval) {
        const itm = {
          ...storeScreenStickyHeaderSelectorStates.filter(
            a => a.index === i,
          )[0],
        };
        if (itm.isSelected) {
          return;
        }
        itm.isSelected = true;
        let indis = 0;
        if (i === 0) {
          indis = 0;
        } else if (i === 1) {
          indis = 0;
        } else if (i === 2) {
          indis = 0;
        } else {
          indis = i - 2;
        }

        reduxstore.dispatch(setStoreScreenStickyHeaderSelectorState(itm));
        reduxstore.dispatch(
          setStoreScreenStickyHeaderSelectorFlatListRefScrollToIndex(indis),
        );
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        marginTop: marginTop,
        zIndex: 60,
      }}>
      <StoreScreenStickyHeaderComponentAbsolute
        isAbsolute={true}
        flatListDefaultTopOffset={flatListDefaultTopOffset}
      />
      <FlatList
        ref={storeProductsFlatListRef}
        onScroll={handleScroll}
        contentContainerStyle={{flexGrow: 1}}
        //estimatedItemSize={20}
        style={{flex: 1, backgroundColor: 'white'}}
        scrollEventThrottle={10}
        keyExtractor={(item, index) => item.aisleName! + index}
        removeClippedSubviews={false}
        data={storeCategoryAndProductsDtos}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <StoreHeaderComponent
                store={selectedStore}
                storeHeaderHeight={storeHeaderHeight}
                categoryIndex={index}
                key={item.aisleName}
              />
            );
          } else if (index === 1) {
            return (
              <StoreScreenStickyHeaderComponent
                isAbsolute={false}
                flatListDefaultTopOffset={flatListDefaultTopOffset}
              />
            );
          } else {
            return (
              <StoreProductsWithAisle
                storeCategoryAndProductsDto={item}
                categoryIndex={index - 2}
                key={item.aisleName}
                defaultTopOffset={flatListDefaultTopOffset}
              />
            );
          }
        }}
      />
    </View>
  );
});

export default StoreScreen;
