import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WeeklyWorkingHoursDayRowComponent from '../../../../components/account/storeAccount/weeklyWorkingHours/WeeklyWorkingHoursDayRowComponent';
import CustomText from '../../../../components/general/text/CustomText';
import {setAllWidths} from '../../../../components/store/headers/StoreScreenStickyHeaderComponent';
import {reduxstore} from '../../../../reduxstore/reduxstore';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import agent from '../../../../api/agent';
import {StoreWorkDayCurrent} from '../IStoreAccount';

const CurrentWeekWorkingHoursScreen = () => {
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;

  useEffect(() => {
    asTest();
    return () => {};
  }, []);

  const asTest = async () => {
    let resp = await agent.Store.getCurrentWeekWorkingHoursByStoreId(
      reduxstore.getState().userAccount.user?.ownedStoreId!,
    );
    console.log(new Date().getTimezoneOffset());
    setData(resp);
  };

  const [data, setData] = useState<StoreWorkDayCurrent[]>([]);

  return (
    <GestureHandlerScrollView
      contentContainerStyle={{...setAllWidths(width), flexGrow: 1}}>
      <View
        style={{
          ...setAllWidths(width * 0.95),
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          marginBottom: 200,
          flexDirection: 'column',
          flex: 1,
        }}>
        <View
          style={{
            ...setAllWidths(width * 0.95),
            marginBottom: 20,
          }}>
          <CustomText style={{textAlign: 'auto'}}>
            Lütfen mevcut hafta çalışma çizelgenizi kontrol ediniz. Unutmayın,
            müşterileriniz yalnızca aktif olarak işaretlediğiniz gün ve zaman
            aralıklarına sipariş verebilirler. Benzer şekilde kurye hizmetinizin
            olup olmadığını, gün ve zaman aralıklarını güncelleyiniz.
          </CustomText>
          <CustomText style={{textAlign: 'auto'}}> </CustomText>
          <CustomText style={{textAlign: 'auto'}}>
            Not: Yeni bir gün başladığında, siz değişiklik yapana dek yeni günün
            ayarları,
            <CustomText style={{fontWeight: 'bold'}}>
              {' '}
              genel çalışma çizelgesi'
            </CustomText>
            ndeki aynı güne karşılık gelen ayarlar ile otomatik olarak
            doldurulacaktır. Dilediğinizde değişiklik yapabilirsiniz.
          </CustomText>
        </View>
        <View style={{...setAllWidths(width * 0.95), flexDirection: 'row'}}>
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.275),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText>Gün</CustomText>
          </View>
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.2),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText>Açılış</CustomText>
          </View>
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.05),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.2),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText>Kapanış</CustomText>
          </View>
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.125),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText>Aktif</CustomText>
          </View>
          <View
            style={{
              ...setAllWidths(width * 0.95 * 0.15),
              borderWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText>Kurye</CustomText>
          </View>
        </View>
        {data.map((item: StoreWorkDayCurrent, index: number) => {
          let currentDay = new Date();
          currentDay.setDate(
            currentDay.getDate() - currentDay.getDay() + 1 + index,
          );
          return (
            <WeeklyWorkingHoursDayRowComponent
              key={item.id}
              date={new Date(item.date)}
              zIndex={100 - index}
              showDateString
              //backgroundColor={index % 2 === 0 ? '#FF662E' : '#FF662E'}
              item={item}
              backgroundColor="#FF662E"
            />
          );
        })}
      </View>
    </GestureHandlerScrollView>
  );
};

export default CurrentWeekWorkingHoursScreen;
