import {Text, View} from 'react-native';
import React, {ReactNode, memo, useEffect} from 'react';
import {useAppSelector} from '../../reduxstore/reduxhooks';
import {reduxstore} from '../../reduxstore/reduxstore';
import {setBottomApplicationBarVisibilityStatus} from '../../components/applicationBars/bottomApplicationBar/bottomApplicationBarSlice';
import {setTopApplicationBarVisibilityStatus} from '../../components/applicationBars/topApplicationBar/topApplicationBarSlice';
import {setStatusBarBackgroundColor} from '../start/targetEnvironmentSlice';
import {
  setAllHeights,
  setAllWidths,
} from '../../components/store/headers/StoreScreenStickyHeaderComponent';

export interface ILayoutWithoutApplicationBarsProps {
  children: ReactNode;
  backgroundColor?: string;
}

const initialState: ILayoutWithoutApplicationBarsProps = {
  children: <Text>Boş</Text>,
  backgroundColor: '#65D384',
};

const LayoutFullScreen = memo((props: ILayoutWithoutApplicationBarsProps) => {
  props = {...initialState, ...props};
  const marginTop =
    -reduxstore.getState().targetEnvironment.AppScreenDimensions
      .statusbarHeight -
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .topApplicationBarHeight;
  const height = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.height,
  );
  const width = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.width,
  );

  useEffect(() => {
    reduxstore.dispatch(setStatusBarBackgroundColor('transparent'));
    reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(false));
    reduxstore.dispatch(setTopApplicationBarVisibilityStatus(false));
    return () => {
      //reduxstore.dispatch(setPreviousRouteName('WelcomeScreen'));
      reduxstore.dispatch(
        setStatusBarBackgroundColor(
          reduxstore.getState().targetEnvironment.ThemeSettings?.firstColor!,
        ),
      );
      reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(true));
      reduxstore.dispatch(setTopApplicationBarVisibilityStatus(true));
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        //backgroundColor: 'red',
        ...setAllHeights(height),
        ...setAllWidths(width),
        marginTop: marginTop,
        zIndex: 999990000,
        flexDirection: 'column',
      }}>
      {props.children}
    </View>
  );
});

export default LayoutFullScreen;
