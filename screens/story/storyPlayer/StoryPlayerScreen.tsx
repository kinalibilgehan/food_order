import React, {
  Fragment,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import FastImage from 'react-native-fast-image';
import {
  setAllHeights,
  setAllWidths,
} from '../../../components/store/headers/StoreScreenStickyHeaderComponent';
import LayoutFullScreen from '../../layouts/LayoutFullScreen';
import {reduxstore} from '../../../reduxstore/reduxstore';
import {
  StoreStoryTypeEnum,
  StoryDto,
} from '../../../dtos/store/response/StoryOperationsResponseDto';
import agent from '../../../api/agent';
import {Globals} from '../../../globals';
import {useNavigate} from 'react-router-native';
import Video from 'react-native-video';
import WebView from 'react-native-webview';
import {Animated, View} from 'react-native';

const StoryPlayerScreen = memo(() => {
  const width = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.width,
  );
  const height = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.height,
  );
  const statusBarHeight = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.statusbarHeight,
  );
  const themeSettings = reduxstore.getState().targetEnvironment.ThemeSettings;
  const navigate = useNavigate();
  const videoRef = useRef<Video>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentStory, setCurrentStory] = useState<StoryDto | null>(null);
  const [allStories, setAllStories] = useState<StoryDto[]>([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await agent.FileUpload.GetStoryByStoreId(
        reduxstore.getState().mainScreen.selectedStore!.id!,
      );
      setAllStories(response.stories);
      if (response.stories[0].storyType === StoreStoryTypeEnum.Image) {
        setImageUrl(Globals.url.StoryFilePath + response.stories[0].storyUrl);
        setShowImageViewer(true);
        setCurrentStory(response.stories[0]);
      } else if (response.stories[0].storyType === StoreStoryTypeEnum.Video) {
        setVideoUrl(Globals.url.StoryFilePath + response.stories[0].storyUrl);
        setShowVideoPlayer(true);
        setCurrentStory(response.stories[0]);
      }
    };
    callApi();
  }, []);

  const animationArray = useRef<Animated.Value[]>([]).current;

  useMemo(() => {
    if (currentStory === null) {
      return;
    }
    setTimeout(() => {
      let nextStory = allStories.find(
        s => s.storyIndex === currentStory.storyIndex + 1,
      );
      if (nextStory) {
        console.log(nextStory);
        setCurrentStory(nextStory);
        if (nextStory.storyType === StoreStoryTypeEnum.Video) {
          setShowVideoPlayer(true);
          setVideoUrl(Globals.url.StoryFilePath + nextStory.storyUrl);
          setShowImageViewer(false);
          Animated.timing(animationArray[nextStory.storyIndex], {
            toValue: (width - 5) / allStories.length,
            duration: nextStory.storyDuration * 1000,
            useNativeDriver: false,
          }).start();
        }
        if (nextStory.storyType === StoreStoryTypeEnum.Image) {
          setImageUrl(Globals.url.StoryFilePath + nextStory.storyUrl);
          setShowImageViewer(true);
          setShowVideoPlayer(false);
          Animated.timing(animationArray[nextStory.storyIndex], {
            toValue: (width - 5) / allStories.length,
            duration: nextStory.storyDuration * 1000,
            useNativeDriver: false,
          }).start();
        }
      } else {
        navigate('/');
      }
    }, currentStory.storyDuration * 1000);
    animationArray.push(new Animated.Value(0));
    Animated.timing(animationArray[0], {
      toValue: (width - 5) / allStories.length,
      duration: currentStory.storyDuration * 1000,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStory]);

  return (
    <LayoutFullScreen backgroundColor="gray">
      <View
        style={{
          backgroundColor: 'white',
          marginTop: statusBarHeight,
          ...setAllHeights(height - statusBarHeight),
          ...setAllWidths(width),
          alignItems: 'center',
        }}>
        {allStories.length > 0 && (
          <View
            style={{
              position: 'absolute',
              width: width,
              flexDirection: 'row',
              zIndex: 5,
            }}>
            {allStories.map((s, index) => {
              animationArray.push(new Animated.Value(0));
              return (
                <Fragment key={s.storyUrl}>
                  <View
                    style={{
                      flex: 1,
                      width: width,
                    }}>
                    <Animated.View
                      style={{
                        width: animationArray[index],
                        height: 5,
                        backgroundColor: themeSettings?.secondColor,
                      }}
                    />
                  </View>
                </Fragment>
              );
            })}
          </View>
        )}
        {imageUrl && showImageViewer && imageUrl !== '' && (
          <FastImage
            style={{
              ...setAllHeights(height - statusBarHeight),
              ...setAllWidths(width),
            }}
            source={{
              uri: imageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        {videoUrl && showVideoPlayer && videoUrl !== '' && (
          <Video
            //poster="http://31.169.76.241:48003/images/application_images/bikepceLogo.png"
            maxBitRate={1}
            source={{uri: videoUrl}}
            ref={videoRef}
            onBuffer={(e: any) => {
              console.log(e);
            }}
            onError={(e: any) => {
              console.log(e, 'VideoError');
            }}
            style={{
              ...setAllHeights(height - statusBarHeight),
              ...setAllWidths(width),
            }}
            resizeMode="cover"
            onEnd={() => {
              //navigate('/');
            }}
          />
        )}
        <View
          style={{
            ...setAllHeights(height - statusBarHeight),
            ...setAllWidths(width),
            //alignItems: 'center',
            position: 'absolute',
          }}>
          <View
            //onPress={() => {
            //  //console.log('ŞAHMARANk');
            //  navigate('/');
            //}}
            style={{
              ...setAllHeights(height - statusBarHeight),
              ...setAllWidths(width),
            }}>
            {false && (
              <WebView
                scrollEnabled={false}
                originWhitelist={['*']}
                source={{
                  uri: 'http://192.168.1.232:48002/api/Story/GetHtml',
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  ...setAllHeights(height - statusBarHeight),
                  ...setAllWidths(width),
                  //alignItems: 'center',
                }}
              />
            )}
          </View>
        </View>
      </View>
    </LayoutFullScreen>
  );
});

export default StoryPlayerScreen;
