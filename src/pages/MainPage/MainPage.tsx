import React, {useState} from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import Header from '../../components/Header/Header';
import DriverDetails from '../../components/Line/Driver/DriverDetails';
import Line from '../../components/Line/Line';
import {mainPageStyles} from './styles';

const height = Dimensions.get('screen').height;

type Props = {};

const MainPage = (props: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={{height: height}}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}>
        <Text style={mainPageStyles.pageTitle}>Очередь:</Text>
        <Line setIsActive={setIsActive} />
      </ScrollView>
      <DriverDetails isActive={isActive} setIsActive={setIsActive} />
    </View>
  );
};

export default MainPage;
