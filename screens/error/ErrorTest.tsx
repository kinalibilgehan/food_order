import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button, View, Alert} from 'react-native';
// Tip tanımlaması olmayan kütüphaneler için tipi any olarak belirleyebilirsiniz.
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const errorHandler = (e: Error, isFatal: boolean) => {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        ${JSON.stringify(e)}

        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: 'Close',
        },
      ],
    );
  } else {
    console.log(e);
  }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString: string) => {
  console.log('setNativeExceptionHandler');
});

interface ErrorTestState {
  // Eğer state değişkenleri olacaksa, onları burada tipleyebilirsiniz.
}

class ErrorTest extends Component<{}, ErrorTestState> {
  causeJSError = () => {
    throw new Error('THIS IS A CUSTOM UNHANDLED JS ERROR');
  };

  causeNativeError = () => {
    // Eğer bu fonksiyonun döndüğü değerin bir tipi varsa, onu belirtebilirsiniz.
    //RnTestExceptionHandler.raiseTestNativeError();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          onPress={this.causeJSError}
          title="CAUSE JS ERROR"
          color="#841584"
        />
        <Button
          onPress={this.causeNativeError}
          title="CAUSE Native ERROR"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default ErrorTest;
