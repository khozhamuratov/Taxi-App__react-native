import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {headerStyles} from '../../components/Header/styles';
import DriverDetails from '../../components/Line/Driver/DriverDetails';
import Line from '../../components/Line/Line';
import ClientPage from '../ClientsPage/ClientPage';
import {orderStyle} from '../ClientsPage/styles';

const height = Dimensions.get('screen').height;

type Props = {};

const MainPage = (props: Props) => {
  const [line, setLine] = useState(false);

  return (
    <View style={{height: height}}>
      <View style={headerStyles.header}>
        <Text style={orderStyle.pageTitle}>
          {!line ? 'Очередь' : 'Текущие пассажиры'}
        </Text>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setLine(false);
            }}
            style={[
              orderStyle.headerBtn,
              line && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>Очередь</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLine(true);
            }}
            style={[
              orderStyle.headerBtn,
              !line && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              Текущие пассажиры
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!line ? <Line /> : <ClientPage />}
        </ScrollView>
      </View>
      <DriverDetails />
    </View>
  );
};

export default MainPage;
