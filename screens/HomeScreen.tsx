import {Text, Button, BackHandler, ScrollView, View} from 'react-native';
import React, {memo} from 'react';
import {useLocation, useNavigate} from 'react-router-native';

const HomeScreen = memo(() => {
  console.log('Home');
  const navigate = useNavigate();
  const history = useLocation();

  const handleBackButton = () => {
    console.log(history);
    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', handleBackButton);

  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Home Screen</Text>
        {/* <Button
          title="Go to Login"
          onPress={() => navigate('/ParentLoginScreen')}
        />
        <Button title="Go to Test" onPress={() => navigate('/Test')} />
        <Button title="Go to Error" onPress={() => navigate('/Error')} />
        {/* <Button
          title="Go to FileUpload"
          onPress={() => navigate('/FileUpload')}
        /> */}
        {/* <Button title="Go to MapScreen" onPress={() => navigate('/Map')} /> */}
        <Button title="Go to DevScreen" onPress={() => navigate('/Dev')} />
        {/* <Button
          title="Go to MainScreen"
          onPress={() => navigate('/MainScreen')}
        /> */}
        {/* <Button
          title="Go to WelcomeScreen"
          onPress={() => navigate('/WelcomeScreen')}
        /> */}
        <Button
          title="Go to WebViewScreen"
          onPress={() => navigate('/WebViewScreen')}
        />
        <Button
          title="Go to WalletScreen"
          onPress={() => navigate('/WalletScreen')}
        />
        <Button
          title="Go to TransactionsScreen"
          onPress={() => navigate('/TransactionsScreen')}
        />

        <Button
          title="Go to LinkingTest"
          onPress={() => navigate('/LinkingTest')}
        />
        <Button
          title="Go to Error Generator Screen"
          onPress={() => navigate('/ErrorGeneratorScreen')}
        />
        <Button
          title="Go to StoreScreenMainComponent"
          onPress={() => navigate('/StoreScreenMainComponent')}
        />
        {/* <Button
          title="Go to OrderDetailsScreen"
          onPress={() => navigate('/OrderDetailsScreen')}
        /> */}
        {/* <Button
          title="Go to FilterScreen"
          onPress={() => navigate('/FilterScreen')}
        /> */}
        {/* <Button
          title="Go to ReactNativeMapScreen"
          onPress={() => navigate('/ReactNativeMapScreen')}
        /> */}
        {/* <Button
          title="Go to CalendarScreen"
          onPress={() => navigate('/CalendarScreen')}
        /> */}
        {/* <Button
          title="Go to BasketScreen"
          onPress={() => navigate('/BasketScreen')}
        /> */}
        {/* <Button
          title="Go to UserTrackOrderScreen"
          onPress={() => navigate('/UserTrackOrderScreen')}
        />
        <Button
          title="Go to StoreTrackOrderScreen"
          onPress={() => navigate('/StoreTrackOrderScreen')}
        /> */}
        <Button
          title="Go to AddReview"
          onPress={() => navigate('/AddReviewScreen')}
        />
        {/* <Button
          title="OpenModal"
          onPress={() => {
            const response: ModalResult = {
              showModal: true,
              modalText: 'Deneme Modal',
              modalHeaderText: 'Modal Başlığı',
              modalType: ModalTypeEnum.InformationModal,
              navigationRoute: '/MainScreen',
            };
            reduxstore.dispatch(setCustomModalModalResultState(response));
          }}
        />
        <Button
          title="TestModalState1"
          onPress={() => {
            reduxstore.dispatch(
              setSelectedModalAction(ModalActionTypeEnum.Default),
            );
          }}
        />
        <Button
          title="TestModalState2"
          onPress={() => {
            reduxstore.dispatch(
              setSelectedModalAction(ModalActionTypeEnum.Confirm),
            );
          }}
        /> */}
        <Button
          title="StoryRecorderScreen"
          onPress={() => navigate('/StoryRecorderScreen')}
        />

        <Button
          title="FavouriteStoresScreen"
          onPress={() => navigate('/FavouriteStoresScreen')}
        />
        <Button
          title="DeclinedOrderScreen"
          onPress={() => navigate('/DeclinedOrderScreen/:orderId')}
        />
        <Button
          title="StoreProductsAndCategoriesScreen"
          onPress={() => navigate('/StoreProductsAndCategoriesScreen')}
        />
        <Button
          title="StoreScreenMainComponent"
          onPress={() => navigate('/StoreScreenMainComponent')}
        />
      </View>
    </ScrollView>
  );
});

export default HomeScreen;
