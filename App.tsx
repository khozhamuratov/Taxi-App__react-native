import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, View} from 'react-native';
import Alert from './src/components/Alert/Alert';
import {alertStyle} from './src/components/Alert/styles';
import Tabs from './src/Tabs';

function App(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#141414'} />
      <Tabs />
      <View style={alertStyle.container}>
        <Alert />
      </View>
    </NavigationContainer>
  );
}

export default App;
