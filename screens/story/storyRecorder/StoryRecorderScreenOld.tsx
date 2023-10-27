import React, {useEffect, useRef, useState} from 'react';
import {
  Camera,
  RecordVideoOptions,
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
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import agent from '../../../api/agent';

const StoryRecorderScreenOld = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const videoRef = useRef<Video>(null);

  const [url, setUrl] = useState('');
  const [showCam, setshowCam] = useState(true);

  const width = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.width,
  );
  const height = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.height,
  );

  const statusBarHeight = useAppSelector(
    data => data.targetEnvironment.AppScreenDimensions.statusbarHeight,
  );

  const addTextToVideo = (url1: string) => {
    let url2 = url1.replace('.mp4', '1.mp4');
    FFmpegKit.executeAsync(
      `-i ${url1} -b:v 5000k -vf "drawtext=text='${'Yazıyı Yazdırdık Da Video Encoding Öğrenmeden Olmaz Bu İş'}':fontfile=/system/fonts/Roboto-Regular.ttf:fontsize=24:fontcolor=white:x=200:y=200:borderw=2:bordercolor=black" ${url2}`,
      //`-i ${url1} -vf "drawtext=text=Neha:fontcolor=black:fontSize=20:x=0:y=30" ${url2}`,
      ///Users/basarmemis/Desktop/homemadeboarding/homemadeboarding_client/homemadeboardingapp/font/Poppins-Black.ttf
      async session => {
        const returnCode: ReturnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          setUrl(url2);
          setshowCam(false);
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
        } else {
          console.log(returnCode);
          // ERROR
        }
      },
    );
  };

  const uploadVideo = async () => {
    await agent.FileUpload.AddNewStory(url);
  };

  useEffect(() => {
    const perm = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
      //const devices2 = await Camera.getAvailableCameraDevices();
      //console.log(devices2);
    };
    perm();
    Camera.getCameraPermissionStatus().then(() => {
      setPermissions(true);
    });
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;
  if (!device || !permissions) {
    //console.log(device);
    return null;
  }
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
          fps={30}
        />
        {url && !showCam && url !== '' && (
          <Video
            source={{uri: url}} // Can be a URL or a local file.
            ref={videoRef} // Store reference
            onBuffer={(e: any) => {
              console.log(e);
            }} // Callback when remote video is buffering
            onError={(e: any) => {
              console.log(e, 'VideoError');
            }} // Callback when video cannot be loaded
            style={{
              ...setAllHeights(height - statusBarHeight),
              ...setAllWidths(width),
            }}
            resizeMode="cover"
            repeat
            //poster="https://i.stack.imgur.com/GsDIl.jpg"
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
              uploadVideo();
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
            onPressIn={() => {
              setshowCam(true);
              const options: RecordVideoOptions = {
                fileType: 'mp4',
                flash: 'on',
                onRecordingFinished: video => {
                  setUrl(video.path);
                  //addTextToVideo(video.path);
                  setshowCam(false);
                },
                onRecordingError: error => console.log(error, 'cameraError'),
              };
              cameraRef.current!.startRecording(options);
            }}
            onPressOut={async () => {
              await cameraRef.current!.stopRecording();
            }}>
            <Text>Kayıt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutFullScreen>
  );
};
export default StoryRecorderScreenOld;
