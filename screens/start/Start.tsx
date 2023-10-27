import React, {memo, useEffect, useRef, useState} from 'react';
import {NativeRouter, Routes, Route} from 'react-router-native';
import ErrorScreen from '../error/ErrorScreen';
import FileUploadScreen from '../fileUpload/FileUploadScreen';
import HomeScreen from '../HomeScreen';
import MapScreen from '../map/MapScreen';
import TestScreen from '../TestScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Dimensions,
  Platform,
  StatusBar,
  View,
  LayoutChangeEvent,
  Keyboard,
} from 'react-native';
import {reduxstore} from '../../reduxstore/reduxstore';
import {
  AppScreenDimensions,
  OSType,
  settargetEnvironmentAppScreenDimensions,
  settargetEnvironmentOSType,
} from './targetEnvironmentSlice';
import DevScreen from '../development/DevScreen';
import MainScreen from '../mainScreen/MainScreen';
import BottomApplicationBar from '../../components/applicationBars/bottomApplicationBar/BottomApplicationBar';
import TopApplicationBar from '../../components/applicationBars/topApplicationBar/TopApplicationBar';
import SwitchButton1 from '../../components/buttons/switches/SwitchButton1';
import CustomStatusBar from '../../components/applicationBars/customStatusBar/CustomStatusBar';
import {setAllHeights} from '../../components/store/headers/StoreScreenStickyHeaderComponent';
import StoreScreen from '../store/StoreScreen';
import AccountScreen from '../account/AccountScreen';
import WebViewScreen from '../webview/WebViewScreen';
import LinkingTest from '../linking/LinkingTest';
import OrderDetailsScreen from '../orderDetails/orderDetails';
import FilterScreen from '../filter/FilterScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';
import ParentLoginScreen from '../login/ParentLoginScreen';
import CreateStoreAccountScreen from '../account/storeAccount/CreateStoreAccountSettingsScreen';
import ReactNativeMapScreen from '../map/ReactNativeMapScreen';
import CreateCuisineCuisineAddressSubComponent from '../../components/account/storeAccount/createCuisineAddressComponents/CreateCuisineCuisineAddressSubComponent';
import CustomModalComponent from '../../components/general/modals/CustomModalComponent';
import CreateStoreProductScreen from '../storeProduct/create/CreateStoreProductScreen';
import CalendarScreen from '../calendar/CalendarScreen';
import UserAccountScreen from '../account/userAccount/UserAccountScreen';
import WeeklyWorkingHoursScreen from '../account/storeAccount/weeklyWorkingHours/WeeklyWorkingHoursScreen';
import StoreAccountScreen from '../account/storeAccount/StoreAccountScreen';
import CurrentWeekWorkingHoursScreen from '../account/storeAccount/currentWeekWorkingHours/CurrentWeekWorkingHoursScreen';
import BasketScreen from '../basket/BasketScreen';
import UserPastOrdersScreen from '../account/userAccount/UserPastOrdersListScreen';
import StoryRecorderScreen from '../story/storyRecorder/StoryRecorderScreen';
import StoryPlayerScreen from '../story/storyPlayer/StoryPlayerScreen';
import UserTrackOrderScreen from '../trackOrder/user/UserTrackOrderScreen';
import StoreTrackOrderScreen from '../trackOrder/store/StoreTrackOrderScreen';
import BrowseScreen from '../browse/BrowseScreen';
import UserPastOrdersListScreen from '../account/userAccount/UserPastOrdersListScreen';
import UserPastOrderDetailsScreen from '../account/userAccount/UserPastOrderDetailsScreen';
import WalletScreen from '../account/storeAccount/WalletScreen';
import TransactionsScreen from '../account/storeAccount/TransactionsScreen';
import FavouriteStoresScreen from '../account/userAccount/FavouriteStoresScreen';
import StoreReviewsScreen from '../store/StoreReviewsScreen';
import StoreProductsAndCategoriesScreen from '../account/storeAccount/StoreProductsAndCategoriesScreen';
import StorePastOrdersListScreen from '../account/storeAccount/StorePastOrdersListScreen';
import DeclinedOrderScreen from '../trackOrder/store/DeclinedOrderScreen';
import StoreNotificationsScreen from '../account/storeAccount/StoreNotificationsScreen';
import StoreOrderDetailsScreen from '../account/storeAccount/StoreOrderDetailsScreen';
import UserAccountSettingsScreen from '../account/userAccount/UserAccountSettingsScreen';
import UserAccountSettingsScreen2 from '../account/userAccount/UserAccountSettingsScreen2';
import UserAddressesScreen from '../account/userAccount/address/UserAddressesScreen';
import UserAddReviewScreen from '../trackOrder/UserAddReviewScreen';
import BrowseMapScreen from '../browse/BrowseMapScreen';
import NewUserAddressScreen from '../account/userAccount/address/NewUserAddressScreen';
import ErrorTest from '../error/ErrorTest';
import StoreScreenMainComponent from '../../components/myTestComp/StoreScreenMainComponent';
import StoreScreenV2 from '../store/StoreScreenV2';
import CreateStoreAccountSettingsScreen from '../account/storeAccount/CreateStoreAccountSettingsScreen';
import NewStoreAccountScreen from '../account/storeAccount/NewStoreAccountScreen';

