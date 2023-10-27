import {Picker} from '@react-native-picker/picker';

import {View} from 'react-native';
import React from 'react';

const MyPicker2 = () => {
  return (
    <View>
      <Picker style={{width: 150}}>
        <Picker.Item label="Hello" value="Hello" />
        <Picker.Item label="React" value="React" />
        <Picker.Item label="Native" value="Native" />
        <Picker.Item label="How" value="How" />
        <Picker.Item label="are" value="are" />
        <Picker.Item label="you" value="you" />
      </Picker>
    </View>
  );
};

export default MyPicker2;
