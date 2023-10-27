import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MapView, {LatLng, Marker, Region} from 'react-native-maps';
import {reduxstore} from '../../../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../../components/general/text/CustomTextInput';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {OSType} from '../../../start/targetEnvironmentSlice';
import CustomText from '../../../../components/general/text/CustomText';
import {useNavigate} from 'react-router-native';

const NewAUserAddressScreen = () => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const navigate = useNavigate();

  const [selectedCoordinate, setSelectedCoordinate] = useState<LatLng>();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressText, setAddressText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>();
  const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false);
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

  const handleMarkerPress = (coordinate: any) => {
    // Seçilen koordinatı ve adresi almak için bir fonksiyon çağırın
    setMarkerLocation(coordinate);
    setSelectedCoordinate(coordinate);
    getReverseGeocoding(coordinate);
  };

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

  const getReverseGeocoding = async (coordinate: any) => {
    const apiKey = 'AIzaSyB2G7AJRyxf3kdS5TsLDvAOkabmzL1tvIE'; // Google Haritalar API anahtarınızı buraya ekleyin
    try {
      console.log(coordinate);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${apiKey}`,
      );
      const data = await response.json();
      console.log(data);

      if (data.results.length > 0) {
        const address = data.results[0].address_components; //.formatted_address;
        let addressString = '';
        address.forEach((element: any) => {
          if (element.types[0] === 'street_number') {
            addressString = addressString + element.long_name + '. Sk. ';
          }
          if (element.types[0] === 'route') {
            addressString = addressString + element.long_name + ' ';
          }
          if (element.types[0] === 'administrative_area_level_4') {
            addressString = addressString + element.long_name + ' Mah. ';
          }
          if (element.types[0] === 'administrative_area_level_2') {
            addressString = addressString + element.long_name;
          }
          setAddressText(addressString);
          console.log(addressString);
          console.log(element);
        });
        setSelectedAddress(address);
        //console.log('Seçilen Adres:', address);
      }
    } catch (error) {
      console.error('Ters geocoding hatası:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* SEARCH BAR */}
      {/* <View
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
            width: width * 0.95,
            height: height * 0.05,
            backgroundColor: themeSettings?.cardBackgroundColor,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity>
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
              width: width * 0.9,
              marginLeft: themeSettings?.marginHorizontalMedium,
              overflow: 'hidden',
              // backgroundColor: 'red',
            }}
          />
        </View>
        <Icon
          name={'options-outline'}
          color={'black'}
          size={height * 0.03}
          style={{marginLeft: themeSettings?.marginHorizontalLarge}}
        />
      </View> */}

      {isAddressSelected === false ? (
        <View
          style={{
            zIndex: 999,
            width: width,
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: themeSettings?.marginVerticalLarge,
          }}>
          <TouchableOpacity
            onPress={() => setIsAddressSelected(true)}
            style={{
              width: width * 0.85,
              height: height * 0.05,
              borderRadius: 10,
              backgroundColor: themeSettings?.secondColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: height * 0.0225,
                fontWeight: '500',
                color: 'white',
              }}>
              Adresi Doğrula
            </CustomText>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* New Address Info Component */}
      {isAddressSelected === true ? (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height * 0.45,
            backgroundColor: themeSettings?.mainBackgroundColor,
            zIndex: 999,
            bottom: 0,
          }}>
          {/* ADDRESS TITLE */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: themeSettings?.marginHorizontalLarge,
              marginRight: themeSettings?.marginHorizontalLarge,
              marginTop: themeSettings?.marginVerticalMedium,
              marginBottom: themeSettings?.marginVerticalMedium,
              backgroundColor: themeSettings?.cardBackgroundColor,
              width: width * 0.95,
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
                Adres Başlığı
              </CustomText>
              <CustomTextInput
                placeholder="Ev"
                multiline={false}
                style={{
                  fontSize: themeSettings?.subBodyFontSize,
                  // backgroundColor: 'red',
                  height: height * 0.03,
                  padding: 0,
                  marginTop: 0,
                }}
              />
            </View>
          </View>

          {/* NEIGHBOURHOOD, STREET */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: themeSettings?.marginHorizontalLarge,
              marginRight: themeSettings?.marginHorizontalLarge,
              marginBottom: themeSettings?.marginVerticalMedium,
              backgroundColor: themeSettings?.cardBackgroundColor,
              width: width * 0.95,
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
                Mahalle, Sokak:
              </CustomText>
              <CustomTextInput
                placeholder="15 temmuz demokrasi sokağı"
                multiline={true}
                style={{
                  fontSize: themeSettings?.subBodyFontSize,
                  // backgroundColor: 'red',
                  height: height * 0.03,
                  padding: 0,
                  marginTop: 0,
                }}>
                {addressText}
              </CustomTextInput>
            </View>
          </View>

          {/* NO'S */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            {/* BUILDING NUMBER */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: themeSettings?.marginHorizontalLarge,
                width: width * 0.3,
                borderRadius: 10,
                backgroundColor: themeSettings?.cardBackgroundColor,
              }}>
              <Icon
                name={'locate'}
                color={themeSettings?.secondColor}
                size={height * 0.03}
                style={{
                  marginLeft: themeSettings?.marginHorizontalLarge,
                }}
              />

              <View>
                <CustomText
                  style={{
                    fontSize: themeSettings?.bodyFontSize,
                    marginTop: themeSettings?.marginVerticalSmall,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}>
                  Bina No:
                </CustomText>
                <CustomTextInput
                  placeholder="1"
                  style={{
                    padding: 0,
                    color: 'black',
                    fontSize: themeSettings?.subBodyFontSize,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}
                />
              </View>
            </View>

            {/* FLOOR */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: themeSettings?.marginHorizontalLarge,
                width: width * 0.3,
                borderRadius: 10,
                backgroundColor: themeSettings?.cardBackgroundColor,
              }}>
              <Icon
                name={'locate'}
                color={themeSettings?.secondColor}
                size={height * 0.03}
                style={{
                  marginLeft: themeSettings?.marginHorizontalLarge,
                }}
              />

              <View>
                <CustomText
                  style={{
                    fontSize: themeSettings?.bodyFontSize,
                    marginTop: themeSettings?.marginVerticalSmall,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}>
                  Kat:
                </CustomText>
                <CustomTextInput
                  placeholder="1"
                  style={{
                    padding: 0,
                    color: 'black',
                    fontSize: themeSettings?.subBodyFontSize,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}
                />
              </View>
            </View>

            {/* HOUSE NO */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: themeSettings?.marginHorizontalLarge,
                width: width * 0.3,
                borderRadius: 10,
                backgroundColor: themeSettings?.cardBackgroundColor,
              }}>
              <Icon
                name={'locate'}
                color={themeSettings?.secondColor}
                size={height * 0.03}
                style={{
                  marginLeft: themeSettings?.marginHorizontalLarge,
                }}
              />

              <View>
                <CustomText
                  style={{
                    fontSize: themeSettings?.bodyFontSize,
                    marginTop: themeSettings?.marginVerticalSmall,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}>
                  Daire No:
                </CustomText>
                <CustomTextInput
                  placeholder="1"
                  style={{
                    padding: 0,
                    color: 'black',
                    fontSize: themeSettings?.subBodyFontSize,
                    marginLeft: themeSettings?.marginHorizontalMedium,
                  }}
                />
              </View>
            </View>
          </View>

          {/* ADDRESS DESCRIPTION */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: themeSettings?.marginHorizontalLarge,
              marginRight: themeSettings?.marginHorizontalLarge,
              marginTop: themeSettings?.marginVerticalMedium,
              marginBottom: themeSettings?.marginVerticalMedium,
              backgroundColor: themeSettings?.cardBackgroundColor,
              width: width * 0.95,
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
                Adres Tarifi:
              </CustomText>
              <CustomTextInput
                placeholder="Enucuz avm karşısı"
                multiline={false}
                style={{
                  fontSize: themeSettings?.subBodyFontSize,
                  // backgroundColor: 'red',
                  height: height * 0.03,
                  padding: 0,
                  marginTop: 0,
                }}
              />
            </View>
          </View>
          {/* SAVE ADDRESS BUTTON */}
          <View
            style={{
              width: width,
              flexDirection: 'row',
              justifyContent: 'center',
              position: 'absolute',
              bottom: themeSettings?.marginVerticalLarge,
            }}>
            <TouchableOpacity
              onPress={() => navigate('/UserAddressesScreen')}
              style={{
                width: width * 0.85,
                height: height * 0.05,
                borderRadius: 10,
                backgroundColor: themeSettings?.secondColor,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: height * 0.0225,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Adresi Kaydet
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <MapView
        zoomControlEnabled
        initialRegion={region}
        style={{flex: 1}}
        onPress={e => handleMarkerPress(e.nativeEvent.coordinate)}>
        <Marker
          coordinate={{
            latitude: markerLocation?.latitude!,
            longitude: markerLocation?.longitude!,
          }}
        />
        {/* Diğer işaretçiler */}
      </MapView>
    </View>
  );
};

export default NewAUserAddressScreen;
