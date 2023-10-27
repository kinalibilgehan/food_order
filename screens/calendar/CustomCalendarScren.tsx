import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import {
  setAllHeights,
  setAllWidths,
} from '../../components/store/headers/StoreScreenStickyHeaderComponent';

interface ICustomCalendarScrenState {
  hourUnitHeight?: number;
  hourUnitWidth?: number;
  calendarAreaTotalHeight?: number;
  dayCountArray?: number[];
  hourCountArray?: number[];
}

interface ICustomCalendarScrenProps {
  hourUnitHeight?: number;
  dayCount?: number;
  hourChartWidth?: number;
  calendarHeaderHeight?: number;
  startingHour?: number;
  endingHour?: number;
}

const initialProps: ICustomCalendarScrenProps = {
  hourUnitHeight: 50,
  dayCount: 1,
  hourChartWidth: 50,
  calendarHeaderHeight: 60,
  startingHour: 0,
  endingHour: 24,
};

const CustomCalendarScren = memo((props: ICustomCalendarScrenProps) => {
  props = {...initialProps, ...props};
  const screenwidth =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const containerHeight =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;

  const [screenState, setScreenState] = useState<ICustomCalendarScrenState>({
    dayCountArray: [],
    hourCountArray: [],
  });

  useEffect(() => {
    let helperState = {...screenState};
    helperState.hourUnitHeight = props.hourUnitHeight;
    helperState.hourUnitWidth =
      (screenwidth - props.hourChartWidth!) / props.dayCount!;
    helperState.calendarAreaTotalHeight =
      (props.endingHour! - props.startingHour!) * props.hourUnitHeight!;
    let helperArr1: number[] = [];
    for (let i = 0; i < props.dayCount!; i++) {
      helperArr1.push(i);
    }
    let helperArr2: number[] = [];
    for (let i = props.startingHour!; i <= props.endingHour!; i++) {
      helperArr2.push(i);
    }
    helperState.dayCountArray = helperArr1;
    helperState.hourCountArray = helperArr2;
    setScreenState(helperState);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        ...setAllHeights(containerHeight),
        ...setAllWidths(screenwidth),
      }}>
      <View
        style={{
          ...setAllHeights(props.calendarHeaderHeight!),
          ...setAllWidths(screenwidth),
          backgroundColor: 'yellow',
        }}>
        <Text>CalendarHeaderView</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          ...setAllWidths(screenwidth),
          flexDirection: 'row',
        }}
        showsVerticalScrollIndicator={false}
        style={{}}>
        <View
          style={{
            ...setAllWidths(props.hourChartWidth!),
            ...setAllHeights(screenState.calendarAreaTotalHeight!),
            flexDirection: 'column',
          }}>
          {screenState.hourCountArray!.map((e1: number, i1: number) => {
            if (e1 !== props.endingHour) {
              return (
                <TouchableOpacity
                  key={e1}
                  style={{
                    ...setAllWidths(props.hourChartWidth!),
                    ...setAllHeights(screenState.hourUnitHeight!),
                    borderTopWidth: 0.3,
                    borderRightWidth: 0.3,
                    borderColor: 'gray',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 11}}>{`${e1}:00`}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={e1}
                  style={{
                    ...setAllWidths(props.hourChartWidth!),
                    ...setAllHeights(screenState.hourUnitHeight!),
                    alignItems: 'center',
                    marginTop: -15,
                  }}>
                  <Text style={{fontSize: 11}}>{`${e1}:00`}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        {screenState.dayCountArray!.map((e2: number, i2: number) => {
          return (
            <View
              key={e2}
              style={{
                ...setAllWidths(screenState.hourUnitWidth!),
                ...setAllHeights(screenState.calendarAreaTotalHeight!),
                flexDirection: 'column',
              }}>
              {screenState.hourCountArray!.map((e3: number, i3: number) => {
                if (e3 !== props.endingHour! && e3 % 2 === 0) {
                  return (
                    <View
                      key={e3}
                      style={{
                        ...setAllWidths(screenState.hourUnitWidth!),
                        ...setAllHeights(screenState.hourUnitHeight! * 2),
                        borderTopWidth: 0.3,
                        borderRightWidth: 0.3,
                        borderColor: 'gray',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        key={e3}
                        style={{
                          borderRadius: 5,
                          ...setAllWidths(screenState.hourUnitWidth! - 4),
                          ...setAllHeights(screenState.hourUnitHeight! * 2 - 4),
                          backgroundColor: 'gray',
                        }}>
                        <View
                          style={{
                            transform: [
                              {
                                rotate: '-90deg',
                              },
                              {
                                translateX: -screenState.hourUnitWidth! / 2 - 1,
                              },
                              {
                                translateY:
                                  -screenState.hourUnitHeight! / 2 - 1,
                              },
                            ],
                            height: screenState.hourUnitWidth! - 4,
                            width: screenState.hourUnitHeight! * 2 - 4,
                          }}>
                          <Text>Siparişe Kapalı</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

export default CustomCalendarScren;
