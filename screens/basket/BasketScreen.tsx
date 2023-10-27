import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import SwitchButton1, {
  SwitchButton1SelectedOptionEnum,
} from '../../components/buttons/switches/SwitchButton1';
import CustomText from '../../components/general/text/CustomText';
import CustomTextInput from '../../components/general/text/CustomTextInput';
import StandardButton from '../../components/buttons/StandardButton';
import {ScrollView} from 'react-native-gesture-handler';
import BasketItemComponent from '../../components/basket/BasketItemComponent';
import {useAppSelector} from '../../reduxstore/reduxhooks';
import {
  resetBasket,
  setBasketAvailableWorkingDayTimeSlotsAll,
  setBasketAvailableWorkingDayTimeSlotsWithCourrier,
  setBasketId,
  setBasketItems,
  setBasketProperties,
} from './basketSlice';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {OSType} from '../start/targetEnvironmentSlice';
import {useNavigate} from 'react-router-native';
import agent from '../../api/agent';
import {
  StorePropertiesResponseDto,
  WorkingDayTimeSlotResponseDto,
} from '../account/storeAccount/IStoreAccount';
import Icon from 'react-native-vector-icons/Ionicons';
import DropdownList, {
  ICustomDropdownOption,
} from '../../components/general/dropdown/DropdownList';
import {DateToString} from '../../helperFunctions/basic/basicFunctions';
import {
  ModalTypeEnum,
  setCustomModalModalResultState,
} from '../../components/general/modals/customModalComponentSlice';
import FastImage from 'react-native-fast-image';
import {Globals} from '../../globals';
import {BasketItemDto} from '../../dtos/order/subClasses/basketItemDto';
import {OrderStatusEnum} from '../../dtos/order/enums/orderStatusEnum';
import {OrderDto} from '../../dtos/order/subClasses/orderDto';
import {OrderOperationsRequestDto} from '../../dtos/order/request/orderOperationsRequestDto';
import {OrderOperationsResponseDto} from '../../dtos/order/response/orderOperationsResponseDto';
import {RequestOwnerTypeEnum} from '../../dtos/order/enums/requestOwnerTypeEnum';
import {DeliveryTypeEnum} from '../../dtos/order/enums/deliveryTypeEnum';

