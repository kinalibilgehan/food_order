import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {OSType} from '../start/targetEnvironmentSlice';
import CustomText from '../../components/general/text/CustomText';
import CustomTextInput from '../../components/general/text/CustomTextInput';
import {ScrollView} from 'react-native-gesture-handler';
import ItemCategoryComponent from '../../components/browse/ItemCategoryComponent';
import BrowseHistoryItemComponent from '../../components/browse/BrowseHistoryItemComponent';
import {useNavigate} from 'react-router-native';

const BrowseScreen = () => {
  // APP SETTINGS
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
    <View>
      {/* MAP*/}
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
          zoomControlEnabled
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

      {/* MOTTO */}
      <View
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
        }}>
        <CustomText
          style={{
            fontSize: themeSettings?.headerFontSize,
          }}>
          Bugün canın ne yemek istiyor?
        </CustomText>
      </View>

      {/* SEARCH BAR */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
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
          <Icon
            name={'search-outline'}
            color={'black'}
            size={height * 0.03}
            style={{marginLeft: themeSettings?.marginHorizontalLarge}}
          />
          <CustomTextInput
            placeholder="Ara..."
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
              overflow: 'hidden',
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigate('/FilterScreen')}>
          <Icon
            name={'options-outline'}
            color={'black'}
            size={height * 0.03}
            style={{marginLeft: themeSettings?.marginHorizontalLarge}}
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH CATEGORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
        }}>
        <ItemCategoryComponent
          categoryName={'Pizza'}
          iconName={'pizza-outline'}
        />
        <ItemCategoryComponent
          categoryName={'Hamburger'}
          iconName={'fast-food-outline'}
        />
        <ItemCategoryComponent
          categoryName={'Beer'}
          iconName={'beer-outline'}
        />
        <ItemCategoryComponent
          categoryName={'Pizza'}
          iconName={'pizza-outline'}
        />
        <ItemCategoryComponent
          categoryName={'Hamburger'}
          iconName={'fast-food-outline'}
        />
        <ItemCategoryComponent
          categoryName={'Beer'}
          iconName={'beer-outline'}
        />
      </ScrollView>

      {/* SEARCH HISTORY */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
        }}>
        <CustomText
          style={{
            fontSize: themeSettings?.subHeaderFontSize,
          }}>
          Son Aramalar
        </CustomText>
        <CustomText
          style={{
            fontSize: themeSettings?.subBodyFontSize,
          }}>
          Temizle
        </CustomText>
      </View>

      <BrowseHistoryItemComponent searchText={'Makarna'} />
      <BrowseHistoryItemComponent searchText={'Taze fasülye'} />
      <BrowseHistoryItemComponent searchText={'Yoğurtlama'} />
      <BrowseHistoryItemComponent searchText={'Alinazik'} />
      <BrowseHistoryItemComponent searchText={'Kuru fasülye'} />
    </View>
  );
};

export default BrowseScreen;
