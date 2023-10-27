import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import Icon from 'react-native-vector-icons/Ionicons';
import {Slider} from '@miblanchard/react-native-slider';
import {
  setAllHeights,
  setAllWidths,
} from '../../components/store/headers/StoreScreenStickyHeaderComponent';
import OtherFiltersCheckboxesComponent from '../../components/filter/OtherFiltersCheckboxesComponent';

import SpecialIngredientsFiltersCheckboxesComponent from '../../components/filter/SpecialIngredientsFiltersCheckboxesComponent';

import agent from '../../api/agent';
import CustomText from '../../components/general/text/CustomText';

// import * as IFilterOptions from '../filter/IFilterOptions';

const FilterScreen = memo(() => {
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  const [alignment, setAlignment] = useState<boolean[]>([false, false, false]);

  const [distanceSliderValue, setDistanceSliderValue] = useState([0]);
  const [minBasketSliderValue, setMinBasketSliderValue] = useState([0]);
  const [prepTimeSliderValue, setPrepTimeSliderValue] = useState([0]);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [specialIngredients, setSpecialIngredients] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSpecialIngredients, setSelectedSpecialIngredients] = useState<
    string[]
  >([]);

  const handleAlignment = (index: number) => {
    const updatedAlignment = [false, false, false];
    updatedAlignment[index] = !updatedAlignment[index];
    setAlignment(updatedAlignment);
    console.log(updatedAlignment);
  };

  const getCategories = async () => {
    const response = await agent.StoreProduct.getAllStoreProductCategories();
    setCategories(response);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSpecialIngredients = async () => {
    const response = await agent.StoreProduct.getAllSpecialIngredients();
    setSpecialIngredients(response);
  };

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const handleDistanceSlider = (value: number[]) => {
    console.log(value);
    setDistanceSliderValue(value);
  };

  const handleMinBasketSlider = (value: number[]) => {
    console.log(value);
    setMinBasketSliderValue(value);
  };

  const handlePrepTimeSlider = (value: number[]) => {
    console.log(value);
    setPrepTimeSliderValue(value);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
      }}>
      <View
        style={{
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Sıralama
        </CustomText>
      </View>

      <TouchableOpacity
        onPress={() => handleAlignment(0)}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          ...setAllHeights((height * 1) / 20),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={true ? 'medal-outline' : 'medal-outline'}
            color={'black'}
            size={(height * 0.6) / 20}
          />
          <CustomText
            style={{
              fontSize: (height * 0.43) / 20,
              paddingLeft: width * 0.025,
            }}>
            Önerilen (Varsayılan)
          </CustomText>
        </View>

        {alignment[0] && (
          <View>
            <Icon
              name={true ? 'checkmark-outline' : 'checkmark-outline'}
              color={themeSettings?.secondColor}
              size={(height * 0.8) / 20}
            />
          </View>
        )}
      </TouchableOpacity>
      {/* <Text>{alignment.toString()}</Text> */}

      <TouchableOpacity
        onPress={() => handleAlignment(1)}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          ...setAllHeights((height * 1) / 20),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={true ? 'flame-outline' : 'flame-outline'}
            color={'black'}
            size={(height * 0.6) / 20}
          />
          <CustomText
            style={{
              fontSize: (height * 0.43) / 20,
              paddingLeft: width * 0.025,
            }}>
            Popüler Restoranlar
          </CustomText>
        </View>

        {alignment[1] && (
          <View>
            <Icon
              name={true ? 'checkmark-outline' : 'checkmark-outline'}
              color={themeSettings?.secondColor}
              size={(height * 0.8) / 20}
            />
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleAlignment(2)}
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          ...setAllHeights((height * 1) / 20),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={true ? 'star-outline' : 'star-outline'}
            color={'black'}
            size={(height * 0.6) / 20}
          />
          <CustomText
            style={{
              fontSize: (height * 0.43) / 20,
              paddingLeft: width * 0.025,
            }}>
            Restoran Puanı
          </CustomText>
        </View>

        {alignment[2] && (
          <View>
            <Icon
              name={true ? 'checkmark-outline' : 'checkmark-outline'}
              color={themeSettings?.secondColor}
              size={(height * 0.8) / 20}
            />
          </View>
        )}
      </TouchableOpacity>

      {false && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            ...setAllHeights((height * 1) / 20),
          }}>
          <Icon
            name={true ? 'timer-outline' : 'timer-outline'}
            color={'black'}
            size={(height * 0.6) / 20}
          />
          <Text
            style={{
              fontSize: (height * 0.43) / 20,
              paddingLeft: width * 0.025,
            }}>
            Hazırlanma Süresi
          </Text>
        </View>
      )}

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Diğer Filtreler
        </CustomText>
      </View>

      <OtherFiltersCheckboxesComponent />

      <View
        style={{
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Minimum Paket Tutarı
        </CustomText>
      </View>

      <View
        style={{
          width: width * 0.8,
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
          marginBottom: height * 0.0125,
        }}>
        <View
          style={{
            marginTop: height * 0.025,
            marginLeft: width * 0.0125,
            left: width * 0.75 * (minBasketSliderValue[0] / 150),
          }}>
          <CustomText>{Math.round(minBasketSliderValue[0]) + ' TL'}</CustomText>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={150}
          trackClickable={true}
          minimumTrackTintColor={'black'}
          maximumTrackTintColor={themeSettings?.thirdColor}
          thumbTintColor={themeSettings?.secondColor}
          onSlidingComplete={handleMinBasketSlider}
          value={minBasketSliderValue}
          trackMarks={[0, 30, 60, 90, 120, 150]}
          step={30}

          // If we want to use slider with step values

          // minimumTrackStyle={{ backgroundColor: "black" }}
          // renderTrackMarkComponent={() => {
          //   return (
          //     <View
          //       style={{
          //         width: width * 0.02,
          //         height: height * 0.02,
          //         backgroundColor: 'red',
          //       }}
          //     />
          //   );
          // }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: width * 0.0125,
          }}>
          <CustomText>0 TL</CustomText>
          <CustomText>Tümü</CustomText>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Hazırlanma Süresi
        </CustomText>
      </View>

      <View
        style={{
          width: width * 0.8,
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
          marginBottom: height * 0.0125,
        }}>
        <View
          style={{
            marginTop: height * 0.025,
            marginLeft: width * 0.0125,
            left: width * 0.75 * (prepTimeSliderValue[0] / 24),
          }}>
          <CustomText>
            {Math.round(prepTimeSliderValue[0]) + ' Saat'}
          </CustomText>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={24}
          trackClickable={true}
          minimumTrackTintColor={'black'}
          maximumTrackTintColor={themeSettings?.thirdColor}
          thumbTintColor={themeSettings?.secondColor}
          onSlidingComplete={handlePrepTimeSlider}
          value={prepTimeSliderValue}
          trackMarks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]}
          step={2}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: width * 0.0125,
          }}>
          <CustomText>0 Saat</CustomText>
          <CustomText>Tümü</CustomText>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Uzaklık
        </CustomText>
      </View>

      <View
        style={{
          width: width * 0.8,
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <View
          style={{
            left: width * 0.75 * (distanceSliderValue[0] / 50),
            marginTop: height * 0.025,
            marginLeft: width * 0.0125,
          }}>
          <CustomText>{Math.round(distanceSliderValue[0]) + ' km'}</CustomText>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={50}
          trackMarks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
          step={5}
          trackClickable={true}
          minimumTrackTintColor={'black'}
          maximumTrackTintColor={themeSettings?.thirdColor}
          thumbTintColor={themeSettings?.secondColor}
          onSlidingComplete={handleDistanceSlider}
          value={distanceSliderValue}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: width * 0.0125,
          }}>
          <CustomText>0 km</CustomText>
          <CustomText>Tümü</CustomText>
        </View>
      </View>

      <View
        style={{
          marginTop: height * 0.0125,
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          Kategoriler
        </CustomText>
      </View>

      <View
        style={{
          ...setAllWidths('auto'),
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            ...setAllWidths('auto'),
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: 5,
          }}>
          {categories.map(item => {
            return (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  let helperState = [...selectedCategories];
                  const isSelected = helperState.some(x => x === item);
                  if (isSelected) {
                    helperState = helperState.filter(x => x !== item);
                  } else {
                    helperState.push(item);
                  }
                  setSelectedCategories(helperState);
                }}
                style={{
                  borderRadius: 7,
                  backgroundColor: selectedCategories.some(x => x === item)
                    ? themeSettings?.secondColor
                    : themeSettings?.thirdColor,
                  margin: 5,
                  height: 35,
                  padding: 5,
                  justifyContent: 'center',
                  // ...setAllHeights((height * 1.3) / 20),
                  // maxWidth: width * 0.4,
                  // padding: (height * 0.2) / 20,
                  // margin: (height * 0.2) / 20,
                }}>
                <CustomText
                  style={{
                    fontSize: 13,
                    color: selectedCategories.some(x => x === item)
                      ? 'white'
                      : 'black',
                  }}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          ...setAllHeights((height * 1.5) / 20),
        }}>
        <CustomText
          style={{
            fontSize: (height * 0.65) / 20,
            fontWeight: '700',
          }}>
          İçerikler
        </CustomText>
      </View>

      <SpecialIngredientsFiltersCheckboxesComponent />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: (height * 0.2) / 20,
          backgroundColor: themeSettings?.secondColor,
          width: width * 0.4,
          padding: width * 0.025,
        }}>
        <Pressable>
          <CustomText
            style={{
              color: themeSettings?.firstColor,
            }}>
            Uygula
          </CustomText>
        </Pressable>
      </View>
    </ScrollView>
  );
});

export default FilterScreen;
