import {PermissionsAndroid, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reduxstore} from '../../../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../../components/general/text/CustomText';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {OSType} from '../../../start/targetEnvironmentSlice';
import {useNavigate} from 'react-router-native';

const UserAddressesScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const navigate = useNavigate();

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
    <ScrollView
      style={{
        height: height,
        backgroundColor: themeSettings?.mainBackgroundColor,
      }}>
      {/* MAP*/}
      {/* MapView ekranı yapılacak */}
      <View
        style={{
          marginBottom: themeSettings?.marginHorizontalLarge,
        }}>
        <TouchableOpacity
          onPress={() => navigate('/BrowseMapScreen')}
          style={{
            marginLeft: themeSettings?.marginHorizontalMedium,
            position: 'absolute',
            top: height * 0.1,
            right: themeSettings?.marginHorizontalLarge,
            zIndex: 999,
          }}>
          <Icon
            name={'chevron-forward-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.05}
          />
        </TouchableOpacity>
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled={false}
          region={region}
          style={{
            width: width,
            height: height * 0.3,
            alignSelf: 'center',
          }}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
          }}>
          {
            <>
              <Marker coordinate={markerLocation} />
            </>
          }
        </MapView>
      </View>

      {/* DIVIDER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginBottom: themeSettings?.marginHorizontalLarge,
            width: width * 0.2,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: themeSettings?.secondColor,
          }}
        />
      </View>

      {/* Current Address */}
      {/* <TouchableOpacity
        onPress={() => {
          reduxstore.dispatch(
            setNewUserAddressSelectionState(newAddressEnum.CurrentLocation),
          );
          navigate('/NewUserAddressScreen');
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'navigate'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
              fontSize: themeSettings?.bodyFontSize,
            }}>
            Şu Anki Konum
          </CustomText>
        </View>
      </TouchableOpacity> */}

      {/* New Address Bar */}
      <TouchableOpacity
        onPress={() => {
          navigate('/NewUserAddressScreen');
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: themeSettings?.marginVerticalLarge,
            backgroundColor: themeSettings?.cardBackgroundColor,
            borderRadius: 10,
            height: height * 0.075,
            width: width * 0.95,
          }}>
          <Icon
            name={'map'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
              fontSize: themeSettings?.bodyFontSize,
            }}>
            Yeni Adres
          </CustomText>
        </View>
      </TouchableOpacity>

      {/* <CustomText
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
          fontSize: themeSettings?.subHeaderFontSize,
        }}>
        Yakınımda
      </CustomText> */}

      <CustomText
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
          fontSize: themeSettings?.subHeaderFontSize,
        }}>
        Kayıtlı Konumlar
      </CustomText>

      {/* USER ADDRESSES */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
          backgroundColor: themeSettings?.cardBackgroundColor,
          height: height * 0.075,
          borderRadius: 10,
        }}>
        <Icon
          name={'locate'}
          color={themeSettings?.secondColor}
          size={height * 0.03}
          style={{
            marginLeft: themeSettings?.marginHorizontalLarge,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: themeSettings?.marginHorizontalLarge,
          }}>
          <CustomText
            style={{
              fontSize: themeSettings?.bodyFontSize,
              marginBottom: themeSettings?.marginVerticalSmall,
            }}>
            Adres Başlığı: Ev
          </CustomText>
          <CustomText
            style={{
              fontSize: themeSettings?.subBodyFontSize,
            }}>
            Tunaboyu sokak şimşek apartmanı no: 6/1
          </CustomText>
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginBottom: height * 0.0125,
          backgroundColor: 'rgba(255, 255, 254, 0.2)',
          height: height * 0.1,
          borderRadius: 10,
        }}>
        <Icon
          name={'locate'}
          color={'#004643'}
          size={height * 0.03}
          style={{
            marginLeft: width * 0.025,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: width * 0.025,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.02,
              marginBottom: height * 0.00625,
            }}>
            Adres Başlığı: Ev
          </CustomText>
          <CustomText>Tunaboyu sokak şimşek apartmanı no: 6/1</CustomText>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default UserAddressesScreen;
