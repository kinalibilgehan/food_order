import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import CustomText from '../../../components/general/text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAccountSettingsComponent from '../../../components/account/userAccount/UserAccountSettingsComponent';
import {Globals} from '../../../globals';
import {useNavigate} from 'react-router-native';

const UserAccountSettingsScreen2 = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;

  const avatarImageUrl = useAppSelector(
    data => data.storeAccount.storeAvatarImageUrl,
  );

  const userState = reduxstore.getState().userAccount.user;

  const navigate = useNavigate();

  return (
    <View
      // PAGE CONTAINER
      style={{
        height: height,
        backgroundColor: '#ABD1C6',
      }}>
      {/* USER HEADER CONTAINER */}
      <View
        style={{
          marginTop: height * 0.0125,
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 254, 0.2)',
            height: height * 0.15,
            borderRadius: 10,
          }}>
          <FastImage
            style={{
              //   backgroundColor: 'red',
              marginLeft: width * 0.025,
              width: '25%',
              height: '25%',
              borderRadius: 60,
              aspectRatio: 1,
            }}
            source={{
              uri:
                Globals.url.STOREIMAGEPATH + avatarImageUrl ??
                'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View>
            <CustomText
              style={{
                marginLeft: width * 0.025,
                marginBottom: height * 0.0125,
                color: '#001E1D',
                fontSize: height * 0.02,
                fontWeight: '700',
              }}>
              Gordon Ramsay
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: width * 0.025,
              }}>
              <Icon
                name={'star-sharp'}
                color={'#F9BC60'}
                size={height * 0.03}
              />
              <CustomText
                style={{
                  marginLeft: width * 0.025,
                  color: '#0F3433',
                }}>
                48 Yorum
              </CustomText>
            </View>
          </View>
          <Icon
            name={'create'}
            color={'#F9BC60'}
            size={height * 0.04}
            style={{
              position: 'absolute',
              top: width * 0.0125,
              right: width * 0.0125,
            }}
          />
        </View>
      </View>

      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
        }}>
        <UserAccountSettingsComponent
          iconName={'person'}
          fieldName={'Kullanıcı Adı'}
          fieldValue={userState?.userName!}
        />
        <UserAccountSettingsComponent
          iconName={'lock-closed'}
          fieldName={'Şifre:'}
          fieldValue={'**********'}
        />
        <UserAccountSettingsComponent
          iconName={'mail'}
          fieldName={'E-Mail:'}
          fieldValue={userState?.email!}
          isConfirmed={userState?.emailConfirmed}
        />

        <TouchableOpacity onPress={() => navigate('/UserAddressesScreen')}>
          <UserAccountSettingsComponent
            iconName={'navigate'}
            fieldName={'Adreslerim'}
            fieldValue={'Tunaboyu sokak no: 6/1'}
          />
        </TouchableOpacity>

        <UserAccountSettingsComponent
          iconName={'phone-portrait'}
          fieldName={'Telefon Numarası:'}
          fieldValue={userState?.phoneNumber!}
          isConfirmed={!userState?.phoneNumberConfirmed}
        />
        <UserAccountSettingsComponent
          iconName={'calendar'}
          fieldName={'Doğum Tarihi:'}
          fieldValue={'09/06/1997'}
        />
      </View>
    </View>
  );
};

export default UserAccountSettingsScreen2;
