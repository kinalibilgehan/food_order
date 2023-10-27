import {View} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/general/text/CustomTextInput';
import CustomText from '../../../components/general/text/CustomText';

const UserAddressesScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  return (
    <View style={{height: height, backgroundColor: '#ABD1C6'}}>
      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: height * 0.0125,
          marginBottom: height * 0.025,
          backgroundColor: 'rgba(255, 255, 254, 0.2)',
          borderRadius: 10,
          height: height * 0.075,
          width: width * 0.85,
        }}>
        <Icon
          name={'map'}
          color={'#004643'}
          size={height * 0.03}
          style={{
            marginLeft: width * 0.025,
          }}
        />
        <CustomTextInput
          placeholder="Yeni Adres"
          multiline={false}
          style={{
            width: width * 0.5,
            marginLeft: width * 0.025,
            color: '#004643',
          }}
        />
      </View>

      <CustomText
        style={{
          marginLeft: width * 0.025,
          marginBottom: height * 0.0125,
          fontSize: height * 0.025,
          fontWeight: '600',
          color: '#001e1d',
        }}>
        Yakınımda
      </CustomText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginBottom: height * 0.0125,
          backgroundColor: 'rgba(255, 255, 254, 0.2)',
          height: height * 0.1,
          borderRadius: 10,
        }}>
        <Icon
          name={'navigate'}
          color={'#004643'}
          size={height * 0.03}
          style={{
            marginLeft: width * 0.025,
          }}
        />
        <CustomText
          style={{
            marginLeft: width * 0.025,
          }}>
          Şu Anki Konum
        </CustomText>
      </View>

      <CustomText
        style={{
          marginLeft: width * 0.025,
          marginBottom: height * 0.0125,
          fontSize: height * 0.025,
          fontWeight: '600',
          color: '#001e1d',
        }}>
        Kayıtlı Konumlar
      </CustomText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginBottom: height * 0.0125,
          backgroundColor: 'rgba(255, 255, 254, 0.2)',
          height: height * 0.1,
          borderRadius: 10,
        }}>
        <Icon
          name={'locate'}
          color={'#004643'}
          size={height * 0.03}
          style={{
            marginLeft: width * 0.025,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: width * 0.025,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.02,
              marginBottom: height * 0.00625,
            }}>
            Adres Başlığı: Ev
          </CustomText>
          <CustomText>Tunaboyu sokak şimşek apartmanı no: 6/1</CustomText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginBottom: height * 0.0125,
          backgroundColor: 'rgba(255, 255, 254, 0.2)',
          height: height * 0.1,
          borderRadius: 10,
        }}>
        <Icon
          name={'locate'}
          color={'#004643'}
          size={height * 0.03}
          style={{
            marginLeft: width * 0.025,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: width * 0.025,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.02,
              marginBottom: height * 0.00625,
            }}>
            Adres Başlığı: Ev
          </CustomText>
          <CustomText>Tunaboyu sokak şimşek apartmanı no: 6/1</CustomText>
        </View>
      </View>
    </View>
  );
};

export default UserAddressesScreen;
