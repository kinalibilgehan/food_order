import {View} from 'react-native';
import React, {useEffect} from 'react';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import {setAllWidths} from '../../../components/store/headers/StoreScreenStickyHeaderComponent';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import agent from '../../../api/agent';
import {setStoreAccountState} from './storeAccountSlice';
import StoreAccountNameAndAvatarComponent from '../../../components/account/storeAccount/storeAccountScreenComponents/StoreAccountNameAndAvatarComponent';
import UserAccountNavigationButtonComponent from '../../../components/account/userAccount/UserAccountNavigationButtonComponent';
import {useNavigate} from 'react-router-native';

const handleGetStoresActiveOrders = async () => {
  const orders = await agent.Order.GetStoresActiveOrders();
  console.log(orders);
  return orders;
};

const StoreAccountScreen = () => {
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const state = useAppSelector(data => data.storeAccount);
  const navigate = useNavigate();
  useEffect(() => {
    agent.Store.getStoreProperties(
      reduxstore.getState().userAccount.user?.ownedStoreId!,
    )
      .then((response: any) => {
        let helperState = {...state};
        helperState.generalWeeklyWorkingHours =
          response.generalWeeklyWorkingHours;
        helperState.storeAisles = response.storeAisles;
        helperState.storeAvatarImageUrl = response.avatarImageUrl;
        helperState.storeCampaigns = response.storeCampaigns;
        helperState.storeHeaderImageUrl = response.headerImageUrl;
        helperState.storeName = response.name;
        helperState.storeProducts = response.storeProducts;
        helperState.takenOrders = response.takenOrders;
        reduxstore.dispatch(setStoreAccountState(helperState));
      })
      .catch((error: any) => {
        console.log(error);
      });

    return () => {
      //reduxstore.dispatch(setStoreAccountInitialState(true));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerScrollView contentContainerStyle={{...setAllWidths(width)}}>
      <View
        style={{
          backgroundColor: themeSettings?.mainBackgroundColor,
        }}>
        <View
          style={{
            ...setAllWidths(width * 0.95),
            marginLeft: width * 0.025,
            marginRight: width * 0.025,
            flex: 1,
          }}>
          <StoreAccountNameAndAvatarComponent />

          <UserAccountNavigationButtonComponent
            text="Bildirimler"
            iconName="bell"
            onPress={() => {
              navigate('/StoreNotificationsScreen');
            }}
          />

          <UserAccountNavigationButtonComponent
            text="Mutfak Ayarları"
            iconName="shopping-basket"
            onPress={() => {
              navigate('/CreateStoreAccountScreen');
              navigate('/WeeklyWorkingHoursScreen');
            }}
          />
          <UserAccountNavigationButtonComponent
            text="Siparişler"
            iconName="cutlery"
            onPress={() => {
              navigate('/StorePastOrdersListScreen');
            }}
          />
          <UserAccountNavigationButtonComponent
            text="Ürün ve Kategoriler"
            iconName="cubes"
            onPress={() => {
              navigate('/StoreProductsAndCategoriesScreen');
            }}
          />
          <UserAccountNavigationButtonComponent
            text="Ürün ekle"
            iconName="plus"
            onPress={() => {
              navigate('/CreateStoreProductScreen');
            }}
          />
          <UserAccountNavigationButtonComponent
            text="Cüzdan"
            iconName="credit-card-alt"
            // onPress={() => {
            //   navigate('/CreateStoreProductScreen');
            // }}
          />
          <UserAccountNavigationButtonComponent
            text="Kampanya Uygula"
            iconName="cart-arrow-down"
            onPress={() => {
              navigate('/CurrentWeekWorkingHoursScreen');
            }}
          />
          <UserAccountNavigationButtonComponent
            text="Yardım"
            iconName="info-circle"
            onPress={() => {
              navigate('/CreateStoreProductScreen');
            }}
          />
          <UserAccountNavigationButtonComponent text="Ayarlar" iconName="cog" />
          {/* <UserAccountNavigationButtonComponent
          text="Zaman Çizelgesi (Genel)"
          iconName="calendar"
          onPress={() => {
            navigate('/WeeklyWorkingHoursScreen');
          }}
        />
        <UserAccountNavigationButtonComponent
          text="Zaman Çizelgesi (Bu Haftanın)"
          iconName="calendar-plus-o"
          onPress={() => {
            navigate('/CurrentWeekWorkingHoursScreen');
          }}
        />

        <UserAccountNavigationButtonComponent
          text="Zaman Çizelgesi (Bu Haftanın)"
          iconName="user-chef"
          onPress={() => {
            navigate('/CurrentWeekWorkingHoursScreen');
          }}
        />

        <UserAccountNavigationButtonComponent
          text="Ürün Ekle"
          iconName="plus"
          onPress={() => {
            navigate('/CreateStoreProductScreen');
          }}
        /> */}
        </View>
      </View>
    </GestureHandlerScrollView>
  );
};

export default StoreAccountScreen;
