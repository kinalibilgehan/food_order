import {
  LayoutChangeEvent,
  Platform,
  RecursiveArray,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calendar, {
  EventRenderer,
  ICalendarEventBase,
  formatStartEnd,
} from 'react-native-big-calendar';
import 'dayjs/locale/tr';
import {reduxstore} from '../../reduxstore/reduxstore';
import agent from '../../api/agent';
const events: MyCustomEventType[] = [
  {
    title: 'Kapalı',
    start: new Date(2023, 4, 26, 8, 0),
    end: new Date(2023, 4, 26, 10, 0),
    isClosed: true,
    backgroundColor: 'gray',
  },
  {
    title: 'ASDAS',
    start: new Date(2023, 4, 28, 16, 0),
    end: new Date(2023, 4, 28, 18, 0),
    isClosed: true,
    backgroundColor: 'green',
  },
  {
    title: 'Yüksek Sipariş Yoğunluğu',
    start: new Date(2023, 4, 26, 10, 0),
    end: new Date(2023, 4, 26, 12, 0),
    isClosed: false,
    backgroundColor: 'red',
  },
  {
    title: 'Orta Düzeyde Sipariş Yoğunluğu',
    start: new Date(2023, 4, 26, 12, 0),
    end: new Date(2023, 4, 26, 14, 0),
    isClosed: false,
    backgroundColor: 'orange',
  },
];

const toWeekDay: any = (date: Date) => {
  let dat = date.getDay();
  if (dat > 6) {
    dat = 6;
  }
  return dat;
};

const CalendarScreen = () => {
  const [calendarMode, setCalendarMode] = useState<any>('day');
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight +
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .topApplicationBarHeight;

  const [eventBoxWidth, setEventBoxWidth] = useState(0);
  const [eventBoxHeight, setEventBoxHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const resp = {...event.nativeEvent.layout};
    setEventBoxHeight(resp.height);
    setEventBoxWidth(resp.width);
  };

  const [timeSlotsDto, setTimeSlotsDto] = useState<MyCustomEventType[]>(events);

  useEffect(() => {
    agent.Order.GetOrderScheduleByStoreId('')
      .then(response => {
        response.forEach(element => {
          element.start = new Date(element.start);
          element.end = new Date(element.end);
        });
        //setTimeSlotsDto(response);
      })
      .catch(e => {
        console.log(e);
      });

    return () => {};
  }, []);

  const customEventRenderer: EventRenderer<MyCustomEventType> = (
    event,
    touchableOpacityProps,
  ) => {
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        style={[
          ...(touchableOpacityProps.style as RecursiveArray<ViewStyle>),
          {
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderColor: 'transparent',
            //borderColor: 'lightgrey',
            //borderLeftColor: event.color ? event.color : 'green',
            //borderLeftWidth: 10,
            borderStyle: 'solid',
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            marginTop: -0.5,
            //borderTopWidth: 0.5,
            //borderTopColor: 'lightgrey',
            shadowColor: 'transparent',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        ]}>
        {
          <View
            onLayout={onLayout}
            style={{
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: event.backgroundColor,
              height: '95%',
              width: '100%',
              //paddingTop: 2,
              //paddingBottom: 2,
              //paddingLeft: 2,
              //paddingRight: 2,
              overflow: 'hidden',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: eventBoxWidth,
                width: eventBoxHeight,
                transform: [{rotate: '-90deg'}],
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
              }}>
              <Text
                numberOfLines={3}
                style={[
                  {
                    justifyContent: 'space-between',
                    color: 'black',
                    fontSize: 11,
                  },
                ]}>
                {event.title}
              </Text>
            </View>
            {false && (
              <Text style={[{color: 'black', fontSize: 10}]}>
                {formatStartEnd(event.start, event.end, 'HH:mm')}
              </Text>
            )}

            {true && <>{event.children && event.children}</>}
          </View>
        }
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Calendar
        //renderEvent={calendarMode === 'month' ? undefined : customEventRenderer}
        //eventCellStyle={event => {
        //  let style: ViewStyle = {};
        //  style.backgroundColor = event.isClosed ? 'gray' : 'red';
        //  return style;
        //}}
        locale="tr"
        onPressDateHeader={(e: any) => {
          console.log(e);
        }}
        onPressCell={(e: Date) => {
          console.log(e.getDay());
        }}
        onPressEvent={e => {
          console.log(e);
        }}
        mode={calendarMode}
        events={timeSlotsDto}
        height={height}
        scrollOffsetMinutes={Platform.OS === 'ios' ? 400 : 480}
        weekStartsOn={toWeekDay(new Date())}
        hourRowHeight={40}
        //hourStyle={{fontSize: 4, lineHeight: 3, color: 'red'}}
      />
    </View>
  );
};

export default CalendarScreen;

export interface MyCustomEventType extends ICalendarEventBase {
  textColor?: string;
  isClosed?: boolean;
  backgroundColor?: string;
}
