import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import agent from '../../../api/agent';
import {setText} from '../../../components/applicationBars/topApplicationBar/topApplicationBarSlice';
import StandardButton from '../../../components/buttons/StandardButton';
import ExternalLoginRowComponent from '../../../components/login_signup/ExternalLoginRowComponent';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {
  setJWTTokenValue,
  setAuthenticationStatus,
  LoginSignupInputTypeEnum,
} from '../authenticationStatusSlice';
import {useNavigate} from 'react-router-native';
import LoginTextInputComponent from '../../../components/login_signup/LoginTextInputComponent';
import LoginPasswordInputComponent from '../../../components/login_signup/LoginPasswordInputComponent';
import {
  setUserAccountInitialState,
  setUserAccountState,
} from '../../account/userAccountSlice';
import {
  setBasketId,
  setBasketProperties,
  setBasketItems,
} from '../../basket/basketSlice';
import {LoginResponseDto} from '../../../dtos/identity/response/loginResponseDto';

export interface LoginRequestDto {
  username: string;
  password: string;
}

export const handleGetBasket = async () => {
  const basket = await agent.Order.GetBasket();
  if (basket.basket != null) {
    const basketId = basket.basket?.id;
    const basketProperties = basket.basket?.basketProperties;
    const basketItems = basket.basket?.basketItems;

    reduxstore.dispatch(setBasketId(basketId));
    reduxstore.dispatch(setBasketProperties(basketProperties));
    reduxstore.dispatch(setBasketItems(basketItems));
  }
};

const LoginScreen = memo(() => {
  const navigate = useNavigate();
  const handleLoginButtonPress = async () => {
    let dto: LoginRequestDto = {
      username: reduxstore.getState().authenticationStatus.LoginUsername!,
      password: reduxstore.getState().authenticationStatus.LoginPassword!,
    };
    try {
      const response: LoginResponseDto = await agent.Identity.logIn(dto);
      console.log(response);
      reduxstore.dispatch(setText(response.user.userName));
      reduxstore.dispatch(setJWTTokenValue(response.user.token));
      reduxstore.dispatch(setAuthenticationStatus(true));
      handleGetBasket();
      reduxstore.dispatch(setUserAccountState(response.user));
    } catch (error) {
      reduxstore.dispatch(setJWTTokenValue(''));
      reduxstore.dispatch(setAuthenticationStatus(false));
      reduxstore.dispatch(setUserAccountInitialState(true));
    }
  };
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  return (
    <>
      <View
        style={{
          flex: 0.03,
          justifyContent: 'center',
        }}
      />
      <LoginTextInputComponent
        inputType={LoginSignupInputTypeEnum.LoginUsername}
        placeHolderText="Kullanıcı Adı / E-Posta / Telefon Numarası"
      />
      <LoginPasswordInputComponent
        inputType={LoginSignupInputTypeEnum.LoginPassword}
        placeHolderText="Şifreniz"
      />
      <View
        style={{
          flex: 0.04,
          marginLeft: width * 0.05,
        }}>
        <Text style={{color: 'black'}}>Şifremi Unuttum</Text>
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StandardButton onPress={handleLoginButtonPress} text="Giriş Yap" />
      </View>
      <View
        style={{
          flex: 0.05,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.44, backgroundColor: 'gray', height: 1}} />
        <View
          style={{
            flex: 0.12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}>ya da</Text>
        </View>
        <View style={{flex: 0.44, backgroundColor: 'gray', height: 1}} />
      </View>
      <ExternalLoginRowComponent />
      <View
        style={{
          flex: 0.04,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate('/');
          }}>
          <Text style={{color: 'black'}}>Üye Olmadan Devam Et</Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

export default LoginScreen;
