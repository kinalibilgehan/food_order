import {View} from 'react-native';
import React, {ReactNode, memo, useEffect} from 'react';
import {setBottomApplicationBarVisibilityStatus} from '../../components/applicationBars/bottomApplicationBar/bottomApplicationBarSlice';
import {setTopApplicationBarVisibilityStatus} from '../../components/applicationBars/topApplicationBar/topApplicationBarSlice';
import {reduxstore} from '../../reduxstore/reduxstore';
import {useAppSelector} from '../../reduxstore/reduxhooks';
import {setAllHeights} from '../../components/store/headers/StoreScreenStickyHeaderComponent';

export interface ILayoutWithoutApplicationBarsProps {
  children: ReactNode;
}

const LayoutWithoutApplicationBars = memo(
  (props: ILayoutWithoutApplicationBarsProps) => {
    const height = useAppSelector(
      data => data.targetEnvironment.AppScreenDimensions.height,
    );
    const topApplicationBarHeight =
      reduxstore.getState().targetEnvironment.AppScreenDimensions
        .topApplicationBarHeight;
    const statusbarHeight =
      reduxstore.getState().targetEnvironment.AppScreenDimensions
        .statusbarHeight;
    useEffect(() => {
      reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(false));
      reduxstore.dispatch(setTopApplicationBarVisibilityStatus(false));
      return () => {
        reduxstore.dispatch(setBottomApplicationBarVisibilityStatus(true));
        reduxstore.dispatch(setTopApplicationBarVisibilityStatus(true));
      };
    }, []);

    return (
      <View
        style={{
          ...setAllHeights(height - statusbarHeight),
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -topApplicationBarHeight,
          flex: 1,
        }}>
        {props.children}
      </View>
    );
  },
);

export default LayoutWithoutApplicationBars;
