import {View, ScrollView, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import agent from '../../api/agent';
import {Store, StorePaginationParams} from './IMainScreen';
import {reduxstore} from '../../reduxstore/reduxstore';

import CustomText from '../../components/general/text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import StoryComponent from '../../components/mainScreen/StoryComponent';
import FastImage from 'react-native-fast-image';
import RestaurantListComponentV2 from '../../components/mainScreen/RestaurantListComponentV2';
import {Globals} from '../../globals';
import {useNavigate} from 'react-router-native';

export interface IPopularRestaurantListComponentProps {
  store: Store;
}

const MainScreen = memo(() => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const navigate = useNavigate();

  // GET STORES
  const [stores, setStores] = useState<Store[]>([]);
  useEffect(() => {
    const request: StorePaginationParams = {
      pageNumber: 1,
      pageSize: 50,
      x: 28.7688434,
      y: 36.8312021,
    };
    getNearByStores(request);
    return () => {};
  }, []);

  const getNearByStores = async (params: StorePaginationParams) => {
    let uriExtension = `?X=${params.x}&Y=${params.y}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}`;
    try {
      const response = await agent.Store.getNearByStores(uriExtension);
      setStores(response.stores);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: themeSettings?.mainBackgroundColor,
      }}>
      {/* ADDRESS BAR */}
      <TouchableOpacity onPress={() => navigate('/UserAddressesScreen')}>
        <View
          style={{
            marginTop: themeSettings?.marginVerticalLarge,
            marginBottom: themeSettings?.marginVerticalLarge,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'locate-outline'}
            color={'black'}
            size={height * 0.025}
            style={{
              marginRight: themeSettings?.marginHorizontalLarge,
            }}
          />
          <CustomText
            style={{
              marginRight: themeSettings?.marginHorizontalLarge,
              fontSize: themeSettings?.bodyFontSize,
            }}>
            Konum: Tunaboyu sokak 6/1
          </CustomText>
          <Icon
            name={'chevron-down-outline'}
            color={'black'}
            size={height * 0.025}
          />
        </View>
      </TouchableOpacity>

      <CustomText
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
          fontSize: themeSettings?.subHeaderFontSize,
          fontWeight: '700',
        }}>
        Öne Çıkanlar
      </CustomText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalLarge,
        }}>
        {stores ? (
          stores.map((item: Store) => {
            if (item.hasActiveStory) {
              return (
                <StoryComponent
                  key={item.id}
                  averageScore={
                    item.storeScore?.avarageScore
                      ? item.storeScore?.avarageScore
                      : 0
                  }
                  storeDistance={Math.round(item.distance)}
                  mealPrepTime={0}
                  storyText={'ben story attım'}
                  imageUrl={Globals.url.STOREIMAGEPATH + item.headerImageUrl}
                />
              );
            }
          })
        ) : (
          <></>
        )}

        <StoryComponent
          averageScore={4.8}
          storeDistance={15}
          mealPrepTime={45}
          storyText={'Taptaze yemekler burada'}
          imageUrl="https://images.unsplash.com/photo-1616669944447-d65d41a222bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2308&q=80"
        />

        <View
          style={{
            width: width * 0.4,
            height: height * 0.1625,
            backgroundColor: themeSettings?.cardBackgroundColor,
            borderRadius: 10,
            marginRight: themeSettings?.marginHorizontalLarge,
          }}>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.4,
              marginBottom: themeSettings?.marginVerticalSmall,
            }}>
            <FastImage
              style={{
                width: width * 0.4,
                height: height * 0.1,
                borderRadius: 10,
              }}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVqOAre1_VVTvzesZzmFGQyS6jF2Ec4_p6yg&usqp=CAU',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
          <CustomText
            style={{
              color: '#FF6584',
              fontSize: themeSettings?.subBodyFontSize,
            }}>
            3 siparişe 50 tl hediye
          </CustomText>
        </View>

        <StoryComponent
          averageScore={4.8}
          storeDistance={15}
          mealPrepTime={45}
          storyText={'Taptaze yemekler burada'}
          imageUrl="https://images.unsplash.com/photo-1541283014184-791fa57c0735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        />
      </ScrollView>

      <CustomText
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginBottom: themeSettings?.marginVerticalMedium,
          fontSize: themeSettings?.subHeaderFontSize,
          fontWeight: '700',
        }}>
        Popüler Restoranlar
      </CustomText>

      {stores ? (
        stores.map((item: Store) => {
          return <RestaurantListComponentV2 store={item} key={item.id} />;
        })
      ) : (
        <></>
      )}
    </ScrollView>
  );
});

export default MainScreen;
