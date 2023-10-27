import {View} from 'react-native';
import React from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import {useNavigate} from 'react-router-native';
import CustomText from '../../components/general/text/CustomText';
import FastImage from 'react-native-fast-image';
import {Globals} from '../../globals';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Store} from '../mainScreen/IMainScreen';

export interface IMapViewRestaurantComponent {
  store: Store;
  storeName: string;
  storeBio: string;
  headerImageUrl: string;
  distance: number;
  averageScore: number;
}

const MapViewRestaurantComponent = (props: IMapViewRestaurantComponent) => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const navigate = useNavigate();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: themeSettings?.marginVerticalLarge,
        left: width * 0.05,
        zIndex: 9999,
        height: height * 0.2,
        width: width * 0.9,
        // backgroundColor: themeSettings?.secondColor,
        borderRadius: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          // reduxstore.dispatch(setMainScreenSelectedStoreState(props.store));
          navigate(`/StoreScreen/${props.store.id}`);
        }}>
        <FastImage
          style={{
            height: height * 0.2,
            width: width * 0.9,
            borderRadius: 10,
            // backgroundColor: 'red',
          }}
          source={{
            uri: Globals.url.STOREIMAGEPATH + props.headerImageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeSettings?.cardBackgroundColor,
            height: height * 0.03,
            width: width * 0.15,
            //   marginLeft: themeSettings?.marginHorizontalLarge!,
            marginTop: themeSettings?.marginVerticalSmall!,
            zIndex: 999,
            borderRadius: 10,
          }}>
          <Icon
            name={'star'}
            color={themeSettings?.goldenColor}
            size={height * 0.025}
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
            }}
          />
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
              fontSize: themeSettings?.bodyFontSize,
            }}>
            {props.averageScore}
          </CustomText>
        </View>

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeSettings?.cardBackgroundColor,
            height: height * 0.03,
            width: width * 0.15,
            //   marginLeft: themeSettings?.marginHorizontalMedium!,
            marginTop: themeSettings?.marginVerticalLarge! * 2,
            zIndex: 999,
            borderRadius: 10,
          }}>
          <Icon
            name={'earth-outline'}
            color={'black'}
            size={height * 0.025}
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
            }}
          />
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalMedium,
              fontSize: themeSettings?.bodyFontSize,
            }}>
            {Math.round(props.distance)}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            backgroundColor: themeSettings?.secondColor,
            height: height * 0.05,
            width: width * 0.9,
            borderRadius: 10,
          }}>
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
              color: themeSettings?.thirdColor,
            }}>
            {props.storeName}
          </CustomText>
        </View>

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            bottom: height * 0.05,
            width: width * 0.65,
            height: height * 0.035,
            backgroundColor: themeSettings?.cardBackgroundColor,
            borderRadius: 10,
          }}>
          <CustomText
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            {props.storeBio}
          </CustomText>
        </View>

        <View
          style={{
            position: 'absolute',
            right: width * 0.02,
            bottom: height * 0.02,
            zIndex: 999,
          }}>
          <FastImage
            style={{
              width: width * 0.2,
              borderRadius: 60,
              aspectRatio: 1,
              backgroundColor: 'red',
            }}
            source={{
              uri: 'https://www.caesars.com/content/dam/empire/clv/restaurants/hells-kitchen/800x900/hellskitchen-gordonramsay-closeup-800x900.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MapViewRestaurantComponent;
