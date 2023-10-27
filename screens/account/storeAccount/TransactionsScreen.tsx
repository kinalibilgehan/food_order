import React from 'react';
import CustomText from '../../../components/general/text/CustomText';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/general/text/CustomTextInput';
import {View} from 'react-native';
import WalletScreenTransactionComponent from '../../../components/transactions/WalletScreenTransactionComponent';

const TransactionsScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  return (
    <ScrollView
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      <CustomText
        style={{
          fontSize: height * 0.025,
          fontWeight: '700',
          marginBottom: height * 0.025,
        }}>
        Transferler
      </CustomText>

      <View
        style={{
          flexDirection: 'row',
          height: height * 0.05,
          marginBottom: height * 0.025,
        }}>
        <View
          style={{
            marginRight: width * 0.05,
            flexDirection: 'row',
            alignItems: 'center',
            padding: height * 0.005,
            borderColor: 'gray',
            borderWidth: width * 0.003,
          }}>
          <Icon
            style={{
              zIndex: 300,
              color: 'black',
              backgroundColor: 'transparent',
              marginRight: width * 0.04,
            }}
            name="search-outline"
            size={height * 0.03}
          />
          <CustomTextInput
            style={{
              width: width * 0.55,
              height: height * 0.05,
              color: 'black',
            }}
            placeholder="Ara"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'gray',
            borderWidth: width * 0.003,
            padding: height * 0.005,
          }}>
          <Icon
            style={{
              zIndex: 300,
              color: 'black',
              backgroundColor: 'transparent',
              marginRight: width * 0.04,
            }}
            name="filter-outline"
            size={height * 0.03}
          />
          <CustomText>Filtrele</CustomText>
        </View>
      </View>

      <CustomText
        style={{
          color: 'gray',
          fontSize: height * 0.025,
          marginBottom: height * 0.00625,
        }}>
        Pazar
      </CustomText>

      <CustomText
        style={{
          fontSize: height * 0.03,
          fontWeight: '700',
        }}>
        21 Mayıs 2023
      </CustomText>

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
      <View
        style={{
          borderBottomWidth: height * 0.01,
          borderColor: themeSettings?.thirdColor,
        }}
      />
    </ScrollView>
  );
};

export default TransactionsScreen;
