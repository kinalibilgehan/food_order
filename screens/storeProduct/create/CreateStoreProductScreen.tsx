import {TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {setAllWidths} from '../../../components/store/headers/StoreScreenStickyHeaderComponent';
import CreateStoreProductHeaderComponent from '../../../components/storeProduct/create/CreateStoreProductHeaderComponent';
import CreateStoreProductNameComponent from '../../../components/storeProduct/create/CreateStoreProductNameComponent';
import CreateStoreProductDescriptionComponent from '../../../components/storeProduct/create/CreateStoreProductDescriptionComponent';
import CreateStoreProductPreparationTimeComponent from '../../../components/storeProduct/create/createStoreProductPreparationTime/CreateStoreProductPreparationTimeComponent';
import CreateStoreProductPreparedStocksComponent from '../../../components/storeProduct/create/CreateStoreProductPreparedStocksComponent';
import CreateStoreProductProductPrice from '../../../components/storeProduct/create/CreateStoreProductProductPrice';
import CreateStoreProductProductAisleComponent from '../../../components/storeProduct/create/createStoreProductAisle/CreateStoreProductProductAisleComponent';
import CreateStoreProductProductCategoryComponent from '../../../components/storeProduct/create/createStoreProductCategory/CreateStoreProductProductCategoryComponent';
import CreateStoreProductSpecialIngredientsComponent from '../../../components/storeProduct/create/CreateStoreProductSpecialIngredientsComponent';

import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import {CreateStoreProductRequestDto} from '../IStoreProduct';
import agent from '../../../api/agent';
import CustomText from '../../../components/general/text/CustomText';

const CreateStoreProductScreen = memo(() => {
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const handleCreateStoreProduct = async () => {
    const userState = reduxstore.getState().userAccount;
    let helperState = reduxstore.getState().createStoreProductScreen;
    const requestBody: CreateStoreProductRequestDto = {
      storeId: userState.user?.ownedStoreId!,
      imageBase64: helperState.headerImageBase64,
      productName: helperState.productName,
      description: helperState.productDescription,
      productAisles: helperState.selectedProductAisles,
      productPrice: Number(helperState.productPrice),
      preperationTime:
        helperState.preperationTimeDay +
        ':' +
        helperState.preperationTimeHour +
        ':' +
        helperState.preperationTimeMinute +
        ':00',
      stockQuantity: Number(helperState.productStock),
      productCategories: helperState.selectedProductCategories,
      specialIngredients: helperState.selectedSpecialIngredients,
    };

    const response = await agent.StoreProduct.createStoreProduct(requestBody);
    console.log(response);
  };
  return (
    <GestureHandlerScrollView
      //enableOnAndroid={true}
      contentContainerStyle={{...setAllWidths(width)}}
      //extraScrollHeight={Platform.OS === OSType.ANDROID ? -60 : 40}
    >
      <View
        style={{
          ...setAllWidths(width * 0.95),
          marginLeft: width * 0.025,
          marginRight: width * 0.025,
          flex: 1,
        }}>
        <CreateStoreProductHeaderComponent />
        <CreateStoreProductNameComponent />
        <CreateStoreProductDescriptionComponent />
        <CreateStoreProductProductAisleComponent />
        <CreateStoreProductProductPrice />
        <CreateStoreProductPreparationTimeComponent />
        <CreateStoreProductPreparedStocksComponent />
        <CreateStoreProductProductCategoryComponent />
        <CreateStoreProductSpecialIngredientsComponent />

        <View
          style={{
            marginTop: height * 0.0125,
            marginBottom: height * 0.0125,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.95,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleCreateStoreProduct();
            }}
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
                color: 'white',
              }}>
              Ürünleri güncelle
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerScrollView>
  );
});

export default CreateStoreProductScreen;
