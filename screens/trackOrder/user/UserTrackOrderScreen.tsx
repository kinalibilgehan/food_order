import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../components/general/text/CustomText';
import {ScrollView} from 'react-native-gesture-handler';
import {reduxstore} from '../../../reduxstore/reduxstore';

import BasketItemOrderDetailComponent from '../../../components/basket/BasketItemOrderDetailComponent';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import {OrderStateEnum, setOrderState} from '../orderSlice';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerDragStartEndEvent,
  LatLng,
  Region,
} from 'react-native-maps';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {OSType} from '../../start/targetEnvironmentSlice';
import {BasketItemDto} from '../../../dtos/order/subClasses/basketItemDto';

export interface IOrderProps {
  order: OrderStateEnum;
}

const UserTrackOrderScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const basketItemsState = reduxstore.getState().basketState.basket.basketItems;
  const basketPropertiesState = useAppSelector(
    data => data.basketState.basket.basketProperties,
  );
  const orderState = useAppSelector(data => data.orderState.orderState);

  const changeOrderState = (newOrderState: OrderStateEnum) => {
    reduxstore.dispatch(setOrderState({orderState: newOrderState}));
  };

  const [markerLocation, setMarkerLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [region, setRegion] = useState<Region>({
    latitude: 26,
    longitude: 32,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    <ScrollView>
      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
        }}>
        {orderState === OrderStateEnum.Forwarded && (
          <CustomText
            style={{
              fontSize: (height * 0.7) / 20,
              fontWeight: '700',
              marginBottom: height * 0.025,
            }}>
            Siparişiniz Esma'nın Mutfağı'na iletildi.
          </CustomText>
        )}

        {orderState === OrderStateEnum.Preparing && (
          <CustomText
            style={{
              fontSize: (height * 0.7) / 20,
              fontWeight: '700',
              marginBottom: height * 0.025,
            }}>
            Siparişiniz hazırlanıyor.
          </CustomText>
        )}

        {orderState === OrderStateEnum.OnWay && (
          <CustomText
            style={{
              fontSize: (height * 0.7) / 20,
              fontWeight: '700',
              marginBottom: height * 0.025,
            }}>
            Siparişiniz yola çıktı.
          </CustomText>
        )}

        {orderState === OrderStateEnum.Delivered && (
          <CustomText
            style={{
              fontSize: (height * 0.7) / 20,
              fontWeight: '700',
              marginBottom: height * 0.025,
            }}>
            Siparişiniz teslim edildi.
          </CustomText>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height * 0.0125,
          }}>
          <CustomText>Teslimat</CustomText>
          <CustomText>14 Mart Perşembe 10:15</CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height * 0.025,
          }}>
          <View
            style={{
              borderBottomColor: themeSettings?.secondColor,
              borderBottomWidth: 5,
              marginRight: width * 0.02,
              width: width * 0.15,
            }}
          />
          <View
            style={{
              borderBottomColor:
                orderState === OrderStateEnum.Preparing ||
                orderState === OrderStateEnum.OnWay ||
                orderState === OrderStateEnum.Delivered
                  ? themeSettings?.secondColor
                  : themeSettings?.thirdColor,
              borderBottomWidth: 5,
              marginRight: width * 0.02,
              width: width * 0.15,
            }}
          />
          <View
            style={{
              borderBottomColor:
                orderState === OrderStateEnum.OnWay ||
                orderState === OrderStateEnum.Delivered
                  ? themeSettings?.secondColor
                  : themeSettings?.thirdColor,
              borderBottomWidth: 5,
              marginRight: width * 0.02,
              width: width * 0.15,
            }}
          />
          <View
            style={{
              borderBottomColor:
                orderState === OrderStateEnum.Delivered
                  ? themeSettings?.secondColor
                  : themeSettings?.thirdColor,
              borderBottomWidth: 5,
              marginRight: width * 0.02,
              width: width * 0.15,
            }}
          />
          {/* <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 5,
              marginRight: width * 0.02,
              width: width * 0.15,
            }}
          /> */}
        </View>

        {orderState === OrderStateEnum.Forwarded && (
          <View
            style={{
              height: (height * 3) / 10,
              backgroundColor: themeSettings?.thirdColor,
              marginBottom: height * 0.0125,
            }}>
            <CustomText>Graphic1</CustomText>
          </View>
        )}

        {orderState === OrderStateEnum.Preparing && (
          <View
            style={{
              height: (height * 3) / 10,
              backgroundColor: themeSettings?.thirdColor,
              marginBottom: height * 0.0125,
            }}>
            <CustomText>Graphic2</CustomText>
          </View>
        )}

        {orderState === OrderStateEnum.Delivered && (
          <View
            style={{
              height: (height * 3) / 10,
              backgroundColor: themeSettings?.thirdColor,
              marginBottom: height * 0.0125,
            }}>
            <CustomText>Graphic3</CustomText>
          </View>
        )}

        {orderState === OrderStateEnum.OnWay && (
          <View
            style={{
              height: (height * 4) / 20,
              backgroundColor: 'red',
              marginBottom: height * 0.0125,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              zoomControlEnabled
              region={region}
              style={{
                width: width * 0.95,
                height: '100%',
              }}
              onPress={e => {
                console.log(e.nativeEvent.coordinate);
              }}>
              {
                <Marker
                  draggable
                  onDragEnd={(e: MarkerDragStartEndEvent) => {
                    setMarkerLocation(e.nativeEvent.coordinate);
                  }}
                  coordinate={markerLocation}
                />
              }
              {false && (
                <Text style={{position: 'absolute', top: 0}}>AHMET</Text>
              )}
            </MapView>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 5,
            width: width * 0.15,
            marginBottom: height * 0.0125,
          }}
        />
        <View>
          <CustomText
            style={{
              fontSize: (height * 0.55) / 20,
              fontWeight: '700',
            }}>
            Sipariş Detayları
          </CustomText>
        </View>
        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: themeSettings?.thirdColor,
            }}>
            Adres
          </CustomText>
          <CustomText>To the moon baby</CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: themeSettings?.thirdColor,
            }}>
            Teslimat Türü
          </CustomText>
          <CustomText>Gel Al</CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: themeSettings?.thirdColor,
            }}>
            Teslimat Notu
          </CustomText>
          <CustomText>Öğrenciyiz abla patatesi bol koyar mısın?</CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: themeSettings?.thirdColor,
            }}>
            Esma'nın Mutfağı Adres
          </CustomText>
          <CustomText
            style={{
              color: themeSettings?.secondColor,
            }}>
            Faturayı Gör
          </CustomText>
        </View>
        <View>
          {/* <CustomText>sol</CustomText> */}
          {basketItemsState.map((basketitem: BasketItemDto) => {
            // totalPrice state ile tutamıyorun, infinite loop hatası veriyor.
            return (
              // <BasketItemComponent
              //   key={basketitem.storeProductId}
              //   basketItem={basketitem}
              // />
              <BasketItemOrderDetailComponent
                key={basketitem.storeProductId}
                basketItem={basketitem}
              />
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height * 0.0125,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText style={{fontWeight: '700', marginRight: width * 0.01}}>
              Paket Tutarı
            </CustomText>
            <CustomText>(Kdv dahil)</CustomText>
          </View>
          <CustomText
            style={{
              fontWeight: '700',
            }}>
            {Math.round(basketPropertiesState.totalPrice * 100) / 100}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => changeOrderState(OrderStateEnum.Preparing)}>
            <CustomText>Hazırlanıyor</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeOrderState(OrderStateEnum.OnWay)}>
            <CustomText>Yola Çıktı</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeOrderState(OrderStateEnum.Delivered)}>
            <CustomText>Teslim Edildi</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserTrackOrderScreen;