const Start = memo(() => {
  const isKeyboardVisible = useRef(false);

  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [screenwidth, setScreenwidth] = useState(
    Dimensions.get('window').width,
  );
  const [applicationMounted, setApplicationMounted] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const targetEnv = Platform.OS;
  const OS =
    targetEnv === 'android'
      ? OSType.ANDROID
      : targetEnv === 'ios'
      ? OSType.IOS
      : OSType.OTHER;

  const dimensionCalculator = (height?: number, width?: number) => {
    height = height ? height : screenHeight;
    width = width ? width : screenwidth;

    const statusbarHeight =
      OS === OSType.ANDROID
        ? StatusBar.currentHeight!
        : OS === OSType.IOS
        ? insets.top
        : insets.top;
    insets.bottom = OS === OSType.IOS ? insets.bottom : 0;
    const bottomApplicationBarHeight = 50;
    const topApplicationBarHeight = 40;
    const topApplicationBarAbsoluteHeight = 50;
    const dimensions: AppScreenDimensions = {
      statusbarHeight: statusbarHeight,
      bottomBarHeight: OS === OSType.ANDROID ? 0 : insets.bottom,
      width: width,
      height: height,
      safeAreaHeight:
        height -
        (OS === OSType.ANDROID
          ? StatusBar.currentHeight!
          : OS === OSType.IOS
          ? insets.top
          : insets.top) -
        (OS === OSType.ANDROID ? 0 : insets.bottom),
      bottomApplicationBarHeight: bottomApplicationBarHeight,
      //middleApplicationBodyHeight:670,
      middleApplicationBodyHeight:
        height -
        1 * statusbarHeight -
        (OS === OSType.ANDROID ? 0 : insets.bottom / 2) -
        bottomApplicationBarHeight -
        topApplicationBarHeight,
      topApplicationBarHeight: topApplicationBarHeight,
      topApplicationBarAbsoluteHeight: topApplicationBarAbsoluteHeight,
    };
    return dimensions;
  };

  const dimensionState = dimensionCalculator();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      isKeyboardVisible.current = true;
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      isKeyboardVisible.current = false;
    });
    reduxstore.dispatch(settargetEnvironmentOSType(OS));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    //Text Inputlar İçin Ekrana Keyboard Geldiğinde De Burası Tetikleniyordu O Yüzden Alttaki Satır Eklendi.
    if (isKeyboardVisible.current) {
      return;
    }
    const {height, width} = {...event.nativeEvent.layout};
    console.log(height, 'height', height);
    if (height !== screenHeight) {
      setScreenHeight(height);
    } else if (width !== screenwidth) {
      setScreenwidth(width);
    }
    reduxstore.dispatch(
      settargetEnvironmentAppScreenDimensions({
        ...dimensionCalculator(height, width),
      }),
    );
    setApplicationMounted(true);
  };
  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
      }}>
      {applicationMounted && (
        <NativeRouter initialEntries={['/WelcomeScreen']}>
          <CustomModalComponent />
          <CustomStatusBar />
          <TopApplicationBar
            width={dimensionState.width}
            topApplicationBarHeight={
              dimensionState.topApplicationBarHeight * 1.01
            }
            statusbarHeight={dimensionState.statusbarHeight}
          />
          <View
            style={{
              flex: 1,
              ...setAllHeights(dimensionState.middleApplicationBodyHeight),
              marginTop: dimensionState.topApplicationBarHeight,
            }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="ParentLoginScreen" element={<ParentLoginScreen />} />
              <Route path="Test" element={<TestScreen />} />
              <Route path="Error" element={<ErrorScreen />} />
              <Route path="FileUpload" element={<FileUploadScreen />} />
              <Route path="Map" element={<MapScreen />} />
              <Route path="Dev" element={<DevScreen />} />
              <Route path="MainScreen" element={<MainScreen />} />
              <Route path="StoreScreen/:storeId" element={<StoreScreen />} />
              <Route
                path="StoryPlayerScreen/:storeId"
                element={<StoryPlayerScreen />}
              />
              <Route
                path="UserPastOrderDetailsScreen/:orderId"
                element={<UserPastOrderDetailsScreen />}
              />
              <Route
                path="StoreOrderDetailsScreen/:orderId"
                element={<StoreOrderDetailsScreen />}
              />

              <Route path="SwitchButton1" element={<SwitchButton1 />} />
              <Route path="WelcomeScreen" element={<WelcomeScreen />} />
              <Route path="AccountScreen" element={<AccountScreen />} />
              <Route path="WebViewScreen" element={<WebViewScreen />} />
              <Route path="LinkingTest" element={<LinkingTest />} />
              <Route
                path="OrderDetailsScreen"
                element={<OrderDetailsScreen />}
              />
              <Route path="FilterScreen" element={<FilterScreen />} />
              <Route
                path="CreateStoreProductScreen"
                element={<CreateStoreProductScreen />}
              />

              <Route
                path="NewStoreAccountScreen"
                element={<NewStoreAccountScreen />}
              />

              <Route
                path="CreateStoreAccountSettingsScreen"
                element={<CreateStoreAccountSettingsScreen />}
              />

              <Route
                path="StoreAccountScreen"
                element={<StoreAccountScreen />}
              />
              <Route
                path="ReactNativeMapScreen"
                element={<ReactNativeMapScreen />}
              />
              <Route
                path="CreateCuisineCuisineAddressSubComponent"
                element={<CreateCuisineCuisineAddressSubComponent />}
              />
              <Route path="CalendarScreen" element={<CalendarScreen />} />
              <Route path="UserAccountScreen" element={<UserAccountScreen />} />
              <Route
                path="WeeklyWorkingHoursScreen"
                element={<WeeklyWorkingHoursScreen />}
              />
              <Route
                path="CurrentWeekWorkingHoursScreen"
                element={<CurrentWeekWorkingHoursScreen />}
              />
              <Route path="BasketScreen" element={<BasketScreen />} />
              <Route
                path="UserTrackOrderScreen"
                element={<UserTrackOrderScreen />}
              />
              <Route
                path="StoreTrackOrderScreen"
                element={<StoreTrackOrderScreen />}
              />
              <Route
                path="UserPastOrdersScreen"
                element={<UserPastOrdersScreen />}
              />
              <Route
                path="StoryRecorderScreen"
                element={<StoryRecorderScreen />}
              />
              <Route path="BrowseScreen" element={<BrowseScreen />} />
              <Route
                path="UserAddReviewScreen/:orderId"
                element={<UserAddReviewScreen />}
              />
              <Route
                path="UserPastOrdersListScreen"
                element={<UserPastOrdersListScreen />}
              />
              <Route
                path="StorePastOrdersListScreen"
                element={<StorePastOrdersListScreen />}
              />
              <Route
                path="UserPastOrderDetailsScreen"
                element={<UserPastOrderDetailsScreen />}
              />
              <Route path="WalletScreen" element={<WalletScreen />} />
              <Route path="ErrorGeneratorScreen" element={<ErrorTest />} />
              <Route
                path="TransactionsScreen"
                element={<TransactionsScreen />}
              />
              <Route
                path="FavouriteStoresScreen"
                element={<FavouriteStoresScreen />}
              />
              <Route
                path="StoreReviewsScreen"
                element={<StoreReviewsScreen />}
              />
              <Route
                path="StoreProductsAndCategoriesScreen"
                element={<StoreProductsAndCategoriesScreen />}
              />
              <Route
                path="DeclinedOrderScreen"
                element={<DeclinedOrderScreen />}
              />
              <Route
                path="StoreNotificationsScreen"
                element={<StoreNotificationsScreen />}
              />
              <Route path="BrowseMapScreen" element={<BrowseMapScreen />} />
              <Route
                path="UserAccountSettingsScreen"
                element={<UserAccountSettingsScreen />}
              />
              <Route
                path="UserAccountSettingsScreen2"
                element={<UserAccountSettingsScreen2 />}
              />
              <Route
                path="UserAddressesScreen"
                element={<UserAddressesScreen />}
              />
              <Route
                path="NewUserAddressScreen"
                element={<NewUserAddressScreen />}
              />
              <Route
                path="StoreScreenMainComponent/:storeId"
                element={<StoreScreenMainComponent />}
              />
              <Route
                path="StoreScreenV2/:storeId"
                element={<StoreScreenV2 />}
              />
            </Routes>
          </View>
          <BottomApplicationBar
            width={dimensionState.width}
            height={dimensionState.bottomApplicationBarHeight}
          />
        </NativeRouter>
      )}
    </View>
  );
});

export default Start;
