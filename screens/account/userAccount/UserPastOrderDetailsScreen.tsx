import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '../../../components/general/text/CustomText';
import {Globals} from '../../../globals';
import agent from '../../../api/agent';
import {StoreOperationsResponseDto} from '../../../dtos/store/response/storeOperationsResponseDto';
import {BasketItemDto} from '../../../dtos/order/subClasses/basketItemDto';
import BasketItemOrderDetailComponent from '../../../components/basket/BasketItemOrderDetailComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigate} from 'react-router-native';
import {setBasketItems, setBasketProperties} from '../../basket/basketSlice';
import {DeliveryTypeEnum} from '../../../dtos/order/enums/deliveryTypeEnum';

const UserPastOrderDetailsScreen = () => {
  /* APP SETTINGS */
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const navigate = useNavigate();
  /* ########## */

  /* PAGE-STATE VARIABLES */
  const selectedOrder =
    reduxstore.getState().UserPastOrderDetails.selectedOrder;
  const orderBasketProperties = selectedOrder?.basket.basketProperties;

  const [selectedStore, setSelectedStore] =
    useState<StoreOperationsResponseDto>();
  const selectedStoreImageUrl =
    Globals.url.STOREIMAGEPATH + selectedStore?.storeDtos[0].headerImageUrl;
  const avatarImageUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';
  /* ########## */

  /* METHODS */
  const handleGetStoreById = async (storeId: string) => {
    const store = await agent.Store.getStoreById(storeId);
    setSelectedStore(store);
  };
  /* ########## */

  useEffect(() => {
    handleGetStoreById(orderBasketProperties?.storeId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      /* PAGE CONTAINER */
      style={{
        backgroundColor: themeSettings?.mainBackgroundColor,
      }}>
      {/* STORE INFO CONTAINER */}
      <View
        style={{
          backgroundColor: themeSettings?.cardBackgroundColor,
          marginTop: themeSettings?.marginVerticalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          marginLeft: themeSettings?.marginHorizontalLarge,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: themeSettings?.secondColor,
        }}>
        <View
          style={{
            marginLeft: themeSettings?.marginHorizontalMedium,
          }}>
          <CustomText
            style={{
              fontSize: themeSettings?.headerFontSize,
              fontWeight: '700',
              marginBottom: themeSettings?.marginHorizontalSmall,
            }}>
            {orderBasketProperties?.storeName}
          </CustomText>
          <CustomText
            style={{
              fontWeight: '500',
              fontSize: themeSettings?.bodyFontSize,
              marginBottom: themeSettings?.marginHorizontalSmall,
            }}>
            {selectedStore?.storeDtos[0].bio1}
          </CustomText>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: themeSettings?.marginVerticalSmall,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: themeSettings?.marginHorizontalMedium,
                }}>
                <Icon
                  style={{marginRight: themeSettings?.marginHorizontalSmall}}
                  name={true ? 'star-sharp' : 'star-sharp'}
                  color={themeSettings?.goldenColor}
                  size={height * 0.02}
                />
                <CustomText>
                  4.8 (0)
                  {/* {selectedStore?.storeDtos[0].storeScore?.avarageScore +
                    '  (48)'} */}
                </CustomText>
              </View>
              <CustomText style={{marginRight: width * 0.02, color: '#0f3433'}}>
                {selectedStore?.storeDtos[0].distance + ' km'}
              </CustomText>
            </View>

            <CustomText
              style={{
                marginBottom: height * 0.0125,
                color: '#001e1d',
              }}>
              alice harikalar diyarında
              {/* {selectedStore?.storeDtos[0].addressText} */}
            </CustomText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: themeSettings?.marginVerticalLarge,
          marginBottom: themeSettings?.marginVerticalLarge,
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      {/* ORDER DETAILS */}
      <View>
        <CustomText
          style={{
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            fontSize: themeSettings?.subHeaderFontSize,
            fontWeight: '500',
            marginBottom: themeSettings?.marginVerticalMedium,
          }}>
          Sipariş Özeti
        </CustomText>

        {/* DELIVERY ADDRESS */}
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
            name={'location-outline'}
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
              Teslimat Adresi:
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              tunaboyu sok. şimşek apartmanı no 6/1
            </CustomText>
          </View>
        </View>

        {/* DELIVERY TYPE */}
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
            name={'car-outline'}
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
              Teslimat Türü:
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              {selectedOrder?.basket.basketProperties.deliveryType ===
              DeliveryTypeEnum.HomeDelivery
                ? 'Adrese Teslimat'
                : 'Gel al'}
            </CustomText>
          </View>
        </View>

        {/* DELIVERY NOTE */}
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
            name={'reader-outline'}
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
              Teslimat Notu:
            </CustomText>
            <CustomText
              style={{
                fontSize: themeSettings?.subBodyFontSize,
                height: height * 0.03,
                padding: 0,
                marginTop: 0,
              }}>
              {selectedOrder?.basket.basketProperties.orderNote
                ? selectedOrder?.basket.basketProperties.orderNote
                : 'Teslimat notunuz bulunmamaktadır.'}
            </CustomText>
          </View>
        </View>

        <View
          style={{
            marginTop: themeSettings?.marginVerticalLarge,
            marginBottom: themeSettings?.marginVerticalLarge,
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            borderBottomWidth: height * 0.0025,
            borderColor: themeSettings?.secondColor,
          }}
        />

        <CustomText
          style={{
            marginLeft: themeSettings?.marginHorizontalLarge,
            marginRight: themeSettings?.marginHorizontalLarge,
            fontSize: themeSettings?.subHeaderFontSize,
            fontWeight: '500',
            marginBottom: themeSettings?.marginVerticalMedium,
          }}>
          Sepet Detayları
        </CustomText>

        {/* ORDER ITEMS */}
        {selectedOrder?.basket.basketItems &&
          selectedOrder.basket.basketItems.map((item: BasketItemDto, index) => {
            return (
              <BasketItemOrderDetailComponent key={index} basketItem={item} />
            );
          })}

        <View
          style={{
            marginLeft: width * 0.025,
            marginRight: width * 0.025,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText
              style={{
                fontWeight: '700',
                marginRight: width * 0.01,
                color: '#001e1d',
              }}>
              Paket Tutarı
            </CustomText>
            <CustomText
              style={{
                color: '#0f3433',
              }}>
              (Kdv dahil)
            </CustomText>
          </View>

          <View>
            <CustomText
              style={{
                fontWeight: '700',
                color: '#001e1d',
              }}>
              {selectedOrder?.basket.basketProperties.totalPrice + ' '}
              <FontAwesome name="turkish-lira" color={'#001e1d'} />
            </CustomText>
          </View>
        </View>

        {/* RECEIPT */}
        <TouchableOpacity
          style={{
            marginBottom: height * 0.025,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: themeSettings?.marginHorizontalLarge,
            }}>
            <Icon name="receipt-outline" color={'black'} />
            <CustomText
              style={{
                color: 'black',
              }}>
              {' ' + 'Faturayı Gör'}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: themeSettings?.marginVerticalLarge,
          marginBottom: themeSettings?.marginVerticalLarge,
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      <CustomText
        style={{
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          fontSize: themeSettings?.subHeaderFontSize,
          fontWeight: '500',
          marginBottom: themeSettings?.marginVerticalMedium,
        }}>
        Ödeme Yöntemi
      </CustomText>

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
            Maaş Kartı
          </CustomText>
          <CustomText
            style={{
              fontSize: themeSettings?.subBodyFontSize,
              height: height * 0.03,
              padding: 0,
              marginTop: 0,
            }}>
            12345678912
          </CustomText>
        </View>
      </View>

      <View
        style={{
          marginTop: themeSettings?.marginVerticalLarge,
          marginBottom: themeSettings?.marginVerticalLarge,
          marginLeft: themeSettings?.marginHorizontalLarge,
          marginRight: themeSettings?.marginHorizontalLarge,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      {/* BUTTONS */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: width * 0.9,
            marginBottom: themeSettings?.marginVerticalLarge,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigate(`/UserAddReviewScreen/${selectedOrder?.id}`)
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.4,
              height: height * 0.05,
              backgroundColor: themeSettings?.secondColor,
              borderRadius: 10,
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'white',
                // fontWeight: '500',
              }}>
              Siparişi Değerlendir
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const basket = {...reduxstore.getState().basketState.basket};
              basket.basketItems = selectedOrder?.basket.basketItems!;
              basket.basketProperties = selectedOrder?.basket.basketProperties!;
              reduxstore.dispatch(setBasketItems(basket.basketItems));
              reduxstore.dispatch(setBasketProperties(basket.basketProperties));
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.4,
              height: height * 0.05,
              backgroundColor: themeSettings?.secondColor,
              borderRadius: 10,
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                color: 'white',
              }}>
              Siparişi Tekrarla
            </CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate(`/StoreScreen/${orderBasketProperties?.storeId}`)
          }
          style={{
            marginBottom: themeSettings?.marginVerticalLarge,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * 0.85,
            height: height * 0.05,
            backgroundColor: '#e8e4e6',
            borderRadius: 10,
          }}>
          <CustomText
            style={{
              textAlign: 'center',
              color: '#001e1d',
            }}>
            Mutfağa git
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserPastOrderDetailsScreen;
