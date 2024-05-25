import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
      console.error(error);
    }
  }
};

const RemoteNotification = () => {
  useEffect(() => {
    checkApplicationPermission();
    PushNotification.getChannels(function (channel_ids) {
      channel_ids.forEach(id => {
        PushNotification.deleteChannel(id);
      });
    });
    PushNotification.configure({
      soundName: 'sound.mp3',
      onNotification: function (notification) {
        const {message, title, id} = notification;
        let strTitle: string = JSON.stringify(title).split('"').join('');
        let strBody: string = JSON.stringify(message).split('"').join('');
        const key: string = JSON.stringify(id).split('"').join('');
        PushNotification.createChannel({
          channelId: key,
          channelName: 'remote messasge',
          channelDescription: 'Notification for remote message',
          importance: 4,
          vibrate: true,
          soundName: './sound.mp3',
        });
        PushNotification.localNotification({
          channelId: key, //this must be same with channelId in createchannel
          title: strTitle,
          message: strBody,
          soundName: './sound.mp3',
        });
      },
      senderID: '897648259596',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};
export default RemoteNotification;
