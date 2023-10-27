import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useNavigate} from 'react-router-native';
import agent from '../../../api/agent';
import {OrderOperationsResponseDto} from '../../../dtos/order/response/orderOperationsResponseDto';
import {ScrollView} from 'react-native-gesture-handler';
import {OrderDto} from '../../../dtos/order/subClasses/orderDto';
import {Globals} from '../../../globals';
import StoreOrderListComponent from '../../../components/account/storeAccount/StoreOrderListComponent';
import CustomText from '../../../components/general/text/CustomText';
import StoreOrderReviewComponent from '../../../components/account/storeAccount/StoreOrderReviewComponent';

const StoreNotificationsScreen = () => {
  /* APP SETTINGS */
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const navigate = useNavigate();
  /* ########## */

  // STATE VARIABLES
  const [activeOrders, setActiveOrders] =
    useState<OrderOperationsResponseDto | null>();
  const storeAvatarImgUrl =
    reduxstore.getState().storeAccount.storeAvatarImageUrl;
  const avatarImgUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';

  // METHODS
  const handleGetStoresActiveOrders = async () => {
    const orders = await agent.Order.GetStoresActiveOrders();
    setActiveOrders(orders);
    console.log(orders);
  };

  /* HOOKS */
  useEffect(() => {
    handleGetStoresActiveOrders();
  }, []);

  return (
    <ScrollView>
      {/* PAGE CONTAINER */}
      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
        }}>
        {activeOrders?.orders && (
          <CustomText
            style={{
              marginTop: height * 0.0125,
              marginBottom: height * 0.0125,
              fontSize: height * 0.03,
              fontWeight: '700',
            }}>
            Onay Bekleyen Siparişler
          </CustomText>
        )}

        {activeOrders?.orders &&
          activeOrders?.orders.map((item: OrderDto, index) => {
            return (
              <StoreOrderListComponent
                order={item}
                key={index}
                storeName={
                  item.basket.basketProperties.shopperId.length > 20
                    ? item.basket.basketProperties.shopperId.substring(0, 20) +
                      '...'
                    : item.basket.basketProperties.shopperId
                }
                itemCount={item.basket.basketProperties.totalItemCount.toString()}
                totalPrice={item.basket.basketProperties.totalPrice.toString()}
                orderDate={
                  activeOrders.orders[
                    index
                  ].orderState?.effectiveDate!.substring(0, 10)!
                }
                thumbnailUrl={
                  Globals.url.STOREIMAGEPATH + storeAvatarImgUrl ?? avatarImgUrl
                }
              />
            );
          })}
        <StoreOrderReviewComponent />

        <View />
      </View>
    </ScrollView>
  );
};

export default StoreNotificationsScreen;
