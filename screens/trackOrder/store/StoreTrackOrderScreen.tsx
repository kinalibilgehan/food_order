import {View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {reduxstore} from '../../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../components/general/text/CustomText';
import OrderItem from '../../../components/orders/orderItem';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import BigButton from '../../../components/buttons/bigButton';

const StoreTrackOrderScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const basketItemsState = reduxstore.getState().basket.basketItems;
  const basketPropertiesState = useAppSelector(
    data => data.basket.basketProperties,
  );
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Icon name="close-outline" color={'black'} size={width * 0.125} />
          </View>
          <View
            style={{
              marginLeft: width * 0.23,
            }}>
            <CustomText
              style={{
                fontSize: (height * 0.7) / 20,
                fontWeight: '700',
              }}>
              Bilgehan K.
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          borderBottomColor: themeSettings?.thirdColor,
          borderBottomWidth: 5,
          width: width * 0.15,
          marginBottom: height * 0.0125,
        }}
      />
      <View>
        <CustomText
          style={{
            fontSize: (height * 0.55) / 20,
            fontWeight: '700',
          }}>
          Sipariş Detayları
        </CustomText>
      </View>
      <View
        style={{
          marginBottom: height * 0.0125,
        }}>
        <CustomText
          style={{
            color: themeSettings?.thirdColor,
          }}>
          Adres
        </CustomText>
        <CustomText>To the moon baby</CustomText>
        <View
          style={{
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          marginBottom: height * 0.0125,
        }}>
        <CustomText
          style={{
            color: themeSettings?.thirdColor,
          }}>
          Teslimat Zamanı
        </CustomText>
        <CustomText>19.15</CustomText>
        <View
          style={{
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          marginBottom: height * 0.0125,
        }}>
        <CustomText
          style={{
            color: themeSettings?.thirdColor,
          }}>
          Teslimat Türü
        </CustomText>
        <CustomText>Gel-al</CustomText>
        <View
          style={{
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          marginBottom: height * 0.0125,
        }}>
        <CustomText
          style={{
            color: themeSettings?.thirdColor,
          }}>
          Teslimat Notu
        </CustomText>
        <CustomText>Zil bozuk gelince arar mısınız</CustomText>
        <View
          style={{
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            marginTop: height * 0.025,
            marginBottom: height * 0.0125,
            marginLeft: width * 0.025,
          }}
        />
        <OrderItem />
        <OrderItem />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height * 0.0125,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: width * 0.05,
            }}>
            <CustomText style={{fontWeight: '700', marginRight: width * 0.01}}>
              Paket Tutarı
            </CustomText>
            <CustomText style={{fontWeight: '200', marginRight: width * 0.01}}>
              (kdv dahil)
            </CustomText>
          </View>

          <CustomText
            style={{
              fontWeight: '700',
              marginRight: width * 0.06,
              marginTop: width * 0.05,
            }}>
            {Math.round(basketPropertiesState.totalPrice * 100) / 100}
          </CustomText>
        </View>
        <View
          style={{
            borderBottomColor: themeSettings?.thirdColor,
            borderBottomWidth: 1,
          }}
        />
        <View>
          <BigButton
            backgroundColor="#65D384"
            textColor="white"
            buttonText="Kabul Et"
          />
          <BigButton
            backgroundColor="#EEEEEE"
            textColor="black"
            buttonText="Reddet"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StoreTrackOrderScreen;
