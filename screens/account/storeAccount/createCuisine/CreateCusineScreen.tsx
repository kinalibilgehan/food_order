import {Platform, View} from 'react-native';
import React from 'react';
import {reduxstore} from '../../../../reduxstore/reduxstore';
import {setAllWidths} from '../../../../components/store/headers/StoreScreenStickyHeaderComponent';
import CreateCuisineHeaderAndAvatarComponent from '../../../../components/account/storeAccount/CreateCuisineHeaderAndAvatarComponent';
import CreateCuisineCuisineNameComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineNameComponent';
import CreateCuisineCuisineBioComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineBioComponent';
import CreateCuisineCuisineWorkingHoursComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineWorkingHoursComponent';
import CreateCuisineCuisineFutureOrderBufferTimeComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineFutureOrderBufferTimeComponent';
import CreateCuisineCuisineDeliveryTypeComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineDeliveryTypeComponent';
import CreateCuisineCuisineMinimumOrderPriceComponent from '../../../../components/account/storeAccount/CreateCuisineCuisineMinimumOrderPriceComponent';
import CreateCuisineCuisineAddressComponent from '../../../../components/account/storeAccount/createCuisineAddressComponents/CreateCuisineCuisineAddressComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OSType} from '../../../start/targetEnvironmentSlice';
import StandardButton from '../../../../components/buttons/StandardButton';
import agent from '../../../../api/agent';
import {
  CreateStoreRequestDto,
  CreateStoreResponseDto,
} from '../ICreateStoreAccountScreen';
import {setCustomModalModalResultState} from '../../../../components/general/modals/customModalComponentSlice';
import {setUserAccountState} from '../../userAccountSlice';

const CreateCusineScreen = () => {
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;

  const handleCreateCuisine = () => {
    const state = reduxstore.getState().createCusineScreen;
    const request: CreateStoreRequestDto = {
      ownerId: null,
      managerIds: null,
      addressText: state.addressText,
      avarageDeliveryTime: '00:30:00',
      defaultClosingTime: state.defaultClosingTime + ':00',
      defaultOpeningTime: state.defaultOpenningTime + ':00',
      bio1: state.bio1,
      bio2: '',
      postalCode: state.postalCode,
      provinceName: state.provinceName,
      cityName: state.cityName,
      coordinate: state.storeLocation!,
      countryName: state.countryName ?? 'Türkiye',
      hasCourrierService: state.hasCourrierService,
      headerImageBase64: state.headerImageBase64,
      avatarImageBase64: state.avatarImageBase64,
      storeName: state.storeName,
    };
    agent.Store.createStore(request)
      .then((response: CreateStoreResponseDto) => {
        reduxstore.dispatch(
          setCustomModalModalResultState(response.modalResult),
        );
        if (response.result.isSuccess) {
          let helperState = {...reduxstore.getState().userAccount};
          helperState.ownedStoreId = response.storeId;
          helperState.hasStoreAccount = response.storeId ? true : false;
          reduxstore.dispatch(setUserAccountState(helperState));
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error: any) => {});
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{...setAllWidths(width)}}
      extraScrollHeight={Platform.OS === OSType.ANDROID ? -60 : 40}>
      <View
        style={{
          ...setAllWidths(width * 0.95),
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          flex: 1,
        }}>
        <CreateCuisineHeaderAndAvatarComponent />
        <CreateCuisineCuisineNameComponent />
        <CreateCuisineCuisineAddressComponent />
        <CreateCuisineCuisineBioComponent />
        <CreateCuisineCuisineWorkingHoursComponent />
        {false && <CreateCuisineCuisineFutureOrderBufferTimeComponent />}
        <CreateCuisineCuisineDeliveryTypeComponent />
        <CreateCuisineCuisineMinimumOrderPriceComponent />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <StandardButton text="Oluştur" onPress={handleCreateCuisine} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateCusineScreen;
