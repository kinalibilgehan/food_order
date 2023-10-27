import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import FastImage from 'react-native-fast-image';
import AccountActionItem from '../../components/account/AccountActionItem';

const AccountScreen = memo(() => {
  const middleApplicationBodyHeight =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: middleApplicationBodyHeight && middleApplicationBodyHeight,
        }}>
        <View
          style={{
            marginTop: 40,
            marginLeft: 40,
            marginRight: 40,
            height:
              middleApplicationBodyHeight &&
              middleApplicationBodyHeight * (2 / 15),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Sultan Mutfak</Text>
          </View>
          <View>
            <FastImage
              style={{
                height: 80,
                width: 80,
                borderWidth: 3,
                borderColor: '#65D384',
                borderRadius: 500,
              }}
              source={{
                uri: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            height:
              middleApplicationBodyHeight &&
              middleApplicationBodyHeight * (2 / 15),
          }}>
          <Text>
            Hakkında: 42 yaşında ev hanımıyım. Balkan yemekleri ve hamurişleri
            konusunda uzmanım. Özel günleriniz için 15 kişiye kadar yemek
            siparişi alabiliyorum
          </Text>
        </View>
        <AccountActionItem title="Restoran Sayfam" icon="restaurant" />

        <AccountActionItem title="Siparişler" icon="heart" />

        <AccountActionItem title="Ürünler" icon="pricetag" />

        <AccountActionItem title="Kasa" icon="wallet" />

        <AccountActionItem title="Kampanya Ekle" icon="add-circle" />

        <AccountActionItem title="İşletme Ayarları" icon="list-circle" />

        <AccountActionItem title="Yardım" icon="md-help-circle" />

        <AccountActionItem title="Deliver with Uber" icon="car" />

        <AccountActionItem title="Ayarlar" icon="settings" />
      </View>
    </>
  );
});

export default AccountScreen;
