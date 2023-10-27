import React, {FunctionComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  style?: any;
  testID?: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    bottom: 16,
    justifyContent: 'center',
    left: 48,
    minHeight: 60,
    paddingVertical: 16,
    position: 'absolute',
    right: 48,
  },
});

const Bubble: FunctionComponent<Props> = ({
  onPress,
  children,
  style,
  testID,
}) => {
  let innerChildView = children;
  if (onPress) {
    innerChildView = (
      <TouchableOpacity onPress={onPress} testID={testID}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.container, style]}>{innerChildView}</View>;
};

export default Bubble;
