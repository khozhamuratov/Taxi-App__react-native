import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MainPage from './src/pages/MainPage';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      {/* <Text style={styles.textStyle}>Полат барин четкий кылып берди</Text> */}
      <MainPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'red',
  },
});

export default App;
