import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Line from '../../components/Line/Line';
import {
  listUsers,
  setFreeOrders,
  setProfileData,
} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {height, width} from '../../styles';
import {close} from '../../websocketMiddlware';
import ClientPage from '../ClientsPage/ClientPage';
import {orderStyle} from '../ClientsPage/styles';

const MainPage = () => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [line, setLine] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchApp() {
      const token = await AsyncStorage.getItem('access');
      axios
        .get('https://1s-taxi.uz/auth/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          dispatch(setProfileData(res.data));
        })
        .catch(async err => {
          console.log(err);
        });
    }
    fetchApp();
  }, []);

  return (
    <View style={{height: height}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setLine(false);
          }}
          style={[
            orderStyle.headerBtn,
            line && {opacity: 0.3, borderBottomWidth: 0},
            themeColor === 'light' && {borderBottomColor: 'black'},
          ]}>
          <Text
            style={{
              color: themeColor === 'light' ? 'black' : 'white',
              fontWeight: '600',
            }}>
            Очередь
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const token = await AsyncStorage.getItem('access');
            setLoader(true);
            axios
              .get(`https://1s-taxi.uz/api/v1/orders/current/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(res => {
                setLoader(false);
                setClientsData(res.data);
              })
              .catch(async err => {
                dispatch(setFreeOrders([]));
                dispatch(listUsers([]));
                close();
              });
            setLine(true);
          }}
          style={[
            orderStyle.headerBtn,
            !line && {opacity: 0.3, borderBottomWidth: 0},
            themeColor === 'light' && {borderBottomColor: 'black'},
          ]}>
          <Text
            style={{
              color: themeColor === 'light' ? 'black' : 'white',
              fontWeight: '600',
            }}>
            Последние клиенты
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!line ? (
          <Line />
        ) : loader ? (
          <View
            style={{
              width: width,
              height: height - 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'gray'} size={25} />
          </View>
        ) : (
          <ClientPage clientsData={clientsData} />
        )}
      </ScrollView>
    </View>
  );
};

export default MainPage;
