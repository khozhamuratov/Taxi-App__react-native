import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DriverDetails from '../../components/Line/Driver/DriverDetails';
import Line from '../../components/Line/Line';
import {headerStyles} from '../../styles';
import ClientPage from '../ClientsPage/ClientPage';
import {orderStyle} from '../ClientsPage/styles';

const height = Dimensions.get('screen').height;

type Props = {};

const MainPage = (props: Props) => {
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [line, setLine] = useState(false);

  return (
    <View style={{height: height}}>
      <View style={headerStyles.header}>
        <Text style={orderStyle.pageTitle}>
          {!line ? 'Очередь' : 'Последние клиенты'}
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
            onPress={async () => {
              const token = await AsyncStorage.getItem('access');
              axios
                .get(`https://api.1s-taxi.uz/api/v1/orders/current`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(res => {
                  setClientsData(res.data);
                  console.log(res.data);
                })
                .catch(err => console.log(err));
              setLine(true);
            }}
            style={[
              orderStyle.headerBtn,
              !line && {opacity: 0.3, borderBottomWidth: 0},
            ]}>
            <Text style={{color: 'white', fontWeight: '600'}}>
              Последние клиенты
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!line ? <Line /> : <ClientPage clientsData={clientsData} />}
        </ScrollView>
      </View>
      <DriverDetails />
    </View>
  );
};

export default MainPage;
