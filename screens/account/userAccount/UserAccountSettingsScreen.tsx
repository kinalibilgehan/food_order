import {View} from 'react-native';
import React from 'react';
import CustomText from '../../../components/general/text/CustomText';
import {reduxstore} from '../../../reduxstore/reduxstore';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const UserAccountSettingsScreen = () => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const profileImg = reduxstore.getState().userAccount.user?.avatarImageUrl;

  const userState = reduxstore.getState().userAccount.user;

  return (
    // PAGE-CONTAINER
    <View
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      {/* USER INFO CONTAINER */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: height * 0.2,
          width: width * 0.95,
          // marginBottom: height * 0.0125,
          // backgroundColor: themeSettings?.secondColor,
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
          resizeMode={FastImage.resizeMode.contain}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: width * 0.04,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.025,
              fontWeight: '700',
              marginBottom: height * 0.0125,
            }}>
            İSİM SOYİSİM
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
              style={{
                marginRight: width * 0.03,
              }}
            />
            <CustomText>(Yorum sayısı)</CustomText>
          </View>
        </View>
        <View>
          <Icon
            name={true ? 'create-outline' : 'create-outline'}
            color={'#FFB543'}
            size={height * 0.05}
            style={{
              marginLeft: width * 0.25,
              marginBottom: height * 0.075,
            }}
          />
        </View>
      </View>

      <View
        style={{
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      {/* user name */}
      <View>
        <CustomText
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
            fontWeight: '700',
          }}>
          Kullanıcı Adı
        </CustomText>
        <CustomText
          style={{
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
          }}>
          {userState?.userName}
        </CustomText>
        <View
          style={{
            borderBottomWidth: height * 0.0025,
            borderColor: themeSettings?.thirdColor,
          }}
        />
      </View>

      {/* e-mail */}
      <View>
        <CustomText
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
            fontWeight: '700',
          }}>
          E-mail Adresi
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.02,
            }}>
            {userState?.email}
          </CustomText>
          {/* IF E-MAIL IS CONFIRMED */}
          {userState?.emailConfirmed && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: width * 0.03,
                backgroundColor: themeSettings?.secondColor,
                paddingHorizontal: width * 0.03,
                borderRadius: 20,
              }}>
              <Icon
                name={true ? 'checkmark-outline' : 'checkmark-outline'}
                color={'white'}
                size={height * 0.03}
                style={{}}
              />
              <CustomText
                style={{
                  color: 'white',
                  fontSize: height * 0.02,
                }}>
                Onaylanmış
              </CustomText>
            </View>
          )}

          {/* IF E-MAIL IS NOT COMFIRMED */}
          {!userState?.emailConfirmed && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: width * 0.03,
                backgroundColor: 'red',
                paddingHorizontal: width * 0.03,
                borderRadius: 20,
              }}>
              <Icon
                name={true ? 'close-outline' : 'close-outline'}
                color={'white'}
                size={height * 0.03}
                style={{}}
              />
              <CustomText
                style={{
                  color: 'white',
                  fontSize: height * 0.02,
                }}>
                Onaylanmamış
              </CustomText>
            </View>
          )}
        </View>
        <View
          style={{
            borderBottomWidth: height * 0.0025,
            borderColor: themeSettings?.thirdColor,
          }}
        />
      </View>

      {/* Phone Number */}
      <View>
        <CustomText
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
            fontWeight: '700',
          }}>
          Telefon Numarası
        </CustomText>
        {/* <CustomTextInput placeholder="+90 555 444 33 22" /> */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: height * 0.0125,
            // alignItems: 'center',
          }}>
          <CustomText
            style={{
              fontSize: height * 0.02,
            }}>
            {userState?.phoneNumber}
          </CustomText>
          {/* IF PHONE NUMBER IS CONFIRMED */}
          {userState?.phoneNumberConfirmed && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: width * 0.03,
                backgroundColor: themeSettings?.secondColor,
                paddingHorizontal: width * 0.03,
                borderRadius: 20,
              }}>
              <Icon
                name={true ? 'checkmark-outline' : 'checkmark-outline'}
                color={'white'}
                size={height * 0.03}
                style={{}}
              />
              <CustomText
                style={{
                  color: 'white',
                  fontSize: height * 0.02,
                }}>
                Onaylanmış
              </CustomText>
            </View>
          )}

          {/* IF PHONE NUMBER IS NOT COMFIRMED */}
          {!userState?.phoneNumberConfirmed && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: width * 0.03,
                backgroundColor: 'red',
                paddingHorizontal: width * 0.03,
                borderRadius: 20,
              }}>
              <Icon
                name={true ? 'close-outline' : 'close-outline'}
                color={'white'}
                size={height * 0.03}
                style={{}}
              />
              <CustomText
                style={{
                  color: 'white',
                  fontSize: height * 0.02,
                }}>
                Onaylanmamış
              </CustomText>
            </View>
          )}
        </View>
        <View
          style={{
            borderBottomWidth: height * 0.0025,
            borderColor: themeSettings?.thirdColor,
          }}
        />
      </View>
      <View>
        <CustomText
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
            fontWeight: '700',
          }}>
          Doğum Tarihi
        </CustomText>
        <CustomText
          style={{
            marginBottom: height * 0.0125,
            fontSize: height * 0.02,
          }}>
          09/06/1997
        </CustomText>
        {/* <CustomTextInput placeholder="06/09/1997" /> */}
        <View
          style={{
            borderBottomWidth: height * 0.0025,
            borderColor: themeSettings?.thirdColor,
          }}
        />
      </View>
      <View>
        <TouchableOpacity>
          <CustomText
            style={{
              fontSize: height * 0.02,
              fontWeight: '700',
              marginTop: height * 0.025,
              marginBottom: height * 0.025,
            }}>
            Adreslerim
          </CustomText>
          <View
            style={{
              borderBottomWidth: height * 0.0025,
              borderColor: themeSettings?.thirdColor,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAccountSettingsScreen;
