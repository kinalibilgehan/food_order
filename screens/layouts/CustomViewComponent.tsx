import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

interface ICustomViewComponentProps {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

const CustomViewComponent = (props: ICustomViewComponentProps) => {
  return <View style={props.style}>{props.children}</View>;
};

export default CustomViewComponent;
