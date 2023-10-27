import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderItem from '../../components/orders/orderItem';
import BigButton from '../../components/buttons/bigButton';

const OrderDetailsScreen = memo(() => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;

  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: height * 0.025,
            height: (height * 1) / 15,
          }}>
          <View style={{position: 'absolute', left: width * 0.025}}>
            <Icon name={'arrow-back-outline'} color="black" size={25} />
          </View>
          <View>
            <Text>Sipariş Detayları</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'blue',
            height: (height * 3) / 15,
            marginBottom: height * 0.025,
          }}
        />

        {/* <View>
        <MapScreen />
      </View> */}

        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              marginLeft: width * 0.025,
              marginBottom: height * 0.0125,
            }}>
            Asil Gökmen
          </Text>
        </View>

        <View
          style={{
            marginLeft: width * 0.025,
            flexDirection: 'row',
          }}>
          <View style={{marginRight: width * 0.1}}>
            <Text>Teslimat Adresi:</Text>
            <Text>Teslimat Zamanı:</Text>
          </View>

          <View
            style={{
              marginRight: width * 0.05,
              width: width * 0.55,
              // backgroundColor: 'red',
            }}>
            <Text>23 Ağustos Perşembe 15:43</Text>
            <Text numberOfLines={showText ? undefined : 3}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
              deleniti non cum iusto, eius quia quos autem. Accusantium voluptas
              molestiae voluptatum quia voluptates quibusdam quam officia,
              aperiam nihil atque veniam!
            </Text>
            <TouchableOpacity onPress={toggleText}>
              <Text
                style={{fontWeight: '700', position: 'absolute', right: '0%'}}>
                {showText ? 'Adresi Gizle' : 'Adresi Göster'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: height * 0.025,
            marginBottom: height * 0.0125,
            marginLeft: width * 0.025,
          }}>
          <Text style={{fontWeight: '700', fontSize: 18}}>
            Sipariş Detayları
          </Text>
        </View>

        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />

        <View
          style={{
            width: width * 0.95,
            marginLeft: width * 0.025,
          }}>
          <Text style={{marginVertical: height * 0.025}}>
            Sipariş notu: Lütfen herşey tuzsuz olsun. Lütfen herşey tuzsuz
            olsun. Lütfen herşey tuzsuz olsun. Lütfen herşey tuzsuz olsun.
            Sipariş notu: Lütfen herşey tuzsuz olsun. Lütfen herşey tuzsuz
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', marginLeft: width * 0.025}}>
              <Icon name={'receipt'} color="black" size={25} />
              <View style={{marginLeft: width * 0.025}}>
                <Text>Paket Tutarı</Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                right: '5%',
                padding: width * 0.02,
              }}>
              <Text>250.50</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: height * 0.0125,
              borderWidth: 1,
              borderBottomColor: '#EEEEEE',
            }}
          />
        </View>

        <View style={{marginTop: height * 0.025}}>
          <BigButton
            backgroundColor="#65D384"
            textColor="white"
            buttonText="Onayla"
          />
          <BigButton
            backgroundColor="#EEEEEE"
            textColor="black"
            buttonText="Reddet"
          />
        </View>

        <View />
      </ScrollView>
    </>
  );
});

export default OrderDetailsScreen;
