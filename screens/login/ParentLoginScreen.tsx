import {Linking, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import {setAllWidths} from '../../components/store/headers/StoreScreenStickyHeaderComponent';
import LayoutWithoutApplicationBars from '../layouts/LayoutWithoutApplicationBars';
import {useNavigate} from 'react-router-native';
import {useAppSelector} from '../../reduxstore/reduxhooks';

import SwitchButton1, {
  SwitchButton1ModeEnum,
  SwitchButton1SelectedOptionEnum,
} from '../../components/buttons/switches/SwitchButton1';
import {setNavigatorValue} from '../../appslices/navigatorSlice';
import LoginScreen from './subLoginScreens/LoginScreen';
import SignupScreen from './subLoginScreens/SignupScreen';

const ParentLoginScreen = memo(() => {
  const navigate = useNavigate();

  const authenticationStatus = useAppSelector(
    data => data.authenticationStatus,
  );
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.height;

  useEffect(() => {
    reduxstore.dispatch(setNavigatorValue(navigate));
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log(initialUrl);
    };
    getUrlAsync();
    if (authenticationStatus.Authenticated) {
      navigate('/');
    }
    //const subscription = Linking.addEventListener('url', e => {
    //  const initialUrl = e.url;
    //  const queryString = initialUrl.replace('app://bikepce', '');
    //  const urlParams = new URLSearchParams(queryString);
    //  const params = Object.fromEntries(urlParams.entries());
    //  if (params.isAuthenticated) {
    //    reduxstore.dispatch(setText(params.userName));
    //    reduxstore.dispatch(setJWTTokenValue(params.token));
    //    reduxstore.dispatch(setAuthenticationStatus(true));
    //    navigate('/');
    //  }
    //});
    return () => {
      //subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationStatus.Authenticated]);

  const [switchButtonSelectedOption, setSwitchButtonSelectedOption] =
    useState<SwitchButton1SelectedOptionEnum>(
      SwitchButton1SelectedOptionEnum.Option1,
    );

  return (
    <LayoutWithoutApplicationBars>
      <View
        style={{
          ...setAllWidths(width),
          flexDirection: 'column',
          flex: 1,
          backgroundColor: themeSettings?.firstColor,
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: width * 0.025,
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 0.07,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SwitchButton1
              buttonMode={SwitchButton1ModeEnum.OneRow}
              option1="Giriş Yap"
              option2="Hesap Oluştur"
              selectedOption={switchButtonSelectedOption}
              setSelectedOption={setSwitchButtonSelectedOption}
              buttonHeight={height * 0.055}
              buttonWidth={width * 0.75}
            />
          </View>
          {switchButtonSelectedOption ===
            SwitchButton1SelectedOptionEnum.Option1 && <LoginScreen />}
          {switchButtonSelectedOption ===
            SwitchButton1SelectedOptionEnum.Option2 && <SignupScreen />}
        </View>
      </View>
    </LayoutWithoutApplicationBars>
  );
});

export default ParentLoginScreen;
