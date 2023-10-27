import {View, Text, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';

const ErrorScreen = memo(() => {
  const error = reduxstore.getState().error.value;
  const globalError = reduxstore.getState().error.globalError;
  const globalErrorInfo = reduxstore.getState().error.globalErrorInfo;
  return (
    <ScrollView>
      <View>
        {false && (
          <>
            <Text>{error?.message}</Text>
            <Text>{JSON.stringify(error)}</Text>
          </>
        )}
        {globalError && <Text>{JSON.stringify(globalError)}</Text>}
        <Text>{'----------------------------------------'}</Text>
        {globalErrorInfo && <Text>{JSON.stringify(globalErrorInfo)}</Text>}
      </View>
    </ScrollView>
  );
});

export default ErrorScreen;
