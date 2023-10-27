import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {ScrollView} from 'react-native-gesture-handler';
import CustomText from '../../../components/general/text/CustomText';
import FastImage from 'react-native-fast-image';
import {Globals} from '../../../globals';
import {BasketItemDto} from '../../../dtos/order/subClasses/basketItemDto';
import BasketItemOrderDetailComponent from '../../../components/basket/BasketItemOrderDetailComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigate} from 'react-router-native';
import {OrderStatusEnum} from '../../../dtos/order/enums/orderStatusEnum';
import {OrderOperationsRequestDto} from '../../../dtos/order/request/orderOperationsRequestDto';
import agent from '../../../api/agent';
import {DeliveryTypeEnum} from '../../../dtos/order/enums/deliveryTypeEnum';

const StorePastOrderDetailsScreen = () => {
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
    reduxstore.getState().StorePastOrderDetails.selectedOrder;
  const orderBasketProperties = selectedOrder?.basket.basketProperties;

  //   const [selectedStore, setSelectedStore] =
  //     useState<StoreOperationsResponseDto>();
  //   const selectedStoreImageUrl =
  //     Globals.url.STOREIMAGEPATH + selectedStore?.storeDtos[0].headerImageUrl;
  const storeAvatarImgUrl =
    Globals.url.STOREIMAGEPATH +
    reduxstore.getState().storeAccount.storeHeaderImageUrl;
  const avatarImageUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';
  /* ########## */

  /* METHODS */
  const handleAcceptOrder = async () => {
    const helperState = {
      ...reduxstore.getState().StorePastOrderDetails.selectedOrder!,
    };
    helperState.orderState!.orderStatus = OrderStatusEnum.Preparing;

    let reqObj: OrderOperationsRequestDto = {
      order: helperState,
      requestedOrderStatus: OrderStatusEnum.None,
      currentOrderStatus: OrderStatusEnum.Preparing,
    };
    await agent.Order.UpdateOrderState(reqObj);
  };

  /* ########## */

  /* HOOKS */
  //   useEffect(() => {
  //     handleGetStoreById(orderBasketProperties?.storeId!);
  //   }, []);
  /* ########## */

  return (
    <ScrollView
      /* PAGE CONTAINER */
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      {/* STORE INFO CONTAINER */}
      <View
        style={{
          marginTop: height * 0.0125,
          flexDirection: 'row',
          justifyContent: 'space-between',
          // alignItems: 'center',
        }}>
        <View>
          <CustomText
            style={{
              marginBottom: height * 0.00625,
              fontSize: height * 0.03,
              fontWeight: '700',
            }}>
            {orderBasketProperties?.shopperId.length! > 20
              ? orderBasketProperties?.shopperId.substring(0, 20) + '...'
              : orderBasketProperties?.shopperId}
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: width * 0.05,
            }}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={'#FFB543'}
              size={height * 0.02}
            />
            <CustomText>{' 0' + ' (No. Yorum)'}</CustomText>
          </View>
        </View>

        <FastImage
          style={{
            width: '25%',
            height: '25%',
            borderRadius: 100,
            aspectRatio: 1,
          }}
          source={{
            uri: storeAvatarImgUrl ?? avatarImageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View
        style={{
          marginTop: height * 0.025,
          marginBottom: height * 0.025,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      {/* ORDER DETAILS */}
      <View>
        <CustomText
          style={{
            fontSize: height * 0.025,
            fontWeight: '500',
            marginBottom: height * 0.0125,
          }}>
          Sipariş Özeti
        </CustomText>
        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: 'gray',
            }}>
            Teslimat Adresi
          </CustomText>
          <CustomText>To the moon baby</CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: height * 0.00125,
            }}
          />
        </View>

        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: 'gray',
            }}>
            Teslimat Zamanı
          </CustomText>
          <CustomText>{selectedOrder?.basket.orderTimeSlot}</CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: height * 0.00125,
            }}
          />
        </View>

        <View
          style={{
            marginBottom: height * 0.0125,
          }}>
          <CustomText
            style={{
              color: 'gray',
            }}>
            Teslimat Türü
          </CustomText>
          <CustomText>
            {selectedOrder?.basket.basketProperties.deliveryType ===
            DeliveryTypeEnum.HomeDelivery
              ? 'Adrese Teslimat'
              : 'Gel al'}
          </CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: height * 0.00125,
            }}
          />
        </View>

        <View
          style={{
            marginBottom: height * 0.025,
          }}>
          <CustomText
            style={{
              color: 'gray',
            }}>
            Teslimat Notu
          </CustomText>
          <CustomText>
            {selectedOrder?.basket.basketProperties.orderNote
              ? selectedOrder?.basket.basketProperties.orderNote
              : 'Teslimat notu bulunmamaktadır.'}
          </CustomText>
          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 1,
            }}
          />
        </View>

        {/* ORDER ITEMS */}
        {selectedOrder?.basket.basketItems &&
          selectedOrder.basket.basketItems.map((item: BasketItemDto, index) => {
            return (
              <BasketItemOrderDetailComponent key={index} basketItem={item} />
            );
          })}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText style={{fontWeight: '700', marginRight: width * 0.01}}>
              Paket Tutarı
            </CustomText>
            <CustomText>(Kdv dahil)</CustomText>
          </View>

          <View>
            <CustomText
              style={{
                fontWeight: '700',
              }}>
              {selectedOrder?.basket.basketProperties.totalPrice + ' '}
              <FontAwesome name="turkish-lira" color={'black'} />
            </CustomText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginBottom: height * 0.025,
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
            marginBottom: height * 0.025,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleAcceptOrder();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.85,
              height: height * 0.05,
              backgroundColor: themeSettings?.secondColor,
              borderRadius: 10,
            }}>
            <CustomText
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '500',
                color: themeSettings?.thirdColor,
              }}>
              Kabul et
            </CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate(`/StoreScreen/${orderBasketProperties?.storeId}`)
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * 0.85,
            height: height * 0.05,
            backgroundColor: themeSettings?.thirdColor,
            borderRadius: 10,
          }}>
          <CustomText
            style={{
              textAlign: 'center',
            }}>
            Reddet
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StorePastOrderDetailsScreen;
