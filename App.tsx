import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import IsAuthorization from './src/authorization';
import Alert from './src/components/Alert/Alert';
import {alertStyle} from './src/components/Alert/styles';
import {store} from './src/redux/store';

import RemoteNotification from './src/RemoteNotifications';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <IsAuthorization />
      </NavigationContainer>
      <RemoteNotification />
      <View style={alertStyle.container}>
        <Alert />
      </View>
    </Provider>
  );
}

export default App;
