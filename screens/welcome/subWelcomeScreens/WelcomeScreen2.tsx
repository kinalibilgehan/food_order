import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {setBottomApplicationBarVisibilityStatus} from '../../../components/applicationBars/bottomApplicationBar/bottomApplicationBarSlice';
import {setTopApplicationBarVisibilityStatus} from '../../../components/applicationBars/topApplicationBar/topApplicationBarSlice';
import {reduxstore} from '../../../reduxstore/reduxstore';
import FastImage from 'react-native-fast-image';
import {Globals} from '../../../globals';
import {
  setAllHeights,
  setAllWidths,
} from '../../../components/store/headers/StoreScreenStickyHeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigate} from 'react-router-native';
import LayoutWithoutApplicationBars from '../../layouts/LayoutWithoutApplicationBars';
import {useAppSelector} from '../../../reduxstore/reduxhooks';

const WelcomeScreen2 = () => {
  const navigate = useNavigate();
  const height = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.height,
  );
  const statusbarHeight =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.statusbarHeight;
  const oneLineHeight = (height - statusbarHeight) * 0.111111;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  useEffect(() => {
    reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(false));
    reduxstore.dispatch(setTopApplicationBarVisibilityStatus(false));
    return () => {
      reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(true));
      reduxstore.dispatch(setTopApplicationBarVisibilityStatus(true));
    };
  }, []);

  return (
    <LayoutWithoutApplicationBars>
      <FastImage
        style={{
          width: '100%',
          height: '66.666%',
        }}
        source={{
          uri: Globals.url.APPLICATIONIMAGEPATH + 'welcomeLogo.png',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View
        style={{
          width: '100%',
          height: '11.111%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{color: 'black', fontSize: height * 0.033}}>
          Bikepçe'ye Hoş Geldiniz.
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '11.111%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate('/ParentLoginScreen');
          }}
          style={{
            backgroundColor: themeSettings?.secondColor,
            ...setAllHeights(oneLineHeight * 0.75),
            ...setAllWidths('92.5%'),
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.2}} />
          <View
            style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              numberOfLines={1}
              style={{
                color: themeSettings?.firstColor,
                fontSize: height * 0.028,
              }}>
              Devam Et
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={'arrow-forward'}
              color={themeSettings?.firstColor}
              size={height * 0.045}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: '11.111%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </LayoutWithoutApplicationBars>
  );
};

export default WelcomeScreen2;
