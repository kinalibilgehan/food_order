import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import {setAllWidths} from '../../../../components/store/headers/StoreScreenStickyHeaderComponent';
import {reduxstore} from '../../../../reduxstore/reduxstore';
import WeeklyWorkingHoursDayRowComponent from '../../../../components/account/storeAccount/weeklyWorkingHours/WeeklyWorkingHoursDayRowComponent';
import CustomText from '../../../../components/general/text/CustomText';
import {useNavigate} from 'react-router-native';

const WeeklyWorkingHoursScreen = () => {
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const state = reduxstore.getState().storeAccount.generalWeeklyWorkingHours;

  const navigate = useNavigate();
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
            Lütfen genel çalışma çizelgenizi doldurunuz. Bu çizelge sizlere
            kolaylık sağlaması açısından oluşturulmuştur,
            <CustomText style={{fontWeight: 'bold'}}>
              {' '}
              mevcut haftanın çizelgesi ile karıştırmayınız.
            </CustomText>{' '}
            Mevcut haftanın çalışma çizelgesi bu genel çizelge baz alınarak her
            gün güncellenecektir. Mevcut haftanın çalışma çizelgesinde
            değişiklik yapmak için
            <TouchableOpacity
              onPress={() => {
                navigate('/CurrentWeekWorkingHoursScreen');
              }}>
              <CustomText style={{color: 'blue', marginBottom: -3.5}}>
                {' '}
                dokunun.
              </CustomText>
            </TouchableOpacity>
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
        {state.map((item: any, index: number) => {
          let currentDay = new Date();
          currentDay.setDate(
            currentDay.getDate() - currentDay.getDay() + 1 + index,
          );
          const dayNumber = currentDay.getDay();
          let helper = state.find((e: any) => e.dayNumber === dayNumber);
          return (
            <WeeklyWorkingHoursDayRowComponent
              key={item.dayNumber}
              date={currentDay}
              zIndex={100 - index}
              //backgroundColor={index % 2 === 0 ? '#FF662E' : '#FF662E'}
              item={helper}
              backgroundColor="#FF662E"
            />
          );
        })}
      </View>
    </GestureHandlerScrollView>
  );
};

export default WeeklyWorkingHoursScreen;
