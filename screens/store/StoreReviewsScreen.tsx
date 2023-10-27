import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {reduxstore} from '../../reduxstore/reduxstore';
import CustomText from '../../components/general/text/CustomText';
import FastImage from 'react-native-fast-image';
import StoreReviewComponent from '../../components/store/StoreReviewComponent';

const StoreReviewsScreen = () => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  return (
    <View
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: height * 0.025,
        }}>
        <Icon
          style={{
            zIndex: 300,
            color: 'black',
            backgroundColor: 'transparent',
            marginLeft: width * 0.02,
          }}
          name="arrow-back-outline"
          color="#B5B5B5"
          size={height * 0.04}
        />
        <CustomText>Yorumlar</CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeSettings?.thirdColor,
            height: height * 0.05,
            width: width * 0.2,
            padding: width * 0.02,
            borderRadius: 20,
          }}>
          <CustomText>Yardım</CustomText>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            width: '25%',
            height: '25%',
            borderRadius: 100,
            aspectRatio: 1,
          }}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            marginLeft: width * 0.05,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.03,
              fontWeight: '500',
              marginBottom: height * 0.0125,
            }}>
            Bilgehan's Steak House
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={'#FFB543'}
              size={height * 0.02}
            />
            <CustomText> 4.8</CustomText>
            <CustomText> (236)</CustomText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: height * 0.025,
          marginBottom: height * 0.0125,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.thirdColor,
        }}
      />

      <StoreReviewComponent
        reviewOwner={'Gordon Ramsay'}
        reviewDate={'19.04.2023'}
        reviewStarCount={4}
        reviewText={
          "There's enough garlic in here to kill every vampire in Europe."
        }
      />
      <StoreReviewComponent
        reviewOwner={'Belgin Kınalı'}
        reviewDate={'04.07.2023'}
        reviewStarCount={3}
        reviewText={'Lahmacun on numara'}
      />
      <StoreReviewComponent
        reviewOwner={'Yılmaz'}
        reviewDate={'19.04.2023'}
        reviewStarCount={5}
        reviewText={
          'Bu gece canımızı kurtarmak istiyorsak s*ke s*ke köfteci açacağız.'
        }
      />
      <StoreReviewComponent
        reviewOwner={'Gordon Ramsay'}
        reviewDate={'19.04.2023'}
        reviewStarCount={4}
        reviewText={
          "There's enough garlic in here to kill every vampire in Europe."
        }
      />
    </View>
  );
};

export default StoreReviewsScreen;
