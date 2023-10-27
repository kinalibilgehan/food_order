import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {reduxstore} from '../../../reduxstore/reduxstore';
import agent from '../../../api/agent';
import StoreProductsAndAislesListComponent from '../../../components/account/storeAccount/StoreProductsAndAislesListComponent';
import {StoreCategoryAndProductsDto} from '../../store/IStoreScreen';
import CustomText from '../../../components/general/text/CustomText';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/general/text/CustomTextInput';

const StoreProductsAndCategoriesScreen = () => {
  // APP SETTINGS
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  // STATE VARIABLES
  const [storeProductsAndAisles, setStoreProductsAndAisles] =
    useState<StoreCategoryAndProductsDto[]>();

  const [searchText, setSearchText] = useState<string>('');

  // METHODS
  const handleGetStoreProducts = async () => {
    const storeId = reduxstore.getState().userAccount.user?.ownedStoreId;
    const storeProducts = await agent.Store.getStoreProducts(storeId!);
    const storeProductsByAisles = storeProducts.slice(2);
    setStoreProductsAndAisles(storeProductsByAisles);
    console.log(storeProductsAndAisles);
  };

  const handleSearchText = (text: string) => {
    setSearchText(text);
    console.log(searchText);
  };

  const handleSearchedProducts = (aisleProducts: any) => {
    let filteredProducts = aisleProducts.filter(
      (product: {ProductName: string}) =>
        product.ProductName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredProducts;
  };

  // const handle;
  useEffect(() => {
    handleGetStoreProducts();
  }, []);

  return (
    // PAGE CONTAINER
    <ScrollView
      style={{
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      {/* SEARCH BAR CONTAINER */}
      <View
        style={{
          marginTop: height * 0.0125,
          marginBottom: height * 0.025,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeSettings?.thirdColor,
            borderColor: 'black',
            borderWidth: width * 0.00125,
            // borderRadius: 10,
            width: width * 0.95,
            height: height * 0.05,
          }}>
          <Icon
            style={{
              zIndex: 300,
              color: 'black',
              backgroundColor: 'transparent',
              marginLeft: width * 0.02,
            }}
            name="search-outline"
            color="#B5B5B5"
            size={height * 0.025}
          />
          <CustomTextInput
            multiline={false}
            onChangeText={s => {
              handleSearchText(s);
            }}
            style={{
              height: height * 0.02,
              width: width * 0.7,
              minHeight: (height * 0.8) / 10,
              backgroundColor: 'transparent',
              marginTop: height * 0.0125,
              marginBottom: height * 0.0125,
              paddingLeft: height * 0.015,
              paddingTop: height * 0.015,
            }}
            placeholder="Ürün Ara"
            textAlign="left"
          />
        </View>
      </View>

      {storeProductsAndAisles?.map((aisleProducts: any, aisleIndex: number) => {
        // const searchedProducts = handleSearchedProducts(aisleProducts);
        // console.log(aisleProducts);c
        if (searchText.length < 3) {
          return (
            <React.Fragment key={aisleIndex}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <CustomText
                  style={{
                    fontSize: height * 0.025,
                    fontWeight: '700',
                    marginBottom: height * 0.0125,
                    // paddingVertical: height * 0.0125,
                  }}>
                  {aisleProducts.aisleName}
                </CustomText>
                <Icon
                  style={{
                    color: 'black',
                    marginRight: width * 0.03,
                  }}
                  name="pencil-outline"
                  color="#B5B5B5"
                  size={height * 0.025}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: height * 0.0025,
                  borderColor: themeSettings?.thirdColor,
                }}
              />
              {aisleProducts.data.map(
                (storeProduct: any, productIndex: number) => {
                  const isEvenIndex = productIndex % 2 === 0;
                  const backgroundColor = isEvenIndex
                    ? 'white'
                    : themeSettings?.thirdColor;
                  return (
                    <StoreProductsAndAislesListComponent
                      key={productIndex}
                      Backgroundcolor={backgroundColor!}
                      OrderNumber={productIndex + 1}
                      ProductImageUrl={storeProduct.imageUrl}
                      ProductName={storeProduct.name}
                      ProductPrice={storeProduct.price.price}
                      IsProductActive={storeProduct.isReadyForDelivery}
                      ProductDescription={storeProduct.description}
                    />
                  );
                },
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={aisleIndex}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <CustomText
                  style={{
                    fontSize: height * 0.025,
                    fontWeight: '700',
                    marginBottom: height * 0.0125,
                    // paddingVertical: height * 0.0125,
                  }}>
                  {aisleProducts.aisleName}
                </CustomText>
                <Icon
                  style={{
                    color: 'black',
                    marginRight: width * 0.03,
                  }}
                  name="pencil-outline"
                  color="#B5B5B5"
                  size={height * 0.025}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: height * 0.0025,
                  borderColor: themeSettings?.thirdColor,
                }}
              />
              {aisleProducts.data.map(
                (storeProduct: any, productIndex: number) => {
                  const isEvenIndex = productIndex % 2 === 0;
                  const backgroundColor = isEvenIndex
                    ? 'white'
                    : themeSettings?.thirdColor;

                  {
                    if (storeProduct.name.toLowerCase().includes(searchText)) {
                      return (
                        <StoreProductsAndAislesListComponent
                          key={productIndex}
                          Backgroundcolor={backgroundColor!}
                          OrderNumber={productIndex + 1}
                          ProductImageUrl={storeProduct.imageUrl}
                          ProductName={storeProduct.name}
                          ProductPrice={storeProduct.price.price}
                          IsProductActive={storeProduct.isReadyForDelivery}
                          ProductDescription={storeProduct.description}
                        />
                      );
                    }
                  }
                },
              )}
            </React.Fragment>
          );
        }
      })}
    </ScrollView>
  );
};

export default StoreProductsAndCategoriesScreen;

{
  /* <StoreProductsAndAislesListComponent
Backgroundcolor={themeSettings?.thirdColor!}
OrderNumber={1}
ProductImageUrl={''}
ProductName={'Kuru Fasulye'}
ProductPrice={150}
IsProductActive={true}
ProductExplanation="Ürün açıklaması: Bu yemeğin içine kokain, lsd, speed koyduk. Hamurla
yoğurduk, zeytinyağında kızarttık"
/> */
}
