import React, {memo} from 'react';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {useNavigate} from 'react-router-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../../../components/general/text/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const UserAccountScreen = memo(() => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const userState = reduxstore.getState().userAccount.user;

  const navigate = useNavigate();
  return (
    <GestureHandlerScrollView
      style={{
        backgroundColor: themeSettings?.mainBackgroundColor,
      }}
      // contentContainerStyle={{...setAllWidths(width)}}
    >
      {/* HEADER AREA */}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          height: height * 0.27,
          backgroundColor: themeSettings?.secondColor,
        }}>
        <FastImage
          style={{
            marginTop: themeSettings?.marginVerticalLarge,
            width: width * 0.25,
            borderRadius: 60,
            aspectRatio: 1,
          }}
          source={{
            uri: 'https://www.caesars.com/content/dam/empire/clv/restaurants/hells-kitchen/800x900/hellskitchen-gordonramsay-closeup-800x900.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />

        <CustomText
          style={{
            fontSize: themeSettings?.headerFontSize,
            color: 'white',
            // marginBottom: themeSettings?.marginVerticalMedium,
          }}>
          {userState?.userName}
        </CustomText>

        <CustomText
          style={{
            fontSize: themeSettings?.bodyFontSize,
            color: 'white',
          }}>
          {userState?.email}
        </CustomText>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: themeSettings?.mainBackgroundColor,
            height: height * 0.02,
            width: width,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>

      {/* SETTINGS AREA */}

      {/* ORDERS */}
      <TouchableOpacity onPress={() => navigate('/UserPastOrdersListScreen')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'pizza-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Siparişlerim
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Geçmiş siparişleriniz
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* USER REVIEWS */}
      {/* kullanıcı yorumları sayfası yap */}
      <TouchableOpacity onPress={() => navigate('/StoreReviewsScreen')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'chatbubble-ellipses-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Kullanıcı Yorumlarım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Sipariş verdiğiniz restoranların sizin hakkındaki düşünceleri
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* FAVORITE STORES */}
      <TouchableOpacity onPress={() => navigate('/FavouriteStoresScreen')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'heart-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Favori Aşçılarım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              En sevdiğiniz satıcılara ulaşın
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* PAYMENT METHODS */}
      <TouchableOpacity onPress={() => console.log('Ödeme metodlarım')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'card-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Ödeme Metodlarım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Ödeme yöntemlerinizi yönetin
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* INVITE YOUR FRIENDS */}
      <TouchableOpacity onPress={() => console.log('Arkadaşlarını davet et')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'people-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Arkadaşlarını Davet Et
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Arkadaşlarınızı davet edin, hediyeler kazanın
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* STORE ACCOUNT */}
      <TouchableOpacity
        onPress={() => {
          const hasStoreAccount =
            reduxstore.getState().userAccount.user?.hasStoreAccount;
          if (!hasStoreAccount) {
            navigate('/NewStoreAccountScreen');
          } else {
            navigate('/StoreAccountScreen');
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'home-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Mutfak Hesabım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Mutfak hesabınızı yönetin
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* ACCOUNT SETTINGS */}
      <TouchableOpacity
        onPress={() => {
          navigate('/UserAccountSettingsScreen2');
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.cardBackgroundColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'settings-outline'}
            color={themeSettings?.secondColor}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Profil Ayarlarım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Profil ayarlarınızı değiştirin
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      {/* HELP */}
      <TouchableOpacity
        onPress={() => {
          console.log('Yardım');
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            marginBottom: themeSettings?.marginVerticalMedium,
            backgroundColor: themeSettings?.secondColor,
            width: width * 0.95,
            height: height * 0.075,
            borderRadius: 10,
          }}>
          <Icon
            name={'headset-outline'}
            color={'black'}
            size={height * 0.03}
            style={{
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: themeSettings?.marginHorizontalLarge,
            }}>
            <CustomText
              style={{
                fontSize: themeSettings?.bodyFontSize,
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              Yardım
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                // backgroundColor: 'red',
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              Bir sorun mu yaşıyorsunuz? Bize ulaşın
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </GestureHandlerScrollView>
  );
});

export default UserAccountScreen;
