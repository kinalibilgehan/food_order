import React from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-vector-icons/Icon';
import agent from '../../../api/agent';
import CustomText from '../../../components/general/text/CustomText';
import CustomTextInput from '../../../components/general/text/CustomTextInput';
import {StoreOperationsResponseDto} from '../../../dtos/store/response/storeOperationsResponseDto';
import {Globals} from '../../../globals';
import {reduxstore} from '../../../reduxstore/reduxstore';

const StoreAddReviewScreen = () => {
  /* APP SETTINGS */
  const height =
    reduxstore.getState().targetEnvironment.AppScreenDimensions
      .middleApplicationBodyHeight;
  const width =
    reduxstore.getState().targetEnvironment.AppScreenDimensions.width;
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;

  /* STATE VARIABLES */
  const selectedOrder =
    reduxstore.getState().UserPastOrderDetails.selectedOrder;

  const [selectedStore, setSelectedStore] =
    useState<StoreOperationsResponseDto>();

  const selectedStoreImageUrl =
    Globals.url.STOREIMAGEPATH + selectedStore?.storeDtos[0].headerImageUrl;
  const avatarImageUrl =
    'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png';

  const [orderReviewStars, setOrderReviewStars] = useState<number>(0);
  const [orderReviewNote, setOrderReviewNote] = useState<string>('');
  const [orderReviewNoteLength, setOrderReviewNoteLength] = useState<number>(0);

  // const;

  /* METHODS */
  const handleGetStoreById = async (storeId: string) => {
    const store = await agent.Store.getStoreById(storeId);
    setSelectedStore(store);
  };

  const handleReviewStarPress = (starNumber: number) => {
    setOrderReviewStars(starNumber);
    console.log(orderReviewStars);
  };

  const handleOrderReviewNote = (note: string) => {
    setOrderReviewNote(note);
    console.log(note);
  };

  const handleOrderReviewNoteLength = (length: number) => {
    setOrderReviewNoteLength(length);
  };
  /* ########## */

  useEffect(() => {
    handleGetStoreById(selectedOrder?.basket.basketProperties.storeId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /* PAGE CONTAINER */
    <View
      style={{
        position: 'relative',
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
        height: height,
      }}>
      {/* STORE INFORMATION CONTAINER */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FastImage
          style={{
            width: '25%',
            height: '25%',
            borderRadius: 100,
            aspectRatio: 1,
          }}
          source={{
            uri: selectedStoreImageUrl ?? avatarImageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            marginLeft: width * 0.05,
          }}>
          <CustomText
            style={{
              fontSize: height * 0.03,
              fontWeight: '500',
              marginBottom: height * 0.0125,
            }}>
            {selectedStore?.storeDtos[0].name}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={'#FFB543'}
              size={height * 0.02}
            />
            <CustomText style={{marginRight: width * 0.02}}>
              {selectedStore?.storeDtos[0].storeScore?.avarageScore}
            </CustomText>
            <CustomText>
              {selectedStore?.storeDtos[0].storeScores.length + ' Yorum'}
            </CustomText>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: height * 0.025,
          marginBottom: height * 0.0125,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.secondColor,
        }}
      />

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            fontSize: height * 0.02,
            marginBottom: height * 0.0125,
          }}>
          Siparişinizden ne kadar memnun kaldınız?
        </CustomText>

        {/* STAR REVIEW CONTAINER */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => handleReviewStarPress(1)}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={orderReviewStars >= 1 ? '#FFB543' : '#C5C5C5'}
              size={height * 0.04}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReviewStarPress(2)}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={orderReviewStars >= 2 ? '#FFB543' : '#C5C5C5'}
              size={height * 0.04}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReviewStarPress(3)}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={orderReviewStars >= 3 ? '#FFB543' : '#C5C5C5'}
              size={height * 0.04}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReviewStarPress(4)}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={orderReviewStars >= 4 ? '#FFB543' : '#C5C5C5'}
              size={height * 0.04}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReviewStarPress(5)}>
            <Icon
              name={true ? 'star-sharp' : 'star-sharp'}
              color={orderReviewStars >= 5 ? '#FFB543' : '#C5C5C5'}
              size={height * 0.04}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: height * 0.025,
          marginBottom: height * 0.0375,
          borderBottomWidth: height * 0.0025,
          borderColor: themeSettings?.thirdColor,
        }}
      />

      <View
        /* ORDER REVIEW NOTE */
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <CustomText
          style={{
            marginBottom: height * 0.0125,
            fontSize: height * 0.0225,
            fontWeight: '500',
          }}>
          Birkaç kelimeyle tecrübeni aktarmak ister misin?
        </CustomText>
        <CustomTextInput
          maxLength={160}
          onChangeText={e => {
            handleOrderReviewNote(e);
            handleOrderReviewNoteLength(e.length);
          }}
          style={{
            backgroundColor: themeSettings?.thirdColor,
            height: height * 0.2,
            width: width * 0.9,
            borderRadius: 20,
            textAlignVertical: 'top',
          }}
          placeholder="Herşey çok güzeldi elinize sağlık."
          multiline={true}
        />
        <CustomText
          style={{
            position: 'absolute',
            right: width * 0.05,
            bottom: 0,
          }}>
          {orderReviewNoteLength + '/160'}
        </CustomText>
      </View>

      <View
        style={{
          width: width * 0.95,
          position: 'absolute',
          bottom: height * 0.0125,
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.8,
            height: height * 0.05,
            backgroundColor: themeSettings?.secondColor,
            borderRadius: 10,
          }}>
          <CustomText
            style={{
              color: 'white',
              fontSize: height * 0.025,
            }}>
            Yorum Yap
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreAddReviewScreen;
