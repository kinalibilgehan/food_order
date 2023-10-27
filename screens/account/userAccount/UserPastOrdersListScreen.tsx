import {ScrollView} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import UserPastOrderListComponent from '../../../components/account/userAccount/UserPastOrderListComponent';
import {useNavigate} from 'react-router-native';
import agent from '../../../api/agent';
import {OrderDto} from '../../../dtos/order/subClasses/orderDto';
import {StoreOperationsResponseDto} from '../../../dtos/store/response/storeOperationsResponseDto';
import {OrderOperationsResponseDto} from '../../../dtos/order/response/orderOperationsResponseDto';
import {Globals} from '../../../globals';

export const handleGetStoreById = async (storeId: string) => {
  const store = await agent.Store.getStoreById(storeId);
  return store;
};

const UserPastOrdersListScreen = () => {
  /* STATE VARIABLES - APP SETTINGS */
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const [pastOrders, setPastOrders] =
    useState<OrderOperationsResponseDto | null>();
  const [storeIds, setStoreIds] = useState<string[]>([]);
  const [stores, setStores] = useState<StoreOperationsResponseDto[]>([]);
  const navigate = useNavigate();
  const avatarImgUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';

  /* METHODS */

  const handleGetOrders = async () => {
    const orders = await agent.Order.GetShoppersActiveOrders();
    let orderedStoreIds: string[] = [];
    setPastOrders(orders);
    // console.log(pastOrders);
    if (orders.orders) {
      orders.orders.forEach(element => {
        const storeId = element.basket.basketProperties.storeId;
        orderedStoreIds.push(storeId!);
      });
    }
    setStoreIds(orderedStoreIds);
  };
  const handleStores = async (storeIds: string[]) => {
    const storePromises = storeIds.map(storeId => handleGetStoreById(storeId));
    const stores = await Promise.all(storePromises);
    setStores(stores);
  };

  /* HOOKS */
  useEffect(() => {
    handleGetOrders();
  }, []);

  useMemo(() => {
    handleStores(storeIds!);
  }, [storeIds]);

  return (
    <ScrollView
      style={{
        backgroundColor: themeSettings?.mainBackgroundColor,
        marginTop: themeSettings?.marginVerticalLarge,
      }}>
      {pastOrders?.orders &&
        pastOrders?.orders.map((item: OrderDto, index) => {
          return (
            <UserPastOrderListComponent
              order={item}
              key={index}
              storeName={
                item.basket.basketProperties.storeName.length > 20
                  ? item.basket.basketProperties.storeName.substring(0, 20) +
                    '...'
                  : item.basket.basketProperties.storeName
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
                Globals.url.STOREIMAGEPATH +
                  stores?.[index]?.storeDtos?.[0]?.headerImageUrl ??
                avatarImgUrl
              }
            />
          );
        })}
    </ScrollView>
  );
};

export default UserPastOrdersListScreen;
