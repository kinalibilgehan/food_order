import React from 'react';
import FastImage from 'react-native-fast-image';
import {Globals} from '../../../globals';
import LayoutFullScreen from '../../layouts/LayoutFullScreen';
import {View} from 'react-native';

const WelcomeScreen1 = () => {
  return (
    <LayoutFullScreen>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        {
          <FastImage
            style={{
              width: 170,
              height: 100,
            }}
            source={{
              uri: Globals.url.APPLICATIONIMAGEPATH + 'bikepce2.GIF',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        }
        <FastImage
          style={{
            width: '75%',
            height: '19.17%',
            marginBottom: 20,
          }}
          source={{
            uri: Globals.url.APPLICATIONIMAGEPATH + 'semibold.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        {
          //<View style={{width: '40%', height: '10%'}}>
          //  <LoadingSpinner />
          //</View>
        }
      </View>
    </LayoutFullScreen>
  );
};

export default WelcomeScreen1;
