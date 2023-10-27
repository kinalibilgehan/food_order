/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapboxGL, {Camera, MarkerView} from '@rnmapbox/maps';
import {Position} from 'geojson';
//import { UserTrackingMode } from '@rnmapbox/maps/javascript/components/Camera';
import {useAppSelector} from '../../reduxstore/reduxhooks';
import {OSType} from '../start/targetEnvironmentSlice';

MapboxGL.setWellKnownTileServer('mapbox');
MapboxGL.setAccessToken(
  'sk.eyJ1IjoibG9yZG9mYmFzYXIiLCJhIjoiY2xmbno0Nnd2MGNhZTNxb2Q5aTRkNjZzZCJ9.GBJrvpk_QL_yVlIp9amK1A',
);

type MarkerConfig = {
  coords: Position;
  color: string;
};
const markerCount = 20;
const centerCoord = [28.768783, 36.831181];
const allColors = ['red', 'green', 'blue', 'purple'];

const MapScreen = memo(() => {
  const targetEnvironment = useAppSelector(data => data.targetEnvironment);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: targetEnvironment.AppScreenDimensions?.width,
      width: targetEnvironment.AppScreenDimensions?.width,
    },
    map: {
      flex: 1,
    },
    markerBox: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      padding: 4,
      borderWidth: 2,
      borderColor: 'white',
    },
    markerBoxSelected: {
      padding: 12,
    },
    markerText: {
      color: 'white',
      fontSize: 11,
      fontWeight: 'bold',
    },
  });
  const cameraRef = useRef<Camera>(null);

  const [markers, setMarkers] = useState<MarkerConfig[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [anchor, setAnchor] = useState({x: 0.5, y: 0.5});
  const [allowOverlap, setAllowOverlap] = useState(true);

  const [show, setShow] = useState(true);
  const [size, setSize] = useState(1);

  const [locationState, setLocationState] = useState<MapboxGL.Location | null>(
    null,
  );

  const randomizeCoordinatesAndColors = useCallback(() => {
    const newMarkers = new Array(markerCount).fill(0).map((o, i) => {
      return {
        coords: [
          centerCoord[0] + (Math.random() - 0.5) * 0.008,
          centerCoord[1] + (Math.random() - 0.5) * 0.008,
        ],
        color: allColors[i % allColors.length],
      };
    });

    setMarkers(newMarkers);
  }, []);

  useEffect(() => {
    if (targetEnvironment.OS === OSType.ANDROID) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])
        .then(() => {})
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    randomizeCoordinatesAndColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  /*const renderLocationInfo = memo(() => {
    if (
      locationState === null ||
      locationState.timestamp === null ||
      locationState!.timestamp! <= 0
    ) {
      return null;
    }

    return (
      <Bubble>
        <Text>Timestamp: {locationState.timestamp}</Text>
        <Text>Latitude: {locationState.coords.latitude}</Text>
        <Text>Longitude: {locationState.coords.longitude}</Text>
        <Text>Altitude: {locationState.coords.altitude}</Text>
        <Text>Heading: {locationState.coords.heading}</Text>
        <Text>Accuracy: {locationState.coords.accuracy}</Text>
        <Text>Speed: {locationState.coords.speed}</Text>
      </Bubble>
    );
  });*/

  const onUserLocationUpdate = (location: MapboxGL.Location) => {
    return;
    /*try {
      const state: MapboxGL.Location = {
        timestamp: location.timestamp,
        coords: location.coords,
      };
      const center: Position = [state.coords.longitude, state.coords.latitude];
      cameraRef.current!.flyTo(center, 250);
      setLocationState(state);
    } catch (error) {
      console.log(targetEnvironment.OS, error, targetEnvironment.OS);
    }*/
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} zoomEnabled={true}>
          <MapboxGL.UserLocation
            visible={true}
            onUpdate={onUserLocationUpdate}
          />
          <MapboxGL.Camera
            defaultSettings={{
              zoomLevel: 6,
              centerCoordinate: [28.768783, 36.831181],
            }}
            //defaultSettings={{ centerCoordinate: centerCoord, zoomLevel: 14 }}
            //centerCoordinate={centerCoord}
            //zoomLevel={4}
            ref={cameraRef}
          />

          {markers.map((marker, i) => {
            return (
              <MarkerView
                key={`MarkerView-${marker.coords.join('-')}`}
                coordinate={marker.coords}
                anchor={anchor}
                allowOverlap={allowOverlap}
                isSelected={i === selectedIndex}
                style={{display: show ? 'flex' : 'none'}}>
                <Pressable
                  style={[
                    styles.markerBox,
                    {backgroundColor: marker.color, padding: 4 * size},
                  ]}
                  onPress={() => {
                    setSelectedIndex(i);
                  }}>
                  <Text style={styles.markerText}>Marker {i + 1}</Text>
                </Pressable>
              </MarkerView>
            );
          })}
        </MapboxGL.MapView>
        {
          //renderLocationInfo("")
        }
      </View>
    </View>
  );
});

export default MapScreen;
