import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import agent from '../../../api/agent';
import {Store, StorePaginationParams} from '../../mainScreen/IMainScreen';
import RestaurantListComponent from '../../../components/mainScreen/RestaurantListComponent';

const FavouriteStoresScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  useEffect(() => {
    const request: StorePaginationParams = {
      pageNumber: 1,
      pageSize: 50,
      x: 28.7688434,
      y: 36.8312021,
    };
    getNearByStores(request);
    return () => {};
  }, []);

  const getNearByStores = async (params: StorePaginationParams) => {
    var uriExtension = `?X=${params.x}&Y=${params.y}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`;
    try {
      const response = await agent.Store.getNearByStores(uriExtension);
      setStores(response.stores);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
      {stores ? (
        stores.map((item: Store, index) => {
          return <RestaurantListComponent store={item} key={index} />;
        })
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default FavouriteStoresScreen;
