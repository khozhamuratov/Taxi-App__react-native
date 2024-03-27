import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header/Header';

type Props = {};

const MainPage = (props: Props) => {
  return (
    <>
      <Header />
      <View>
        <Text>MainPage</Text>
      </View>
    </>
  );
};

export default MainPage;
