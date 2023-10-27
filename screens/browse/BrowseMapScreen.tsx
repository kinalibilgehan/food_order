import {View, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import MapView, {
  Region,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {reduxstore} from '../../reduxstore/reduxstore';
import {OSType} from '../start/targetEnvironmentSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../components/general/text/CustomTextInput';
import {Store, StorePaginationParams} from '../mainScreen/IMainScreen';
import agent from '../../api/agent';
import MapViewRestaurantComponent from './MapViewRestaurantComponent';
import {setMainScreenSelectedStoreState} from '../mainScreen/mainScreenSlice';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BrowseStoreComponent from '../../components/browse/BrowseStoreComponent';
import CustomText from '../../components/general/text/CustomText';

const BrowseMapScreen = () => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const [searchText, setSearchText] = useState<string>();
  const [searchedStores, setSearchedStores] = useState<Store[]>();

  const handleSearch = () => {
    let searchFitStores: Store[] = [];
    stores.forEach(store => {
      if (searchText) {
        if (store.name.includes(searchText)) {
          searchFitStores.push(store);
        }
      }
    });
    setSearchedStores(searchFitStores);
  };

  // GET STORES
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store>();
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
    let uriExtension = `?X=${params.x}&Y=${params.y}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`;
    let nearByStores: Store[] = [];
    try {
      const response = await agent.Store.getNearByStores(uriExtension);
      response.stores.forEach(store => {
        if (store.distance <= 30) {
          nearByStores.push(store);
        }
      });
      setStores(nearByStores);
    } catch (error) {
      console.log(error);
    }
  };

  // MAP STUFF
  const [region, setRegion] = useState<Region>({
    latitude: 26,
    longitude: 32,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerLocation, setMarkerLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    Geolocation.requestAuthorization(() => {});
    if (Platform.OS === OSType.ANDROID) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])
        .then(() => {})
        .catch(() => {});
    }
    Geolocation.getCurrentPosition((info: GeolocationResponse) => {
      let currentLocation: LatLng = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      };
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setMarkerLocation(currentLocation);
    });
    return () => {};
  }, []);
  return (
    <View>
      {selectedStore ? (
        <View
          style={{
            width: width,
            height: height * 0.24,
            position: 'absolute',
            backgroundColor: themeSettings?.cardBackgroundColor,
            bottom: 0,
            zIndex: 99,
          }}>
          <MapViewRestaurantComponent
            storeName={selectedStore.name}
            storeBio={selectedStore.bio1}
            headerImageUrl={selectedStore.headerImageUrl!}
            distance={selectedStore.distance}
            averageScore={
              selectedStore.storeScore?.avarageScore
                ? selectedStore.storeScore?.avarageScore
                : 0
            }
            store={selectedStore}
          />
        </View>
      ) : null}

      {searchedStores?.length! > 0 ? (
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 9999,
            width: width,
            height: height * 0.24,
            backgroundColor: '#C9E8C3',
          }}>
          {searchedStores!.map(store => {
            return (
              <BrowseStoreComponent
                key={store.id}
                storeScore={
                  store.storeScore?.avarageScore
                    ? store.storeScore?.avarageScore
                    : 0
                }
                storeDistance={store.distance}
                storeMinDelivery={100}
                storeName={store.name}
              />
            );
          })}
        </ScrollView>
      ) : null}

      {searchedStores && searchedStores.length === 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 9999,
            width: width,
            height: height * 0.24,
            backgroundColor: '#C9E8C3',
          }}>
          <CustomText>Aramanıza uygun sonuç bulamadık</CustomText>
        </View>
      ) : null}

      {/* SEARCH BAR */}
      <View
        style={{
          position: 'absolute',
          zIndex: 998,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginTop: themeSettings?.marginVerticalMedium,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalMedium,
            width: width * 0.85,
            height: height * 0.05,
            backgroundColor: themeSettings?.cardBackgroundColor,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleSearch();
            }}>
            <Icon
              name={'search-outline'}
              color={'black'}
              size={height * 0.03}
              style={{marginLeft: themeSettings?.marginHorizontalLarge}}
            />
          </TouchableOpacity>
          <CustomTextInput
            onChangeText={e => {
              setSearchText(e);
            }}
            placeholder="Ara..."
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
              overflow: 'hidden',
              backgroundColor: 'red',
            }}
          />
        </View>
        <Icon
          name={'options-outline'}
          color={'black'}
          size={height * 0.03}
          style={{marginLeft: themeSettings?.marginHorizontalLarge}}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={region}
        showsCompass={false}
        toolbarEnabled={false}
        zoomControlEnabled={true}
        style={{
          width: width,
          height: height,
          alignSelf: 'center',
        }}
        onPress={() => {
          setSelectedStore(undefined);
          setTimeout(() => {
            console.log(selectedStore?.name);
          }, 1000);
        }}>
        {
          <>
            {stores ? (
              stores.map((item: Store) => {
                return (
                  <Marker
                    onPress={() => {
                      setSelectedStore(item);
                      reduxstore.dispatch(
                        setMainScreenSelectedStoreState(item),
                      );
                      setTimeout(() => {
                        console.log(selectedStore?.name);
                      }, 1000);
                    }}
                    key={item.id}
                    coordinate={{
                      latitude: item.coordinate!.y!,
                      longitude: item.coordinate!.x!,
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
            <Marker
              onPress={() =>
                reduxstore.dispatch(
                  setMainScreenSelectedStoreState(selectedStore!),
                )
              }
              coordinate={markerLocation}
              style={{
                zIndex: 999,
              }}
            />
          </>
        }
      </MapView>
    </View>
  );
};

export default BrowseMapScreen;