const BasketScreen = memo(() => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  let totalPrice = 0;
  const basketItemsState = useAppSelector(
    data => data.basketState.basket.basketItems,
  );
  const basketPropertiesState = useAppSelector(
    data => data.basketState.basket.basketProperties,
  );

  const selectedRestaurantState = useAppSelector(
    data => data.mainScreen.selectedStore?.name,
  );

  const [isDayDropDownOpen, setIsDayDropDownOpen] = useState(false);
  const [isHourDropDownOpen, setIsHourDropDownOpen] = useState(false);

  const navigate = useNavigate();

  const [timeSlotsDayDropdownData, setTimeSlotsDayDropdownData] = useState<
    ICustomDropdownOption[]
  >([]);
  const [
    timeSlotsDayDropdownCurrentValue,
    setTimeSlotsDayDropdownCurrentValue,
  ] = useState<string>('');

  const [timeSlotsHourDropdownData, setTimeSlotsHourDropdownData] = useState<
    ICustomDropdownOption[]
  >([]);
  const [
    timeSlotsHourDropdownCurrentValue,
    setTimeSlotsHourDropdownCurrentValue,
  ] = useState<string>('');

  //#region mapprops
  const [region, setRegion] = useState<Region>({
    latitude: 26,
    longitude: 32,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerLocation, setMarkerLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [markerLocationStore, setMarkerLocationStore] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const handleCreateOrUpdateOrder = async (
    body: OrderOperationsRequestDto,
  ): Promise<OrderOperationsResponseDto> => {
    const resp = await agent.Order.CreateOrUpdateOrder(body);
    console.log(resp);
    return resp;
  };

  useEffect(() => {
    Geolocation.requestAuthorization(() => {});
    if (Platform.OS === OSType.ANDROID) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])
        .then(() => {})
        .catch(() => {});
    }
    Geolocation.getCurrentPosition((info: GeolocationResponse) => {
      let currentLocation: LatLng = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      };
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setMarkerLocation(currentLocation);
    });

    const getBasket = async () => {
      let basket = {...reduxstore.getState().basketState.basket};
      if (!basket.basketProperties.storeId) {
        const basketResponse = await agent.Order.GetBasket();
        if (basketResponse.basket) {
          reduxstore.dispatch(
            setBasketProperties(basketResponse.basket.basketProperties),
          );
          reduxstore.dispatch(
            setBasketItems(basketResponse.basket.basketItems),
          );
          console.log(basketResponse.basket.basketItems);

          reduxstore.dispatch(setBasketId(basketResponse.basket.id));
        }
      }
    };
    getBasket();
    // createOrUpdateBasket();

    // setInterval(createOrUpdateBasket, 5000);

    return () => {};
  }, []);
  //#endregion mapprops

  useEffect(() => {
    const getStoreProperties = async () => {
      if (!basketPropertiesState.storeId) {
        return;
      }
      let helperBasketPropertiesState = {
        ...reduxstore.getState().basketState.basket.basketProperties,
      };
      const response: StorePropertiesResponseDto =
        await agent.Store.getStorePropertiesNew(basketPropertiesState.storeId);
      helperBasketPropertiesState.storeName = response.name;
      helperBasketPropertiesState.location = response.location;
      let availableWorkingDayTimeSlotsAll =
        response.availableWorkingDayTimeSlots.filter(
          item => item.timeSlotsWithCourrier.length > 0,
        );
      let availableWorkingDayTimeSlotsWithCourrier =
        response.availableWorkingDayTimeSlots;
      availableWorkingDayTimeSlotsWithCourrier =
        availableWorkingDayTimeSlotsWithCourrier.filter(
          item =>
            item.timeSlotsWithCourrier.length > 0 &&
            item.timeSlotsWithCourrier.some(x => x.hasCourrierService),
        );
      reduxstore.dispatch(setBasketProperties(helperBasketPropertiesState));
      reduxstore.dispatch(
        setBasketAvailableWorkingDayTimeSlotsAll(
          availableWorkingDayTimeSlotsAll,
        ),
      );
      reduxstore.dispatch(
        setBasketAvailableWorkingDayTimeSlotsWithCourrier(
          availableWorkingDayTimeSlotsWithCourrier,
        ),
      );
      setMarkerLocationStore({
        latitude: helperBasketPropertiesState.location.y!,
        longitude: helperBasketPropertiesState.location.x!,
      });
      arrangeDropDownDatas();
    };
    getStoreProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketPropertiesState.deliveryType]);

  const setEmptySlots = () => {
    setTimeSlotsDayDropdownData([]);
    setTimeSlotsDayDropdownCurrentValue('');
    setTimeSlotsHourDropdownData([]);
    setTimeSlotsHourDropdownCurrentValue('');
    setIsDayDropDownOpen(false);
    setIsHourDropDownOpen(false);
  };

  const arrangeDropDownDatas = () => {
    let timeSlotsHelperArr: WorkingDayTimeSlotResponseDto[] | undefined = [];
    if (
      reduxstore.getState().basketState.basket.basketProperties.deliveryType ===
      DeliveryTypeEnum.HomeDelivery
    ) {
      timeSlotsHelperArr = [
        ...reduxstore.getState().basketState
          .availableWorkingDayTimeSlotsWithCourrier,
      ];
    } else {
      timeSlotsHelperArr = [
        ...reduxstore.getState().basketState.availableWorkingDayTimeSlotsAll,
      ];
    }
    if (timeSlotsHelperArr && timeSlotsHelperArr.length > 0) {
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let helperArrDays: ICustomDropdownOption[] = [];
      timeSlotsHelperArr.forEach(element => {
        let label = '';
        if (new Date(element.dayDate).getDate() === today.getDate()) {
          label = 'Bugün';
        } else if (new Date(element.dayDate).getDate() === tomorrow.getDate()) {
          label = 'Yarın';
        } else {
          label = DateToString(new Date(element.dayDate));
        }
        helperArrDays.push({
          label: label,
          value: {dayName: element.dayName, dayDate: element.dayDate},
        });
      });
      setTimeSlotsDayDropdownData(helperArrDays);
      setTimeSlotsDayDropdownCurrentValue(helperArrDays[0].label);
      arrangeHourDropDownDataAfterDayChange(helperArrDays[0]);
    } else {
      setEmptySlots();
    }
  };

  const arrangeHourDropDownDataAfterDayChange = (
    selectedDayData: ICustomDropdownOption,
  ) => {
    let helperArrHours: ICustomDropdownOption[] = [];
    reduxstore
      .getState()
      .basketState.availableWorkingDayTimeSlotsAll.find(
        awdts => awdts.dayName === selectedDayData.value.dayName,
      )!
      .timeSlotsWithCourrier.forEach(element => {
        helperArrHours.push({
          label: element.timeSlot.slice(0, -3),
          value: element,
        });
      });
    setTimeSlotsHourDropdownData(helperArrHours);
    setTimeSlotsHourDropdownCurrentValue(helperArrHours[0].label);
  };

  return (
    <ScrollView>
      {basketPropertiesState.storeId && (
        <View
          style={{
            marginLeft: width * 0.025,
            marginRight: width * 0.025,
          }}>
          {basketPropertiesState.deliveryType === DeliveryTypeEnum.TakeAway && (
            <View
              style={{
                height: (height * 4) / 20,
                marginBottom: height * 0.0125,
              }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                zoomControlEnabled
                region={region}
                style={{
                  width: width * 0.95,
                  height: '100%',
                }}
                onPress={e => {
                  console.log(e.nativeEvent.coordinate);
                }}>
                {
                  <>
                    <Marker coordinate={markerLocation} />
                    <Marker coordinate={markerLocationStore} />
                  </>
                }
                {false && (
                  <Text style={{position: 'absolute', top: 0}}>AHMET</Text>
                )}
              </MapView>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: height * 0.02,
            }}>
            <SwitchButton1
              option1="Adrese Teslim"
              option2="Gel Al"
              buttonWidth={width * 0.75}
              selectedOption={
                reduxstore.getState().basketState.basket.basketProperties
                  .deliveryType === DeliveryTypeEnum.HomeDelivery
                  ? SwitchButton1SelectedOptionEnum.Option1
                  : SwitchButton1SelectedOptionEnum.Option2
              }
              onSelectedOptionChange={e => {
                clearTimeout(
                  reduxstore.getState().basketState.updateBasketTimeoutId,
                );
                let helperState = {
                  ...reduxstore.getState().basketState.basket.basketProperties,
                };
                if (e === SwitchButton1SelectedOptionEnum.Option1) {
                  helperState.deliveryType = DeliveryTypeEnum.HomeDelivery;
                } else {
                  helperState.deliveryType = DeliveryTypeEnum.TakeAway;
                }
                reduxstore.dispatch(setBasketProperties(helperState));
              }}
            />
          </View>

          <View>
            <CustomText
              style={{
                fontSize: (height * 0.7) / 20,
                fontWeight: '700',
                marginBottom: height * 0.0125,
              }}>
              {basketPropertiesState.storeName}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              zIndex: 999,
            }}>
            <View>
              <CustomText>Teslimat Zamanı:</CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                zIndex: 999,
              }}>
              {timeSlotsDayDropdownCurrentValue !== '' && (
                <>
                  <DropdownList
                    style={{marginRight: 5}}
                    options={timeSlotsDayDropdownData}
                    onSelect={option => {
                      arrangeHourDropDownDataAfterDayChange(option);
                    }}
                    maxDropdownHeight={200}
                    showSearch={false}
                    buttonWidth={width * 0.95 * 0.25}
                    buttonHeight={25}
                    defaultValue={timeSlotsDayDropdownCurrentValue}
                    isDropDownOpen={isDayDropDownOpen}
                    handleDropDownOpen={() => {
                      setIsDayDropDownOpen(true);
                      setIsHourDropDownOpen(false);
                    }}
                    handleDropDownClose={() => {
                      setIsDayDropDownOpen(false);
                    }}
                  />
                  <DropdownList
                    options={timeSlotsHourDropdownData}
                    onSelect={option => {
                      setTimeSlotsHourDropdownCurrentValue(option.label);
                    }}
                    maxDropdownHeight={200}
                    showSearch={false}
                    buttonWidth={width * 0.95 * 0.2}
                    buttonHeight={25}
                    defaultValue={timeSlotsHourDropdownCurrentValue}
                    isDropDownOpen={isHourDropDownOpen}
                    handleDropDownOpen={() => {
                      setIsHourDropDownOpen(true);
                      setIsDayDropDownOpen(false);
                    }}
                    handleDropDownClose={() => {
                      setIsHourDropDownOpen(false);
                    }}
                  />
                </>
              )}
              {timeSlotsDayDropdownCurrentValue === '' && (
                <View>
                  <CustomText style={{color: 'red'}}>
                    Uygun Zaman Aralığı Yok
                  </CustomText>
                </View>
              )}
            </View>
            <View>
              <Icon
                name={'pencil-outline'}
                color={'black'}
                size={height * 0.0214}
              />
            </View>
          </View>

          <View>
            <CustomText
              style={{
                fontSize: (height * 0.55) / 20,
                fontWeight: '700',
              }}>
              Sipariş Detayları
            </CustomText>
          </View>
          {basketItemsState.map((basketitem: BasketItemDto) => {
            totalPrice =
              totalPrice + basketitem.price * basketitem.orderQuantity;
            return (
              <BasketItemComponent
                key={basketitem.storeProductId}
                basketItem={basketitem}
              />
            );
          })}

          <CustomTextInput
            multiline={true}
            style={{
              minHeight: (height * 0.8) / 10,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: width * 0.0025,
              borderRadius: 7,
              marginTop: height * 0.0125,
              marginBottom: height * 0.0125,
              paddingLeft: height * 0.015,
              paddingTop: height * 0.015,
            }}
            placeholder="Sipariş notunuzu buraya yazabilirsiniz"
            editable={!isHourDropDownOpen && !isDayDropDownOpen}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: height * 0.0125,
            }}>
            <CustomText>Ara toplam</CustomText>
            <CustomText>
              {Math.round(basketPropertiesState.totalPrice! * 100) / 100}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: height * 0.0125,
            }}>
            <CustomText>Gönderim Ücreti</CustomText>
            <CustomText>Ücretsiz</CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: height * 0.0125,
            }}>
            <CustomText>İndirim</CustomText>
            <CustomText>0</CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: height * 0.0125,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CustomText
                style={{fontWeight: '700', marginRight: width * 0.01}}>
                Paket Tutarı
              </CustomText>
              <CustomText>(Kdv dahil)</CustomText>
            </View>
            <CustomText
              style={{
                fontWeight: '700',
              }}>
              {Math.round(basketPropertiesState.totalPrice! * 100) / 100}
            </CustomText>
          </View>

          <View
            style={{
              borderBottomColor: themeSettings?.thirdColor,
              borderBottomWidth: 1,
              marginBottom: height * 0.0125,
            }}
          />

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View style={{marginBottom: height * 0.0125}}>
              <StandardButton
                onPress={() => {
                  clearTimeout(
                    reduxstore.getState().basketState.updateBasketTimeoutId,
                  );
                  let helHelperModalState = {
                    ...reduxstore.getState().customModalComponent.modalResult,
                  };
                  let basketState = reduxstore.getState().basketState.basket;
                  const helperOrderDto: OrderDto = {
                    basket: basketState,
                  };
                  const reqObj: OrderOperationsRequestDto = {
                    order: helperOrderDto,
                    requestOwnerType: RequestOwnerTypeEnum.Shopper,
                    requestedOrderStatus: OrderStatusEnum.Created,
                    currentOrderStatus: OrderStatusEnum.None,
                  };
                  // SUCCESS
                  setTimeout(() => {
                    helHelperModalState.showModal = true;
                    helHelperModalState.modalType =
                      ModalTypeEnum.ConfirmationModal;
                    helHelperModalState.modalHeaderText = 'Tebrikler';
                    helHelperModalState.modalText =
                      'Siparişinizi başarı ile oluşturdunuz';
                    reduxstore.dispatch(
                      setCustomModalModalResultState(helHelperModalState),
                    );
                    handleCreateOrUpdateOrder(reqObj);
                    reduxstore.dispatch(resetBasket());
                  }, 1000);

                  // FAİL
                  // setTimeout(() => {
                  //   helHelperModalState.showModal = true;
                  //   helHelperModalState.modalType =
                  //     ModalTypeEnum.ErrorModal;
                  //   helHelperModalState.modalHeaderText = 'Ups :(';
                  //   helHelperModalState.modalText =
                  //     'Siparişinizi verirken hata ile karşılaştık';
                  //   reduxstore.dispatch(
                  //     setCustomModalModalResultState(helHelperModalState),
                  //   );
                  //   helperUserAccountState.pastOrders =
                  //     helperBasketItemsState;
                  //   reduxstore.dispatch(
                  //     setUserAccountState(helperUserAccountState),
                  //   );
                  // }, 1000);
                }}
                text="Sepeti Onayla"
                buttonBorderRadius={7}
                buttonWidth={width * 0.8}
                buttonFontWeight="700"
              />
            </View>

            <View style={{marginBottom: height * 0.0125}}>
              <StandardButton
                onPress={() =>
                  navigate(`/StoreScreen/${selectedRestaurantState}`)
                }
                text="Ürün Ekle"
                textColor="black"
                buttonBackgroundColor={themeSettings?.thirdColor}
                buttonBorderRadius={7}
                buttonWidth={width * 0.8}
                buttonFontWeight="700"
              />
            </View>
          </View>
        </View>
      )}
      {!basketPropertiesState.storeId && (
        <View
          style={{
            marginLeft: width * 0.025,
            marginRight: width * 0.025,
            height: height,
          }}>
          <View
            style={{
              marginTop: height * 0.0125,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              height: height * 0.05,
              width: width * 0.3,
              backgroundColor: themeSettings?.thirdColor,
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigate('/UserPastOrdersListScreen')}>
              <CustomText
                style={{
                  textAlign: 'center',
                }}>
                Siparişlerim
              </CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginTop: height * 0.125,
                height: height * 0.5,
                width: width * 0.8,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{
                  borderRadius: 60,
                  width: '90%',
                  height: '50%',
                }}
                source={{
                  uri: Globals.url.APPLICATIONIMAGEPATH + 'shoppingCart.png',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText
                style={{
                  fontSize: height * 0.025,
                }}>
                Lütfen Sepetinize ürün ekleyin.
              </CustomText>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: height * 0.025,
              backgroundColor: themeSettings?.secondColor,
              width: width * 0.9,
              height: height * 0.05,
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={() => navigate('/MainScreen')}>
              <CustomText
                style={{
                  color: 'white',
                  fontSize: height * 0.025,
                }}>
                Restoranlara git
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
});

export default BasketScreen;
