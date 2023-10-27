import {Text, ScrollView, Button} from 'react-native';
import React, {memo} from 'react';
import {useNavigate} from 'react-router-native';
import FastImage from 'react-native-fast-image';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const TestScreen = memo(() => {
  const navigate = useNavigate();

  return (
    <ScrollView>
      <Text style={{fontFamily: 'JosefinSans-Bold'}}>Deneme</Text>
      <Button
        title="Go to Login"
        onPress={() => navigate('/ParentLoginScreen')}
      />
      <Text style={{fontSize: 96}}>Scroll me plz</Text>
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <Text style={{fontSize: 96}}>If you like</Text>
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <Text style={{fontSize: 96}}>Scrolling down</Text>
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <Text style={{fontSize: 96}}>What's the best</Text>
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <Text style={{fontSize: 96}}>Framework around?</Text>
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <FastImage source={logo} />
      <Text style={{fontSize: 80}}>React Native</Text>
    </ScrollView>
  );
});

export default TestScreen;
