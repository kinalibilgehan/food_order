import {View, Text} from 'react-native';
import React, {memo} from 'react';
import FilePicker1 from '../../components/inputs/filepicker/FilePicker1';

const FileUploadScreen = memo(() => {
  return (
    <View>
      <Text>FileUploadScreen</Text>
      <FilePicker1 />
    </View>
  );
});

export default FileUploadScreen;
