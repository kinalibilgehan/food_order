import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../components/general/text/CustomText';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import WalletScreenTransactionComponent from '../../../components/transactions/WalletScreenTransactionComponent';
import {useNavigate} from 'react-router-native';

const WalletScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const navigate = useNavigate();

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: themeSettings?.secondColor,
          height: height * 0.4,
        }}>
        <View
          style={{
            marginLeft: width * 0.025,
            marginRight: width * 0.025,
            marginBottom: height * 0.025,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Icon
            style={{}}
            name="arrow-back-outline"
            color="white"
            size={height * 0.04}
          />
          <CustomText
            style={{
              color: 'white',
              fontSize: height * 0.025,
            }}>
            Cüzdan
          </CustomText>
          <FastImage
            style={{
              width: '20%',
              height: '20%',
              borderRadius: 100,
              aspectRatio: 1,
            }}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: width * 0.95,
              height: height * 0.25,
              backgroundColor: 'black',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <CustomText
              style={{
                color: 'white',
                marginBottom: height * 0.0125,
                fontSize: height * 0.025,
              }}>
              Cüzdan
            </CustomText>
            <CustomText
              style={{
                color: 'white',
                marginBottom: height * 0.0125,
                fontSize: height * 0.05,
              }}>
              15.300,34
            </CustomText>
            <Icon
              style={{
                marginBottom: height * 0.0125,
              }}
              name="download-outline"
              color="white"
              size={height * 0.05}
            />
            <CustomText
              style={{
                color: 'white',
              }}>
              Banka Hesabına Aktar
            </CustomText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginTop: height * 0.025,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            fontSize: height * 0.025,
            fontWeight: '700',
          }}>
          Son transferler
        </CustomText>
        <TouchableOpacity onPress={() => navigate('/TransactionsScreen')}>
          <CustomText
            style={{
              color: 'gray',
              fontSize: height * 0.02,
            }}>
            Hepsini görüntüle
          </CustomText>
        </TouchableOpacity>
      </View>

      <WalletScreenTransactionComponent
        imageUrl={
          'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png'
        }
        userName={'Bilgehan'}
        orderDate={'05.07.2023'}
        orderTotalPrice={150}
      />
      <WalletScreenTransactionComponent
        imageUrl={
          'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png'
        }
        userName={'Bilgehan'}
        orderDate={'05.07.2023'}
        orderTotalPrice={150}
      />
      <WalletScreenTransactionComponent
        imageUrl={
          'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png'
        }
        userName={'Bilgehan'}
        orderDate={'05.07.2023'}
        orderTotalPrice={150}
      />
    </ScrollView>
  );
};

export default WalletScreen;
