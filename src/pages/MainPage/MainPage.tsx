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
import HistoryPage from '../ClientsPage/HistoryPage';
import {orderStyle} from '../ClientsPage/styles';

const height = Dimensions.get('screen').height;

type Props = {};

const MainPage = (props: Props) => {
  const [line, setLine] = useState(true);
  const [passengers, setPassengers] = useState(false);
  const [history, setHistory] = useState(false);

  return (
    <View style={{height: height}}>
      <View style={headerStyles.header}>
        <Text style={orderStyle.pageTitle}>
          {line && 'Очередь'}
          {history && 'История'}
          {passengers && 'Текущие пассажиры'}
        </Text>
      </View>
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <TouchableOpacity
            onPress={() => {
              setHistory(false);
              setPassengers(false);
              setLine(true);
            }}
            style={[
              orderStyle.headerBtn,
              !line && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>Очередь</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHistory(false);
              setPassengers(true);
              setLine(false);
            }}
            style={[
              orderStyle.headerBtn,
              !passengers && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              Текущие пассажиры
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHistory(true);
              setPassengers(false);
              setLine(false);
            }}
            style={[
              orderStyle.headerBtn,
              !history && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>История</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {line && <Line />}
          {history && <HistoryPage />}
          {passengers && <ClientPage />}
        </ScrollView>
      </View>
      <DriverDetails />
    </View>
  );
};

export default MainPage;
