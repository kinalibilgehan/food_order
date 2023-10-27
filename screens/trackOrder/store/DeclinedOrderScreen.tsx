import {View} from 'react-native';
import React from 'react';
import CustomText from '../../../components/general/text/CustomText';
import {reduxstore} from '../../../reduxstore/reduxstore';
import DropdownList, {
  ICustomDropdownOption,
} from '../../../components/general/dropdown/DropdownList';
import CustomTextInput from '../../../components/general/text/CustomTextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DeclinedOrderScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const dropdownData: ICustomDropdownOption[] = [
    {
      label: 'Canım istemedi',
      value: 0,
    },
    {
      label: 'Malzeme yok',
      value: 800,
    },
    {
      label: 'Ananem öldü',
      value: 900,
    },
    {
      label: 'Baldızımın düğünü var',
      value: 1000,
    },
  ];
  return (
    // PAGE CONTAINER
    <View
      style={{
        marginTop: height * 0.0125,
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      <CustomText
        style={{
          fontSize: height * 0.03,
          fontWeight: '700',
        }}>
        Siparişiniz Reddedildi.
      </CustomText>

      {/* DROPDOWN CONTAINER */}
      <View
        style={{
          marginTop: height * 0.025,
        }}>
        <DropdownList
          options={dropdownData}
          onSelect={option => console.log('Selected option:', option)}
          maxDropdownHeight={200}
          showSearch={false}
          buttonWidth={width * 0.95}
          buttonHeight={25}
          defaultValue={'Lütfen bir red nedeni seçiniz'}
        />
      </View>

      {/* CANCEL NOTE CONTAINER */}
      <View
        style={{
          marginTop: height * 0.025,
          //   backgroundColor: 'red',
        }}>
        <CustomTextInput
          style={{
            height: height * 0.2,
            backgroundColor: themeSettings?.thirdColor,
            textAlignVertical: 'top',
            borderRadius: 10,
          }}
          placeholder="Müşterinize siparişi red sebebiniz için bir mesaj gönderin."
        />
      </View>

      <CustomText
        style={{
          marginTop: height * 0.025,
          marginBottom: height * 0.0125,
          fontSize: height * 0.02,
          fontWeight: '500',
        }}>
        Size gönderilen siparişi reddetmek mağazanızın puanını düşürebilir. Bunu
        önlemek için çalışma saatlerinizi ve ürünlerinizi güncel tutmaya özen
        gösterin.
      </CustomText>

      {/* BUTTONS CONTAINER */}
      <View>
        <View
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.95,
          }}>
          <TouchableOpacity
            style={{
              width: width * 0.85,
              height: height * 0.05,
              borderRadius: 10,
              backgroundColor: themeSettings?.secondColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: height * 0.0225,
                fontWeight: '500',
                color: themeSettings?.thirdColor,
              }}>
              Çalışma Saatlerini güncelle.
            </CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.95,
          }}>
          <TouchableOpacity
            style={{
              width: width * 0.85,
              height: height * 0.05,
              borderRadius: 10,
              backgroundColor: themeSettings?.thirdColor,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: height * 0.0225,
                fontWeight: '500',
                color: 'black',
              }}>
              Ürünleri güncelle
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeclinedOrderScreen;
