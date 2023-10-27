import React, {memo} from 'react';
import WebView from 'react-native-webview';

const WebViewScreen = memo(() => {
  return (
    //<WebView source={{uri: 'https://reactnative.dev/'}} style={{flex: 1}} />
    <WebView
      originWhitelist={['*']}
      source={{html: '<a href="https://deeplinkbasar"> Test deep Linking </a>'}}
      style={{flex: 1}}
    />
  );
});

export default WebViewScreen;
