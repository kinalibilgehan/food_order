import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useNavigate} from 'react-router-native';
import agent from '../../../api/agent';
import {OrderDto} from '../../../dtos/order/subClasses/orderDto';
import {OrderOperationsResponseDto} from '../../../dtos/order/response/orderOperationsResponseDto';
import {Globals} from '../../../globals';
import StorePastOrderListComponent from '../../../components/account/storeAccount/StoreOrderListComponent';

export const handleGetStoreById = async (storeId: string) => {
  const store = await agent.Store.getStoreById(storeId);
  return store;
};

const StorePastOrdersListScreen = () => {
  /* STATE VARIABLES - APP SETTINGS */
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const [pastOrders, setPastOrders] =
    useState<OrderOperationsResponseDto | null>();
  const navigate = useNavigate();

  const storeAvatarImgUrl =
    reduxstore.getState().storeAccount.storeAvatarImageUrl;
  const avatarImgUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';

  /* METHODS */

  const handleGetStoresPastOrders = async () => {
    const orders = await agent.Order.GetStoresActiveOrders();
    setPastOrders(orders);
    console.log(orders);
  };

  /* HOOKS */
  useEffect(() => {
    handleGetStoresPastOrders();
  }, []);

  // useMemo(() => {
  //   handleStores(storeIds!);
  // }, [storeIds]);

  return (
    <ScrollView style={{backgroundColor: themeSettings?.mainBackgroundColor}}>
      {/* PAGE CONTAINER */}
      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
        }}>
        {pastOrders?.orders &&
          pastOrders?.orders.map((item: OrderDto, index) => {
            return (
              <StorePastOrderListComponent
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
                  pastOrders.orders[index].orderState?.effectiveDate!.substring(
                    0,
                    10,
                  )!
                }
                thumbnailUrl={
                  Globals.url.STOREIMAGEPATH + storeAvatarImgUrl ?? avatarImgUrl
                }
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default StorePastOrdersListScreen;
