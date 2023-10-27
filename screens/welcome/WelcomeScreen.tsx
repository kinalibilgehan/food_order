import React, {useEffect, useState} from 'react';
import WelcomeScreen1 from './subWelcomeScreens/WelcomeScreen1';
import WelcomeScreen2 from './subWelcomeScreens/WelcomeScreen2';
import {Linking} from 'react-native';
import {reduxstore} from '../../reduxstore/reduxstore';
import {setNavigatorValue} from '../../appslices/navigatorSlice';

import {useNavigate} from 'react-router-native';
import {getQueryParam} from '../../../App';
import {UserDto} from '../../dtos/identity/subClasses/userDto';
import {setText} from '../../components/applicationBars/topApplicationBar/topApplicationBarSlice';
import {setUserAccountState} from '../account/userAccountSlice';
import {
  setJWTTokenValue,
  setAuthenticationStatus,
} from '../login/authenticationStatusSlice';
import {handleGetBasket} from '../login/subLoginScreens/LoginScreen';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showSecondWelcomeScreen, setShowSecondWelcomeScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowSecondWelcomeScreen(true);
    }, 3000);
  }, []);

  useEffect(
    () => {
      reduxstore.dispatch(setNavigatorValue(navigate));
      const getUrlAsync = async () => {
        //const initialUrl = await Linking.getInitialURL();

        Linking.getInitialURL().then(url => {
          console.log('DEDE', url);
        });
      };
      getUrlAsync();
      //if (authenticationStatus.Authenticated) {
      //  navigate('/');
      //}
      //const subscription =
      Linking.addEventListener('url', e => {
        console.log('buraya girdi');
        const initialUrl = e.url;
        //console.log(initialUrl);
        //const queryString = initialUrl; //.replace('https://bikepce.com/', '');
        //const urlParams = new URLSearchParams(queryString);
        //console.log(urlParams);
        //const params = Object.fromEntries(urlParams.entries());
        if (getQueryParam(initialUrl, 'isAuthenticated') === 'true') {
          let user: UserDto = JSON.parse(getQueryParam(initialUrl, 'user'));
          console.log(user);
          reduxstore.dispatch(setText(user.userName));
          reduxstore.dispatch(setJWTTokenValue(user.token));
          reduxstore.dispatch(setAuthenticationStatus(true));
          reduxstore.dispatch(setUserAccountState(user));
          handleGetBasket();
          navigate('/');
        }
      });
      return () => {
        //subscription.remove();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      //authenticationStatus.Authenticated
    ],
  );

  if (!showSecondWelcomeScreen) {
    return <WelcomeScreen1 />;
  } else {
    return <WelcomeScreen2 />;
  }
};

export default WelcomeScreen;
