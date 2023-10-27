import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {reduxstore} from '../../reduxstore/reduxstore';
import WebView from 'react-native-webview';
import {
  setAllHeights,
  setAllWidths,
} from '../../components/store/headers/StoreScreenStickyHeaderComponent';

const DevScreen = () => {
  const animasyon = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animasyon, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, []);

  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.height;

  return (
    <WebView
      scrollEnabled={false}
      originWhitelist={['*']}
      source={{
        uri: 'http://192.168.1.10:3001/Html/GetHtml',
      }}
      style={{
        flex: 1,
        zIndex: 999,
        position: 'absolute',
        backgroundColor: 'transparent',
        ...setAllHeights(height * 0.8),
        ...setAllWidths(width),
        //alignItems: 'center',
      }}
    />
  );
};
export default DevScreen;
