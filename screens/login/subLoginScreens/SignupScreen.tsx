import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import StandardButton from '../../../components/buttons/StandardButton';
import LoginTextInputComponent from '../../../components/login_signup/LoginTextInputComponent';
import {LoginSignupInputTypeEnum} from '../authenticationStatusSlice';
import LoginPasswordInputComponent from '../../../components/login_signup/LoginPasswordInputComponent';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useNavigate} from 'react-router-native';

const SignupScreen = () => {
  const navigate = useNavigate();
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const handleSignupButtonPress = () => {};
  return (
    <>
      <View
        style={{
          flex: 0.03,
          justifyContent: 'center',
        }}
      />
      <LoginTextInputComponent
        inputType={LoginSignupInputTypeEnum.SignupUsername}
        placeHolderText="Kullanıcı Adı"
      />
      <LoginTextInputComponent
        inputType={LoginSignupInputTypeEnum.SignupEmail}
        placeHolderText="E-Posta"
      />
      <LoginTextInputComponent
        inputType={LoginSignupInputTypeEnum.SignupPhoneNumber}
        placeHolderText="Telefon Numarası"
      />
      <LoginPasswordInputComponent
        inputType={LoginSignupInputTypeEnum.SignupPassword}
        placeHolderText="Şifre"
      />
      <LoginPasswordInputComponent
        inputType={LoginSignupInputTypeEnum.SignupConfirmPassword}
        placeHolderText="Şifre Tekrar"
      />
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StandardButton
          onPress={handleSignupButtonPress}
          text="Hesap Oluştur"
        />
      </View>
      <View
        style={{
          flex: 0.08,
          marginLeft: width * 0.05,
        }}>
        <Text style={{color: 'black'}}>
          Hesap Olusturarak Üyelik Kosullarini ve Kisisel Verilerin Korunmasi
          Metni'ni kabul ediyorum.
        </Text>
      </View>
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
};

export default SignupScreen;
