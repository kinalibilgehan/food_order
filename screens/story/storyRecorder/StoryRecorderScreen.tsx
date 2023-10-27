import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  CameraCaptureError,
  PhotoFile,
  RecordVideoOptions,
  TakePhotoOptions,
  useCameraDevices,
} from 'react-native-vision-camera';
import {Button, Text, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import Video from 'react-native-video';
import {
  setAllHeights,
  setAllWidths,
} from '../../../components/store/headers/StoreScreenStickyHeaderComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../../reduxstore/reduxhooks';
import LayoutFullScreen from '../../layouts/LayoutFullScreen';
import agent from '../../../api/agent';
import FastImage from 'react-native-fast-image';

const StoryRecorderScreen = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const videoRef = useRef<Video>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showCam, setshowCam] = useState(true);

  const timeRef = useRef<any>(null);
  const recordButtonPressedRef = useRef<boolean>(false);
  const isRecordingRef = useRef<boolean>(false);

  const width = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.width,
  );
  const height = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.height,
  );
  const statusBarHeight = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.statusbarHeight,
  );

  const uploadFile = async () => {
    if (showImage) {
      const imageFile = {
        uri: imageUrl,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      await agent.FileUpload.AddNewStory(imageFile);
    } else if (showVideoPlayer) {
      const videoFile = {
        uri: videoUrl,
        type: 'video/mp4',
        name: 'video.mp4',
      };
      await agent.FileUpload.AddNewStory(videoFile, videoDuration);
    }
  };

  useEffect(() => {
    const perm = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };
    perm();
    Camera.getCameraPermissionStatus().then(() => {
      setPermissions(true);
    });
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;
  if (!device || !permissions) {
    return null;
  }

  const handlePressInRecordButton = () => {
    timeRef.current = new Date();
    recordButtonPressedRef.current = true;
    setshowCam(true);
    setShowImage(false);
    setShowVideoPlayer(false);
    setTimeout(async () => {
      if (recordButtonPressedRef.current) {
        if (!isRecordingRef.current) {
          const options: RecordVideoOptions = {
            fileType: 'mp4',
            flash: 'off',
            onRecordingFinished: video => {
              console.log(video);
              isRecordingRef.current = false;
              setVideoUrl(video.path);
              setVideoDuration(video.duration);
              setShowVideoPlayer(true);
              setshowCam(false);
              setShowImage(false);
            },
            onRecordingError: (error: CameraCaptureError) => {
              isRecordingRef.current = false;
              console.log(error, 'cameraError');
            },
          };
          isRecordingRef.current = true;
          cameraRef.current!.startRecording(options);
        }
      } else {
        const options: TakePhotoOptions = {
          flash: 'off',
        };
        const photo: PhotoFile = await cameraRef.current!.takePhoto(options);
        setImageUrl('file://' + photo.path);

        setShowImage(true);
        setshowCam(false);
        setShowVideoPlayer(false);
      }
    }, 100);
  };
  const handlePressOutRecordButton = async () => {
    recordButtonPressedRef.current = false;
    if (isRecordingRef.current) {
      await cameraRef.current!.stopRecording();
    }
  };

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
        <Camera
          ref={cameraRef}
          style={{
            height: showCam ? height - statusBarHeight : 0,
            ...setAllWidths(width),
          }}
          device={device}
          isActive={true}
          video={true}
          audio={true}
          photo={true}
          fps={30}
        />
        {videoUrl && showVideoPlayer && videoUrl !== '' && (
          <Video
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
            repeat
          />
        )}
        {imageUrl && showImage && imageUrl !== '' && (
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
        <View style={{position: 'absolute', top: 1, left: 1}}>
          <Button
            title="back"
            onPress={() => {
              navigate(-1);
            }}
          />
          <Button
            title="upload"
            onPress={() => {
              uploadFile();
            }}
          />
        </View>
        <View style={{position: 'absolute', bottom: 10}}>
          <TouchableOpacity
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPressIn={handlePressInRecordButton}
            onPressOut={handlePressOutRecordButton}>
            <Text>Kayıt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutFullScreen>
  );
};
export default StoryRecorderScreen;
