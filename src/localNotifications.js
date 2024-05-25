import PushNotification from 'react-native-push-notification';

const LocalNotification = message => {
  const key = Date.now().toString();
  PushNotification.createChannel({
    channelId: key,
    channelName: 'Local messasge',
    channelDescription: 'Notification for Local message',
    importance: 4,
    vibrate: true,
  });
  PushNotification.localNotification({
    channelId: key,
    title: 'Примите заказ',
    message: message,
  });
};

export default LocalNotification;
