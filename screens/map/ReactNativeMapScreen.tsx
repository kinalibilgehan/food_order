import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';

const ReactNativeMapScreen = () => {
  enableLatestRenderer();

  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleMarkerPress = (coordinate: any) => {
    // Seçilen koordinatı ve adresi almak için bir fonksiyon çağırın
    getReverseGeocoding(coordinate);
  };

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
        address.forEach((element: any) => {
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
      <MapView
        initialRegion={{
          latitude: 36.831181,
          longitude: 28.768783,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}
        onPress={e => handleMarkerPress(e.nativeEvent.coordinate)}>
        <Marker coordinate={{latitude: 36.831181, longitude: 28.768783}} />
        {/* Diğer işaretçiler */}
      </MapView>
    </View>
  );
};

export default ReactNativeMapScreen;
