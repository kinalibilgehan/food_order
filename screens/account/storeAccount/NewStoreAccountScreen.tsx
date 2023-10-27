import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import {useNavigate} from 'react-router-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../../../components/general/text/CustomText';
import {Globals} from '../../../globals';

const NewStoreAccountScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  let totalPrice = 0;
  const basketItemsState = useAppSelector(
    data => data.basketState.basket.basketItems,
  );
  const basketPropertiesState = useAppSelector(
    data => data.basketState.basket.basketProperties,
  );

  const selectedRestaurantState = useAppSelector(
    data => data.mainScreen.selectedStore?.name,
  );

  const navigate = useNavigate();

  return (
    <View
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
        height: height,
      }}>
      {/* <View
        style={{
          marginTop: height * 0.0125,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          height: height * 0.05,
          width: width * 0.3,
          backgroundColor: themeSettings?.thirdColor,
          borderRadius: 20,
        }}>
        <TouchableOpacity onPress={() => navigate('/UserPastOrdersListScreen')}>
          <CustomText
            style={{
              textAlign: 'center',
            }}>
            Siparişlerim
          </CustomText>
        </TouchableOpacity>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginTop: height * 0.125,
            height: height * 0.5,
            width: width * 0.8,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            style={{
              borderRadius: 60,
              width: '90%',
              height: '50%',
            }}
            source={{
              uri: Globals.url.APPLICATIONIMAGEPATH + 'shoppingCart.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <CustomText
            style={{
              fontSize: height * 0.025,
            }}>
            Henüz Bikepçe'de bir restoranınız bulunmuyor. Siz de hemen bir
            restoran oluşturun ve kazanmaya başlayın.
          </CustomText>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: height * 0.025,
          backgroundColor: themeSettings?.secondColor,
          width: width * 0.9,
          height: height * 0.05,
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigate('/CreateStoreAccountSettingsScreen')}>
          <CustomText
            style={{
              color: 'white',
              fontSize: height * 0.025,
            }}>
            Restoran oluştur
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewStoreAccountScreen;
