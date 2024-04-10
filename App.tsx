import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import IsAuthorization from './src/authorization';
import Alert from './src/components/Alert/Alert';
import {alertStyle} from './src/components/Alert/styles';
import {store} from './src/redux/store';

import LocalNotification from './src/localNotifications';
import RemoteNotification from './src/RemoteNotifications';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#141414'} />
      <NavigationContainer>
        <IsAuthorization />
      </NavigationContainer>
      <RemoteNotification />
      <Text> Push Notification!! </Text>
      <Button title={'Click Here'} onPress={LocalNotification} />
      <View style={alertStyle.container}>
        <Alert />
      </View>
    </Provider>
  );
}

export default App;
