import {View} from 'react-native';
import React from 'react';
import {Picker} from 'react-native-wheel-pick';
//https://github.com/TronNatthakorn/react-native-wheel-pick

const MyPicker = () => {
  return (
    <View>
      <Picker<string>
        style={{backgroundColor: 'white', width: 100, height: 150}}
        selectedValue={'3'}
        pickerData={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ]}
        onValueChange={value => {
          console.log(value);
        }} // '5765387680'
      />
    </View>
  );
};

export default MyPicker;
