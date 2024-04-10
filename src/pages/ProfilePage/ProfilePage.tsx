import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {headerStyles} from '../../components/Header/styles';
import {logout} from '../../features/users/usersSlice';
import {orderStyle} from '../ClientsPage/styles';
import {ProfileStyles} from './styles';

const height = Dimensions.get('screen').height;

const driverProfileData = {
  id: 5,
  first_name: 'Владимир',
  last_name: 'Иосифович',
  car_number: '95 G 411 GA',
  phoneNumber: '+998 91 303 71 13',
  passengers: 0,
  balance: 25000,
};

const MenuItems = [
  {
    label: 'История пассажиров',
    icon: 'people',
    routeName: 'History',
  },
  {
    label: 'История пополнений',
    icon: 'wallet',
    routeName: 'BalanceHistory',
  },
  {
    label: 'Обратная связь',
    icon: 'shield-checkmark',
    routeName: 'Feedback',
  },
];

const ProfilePage = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('refresh');
    dispatch(logout());
  };
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    async function fetchAppVersion() {
      const version = DeviceInfo.getVersion();
      setAppVersion(version);
    }

    fetchAppVersion();
  }, []);
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: height - 85,
      }}>
      <View>
        <View style={headerStyles.header}>
          <Text style={orderStyle.pageTitle}>Профиль</Text>
        </View>
        <View style={ProfileStyles.container}>
          <View style={ProfileStyles.userInfo}>
            <Icon name="person-circle" size={80} color={'white'} />
            <View style={ProfileStyles.userData}>
              <Text style={[ProfileStyles.title, {marginBottom: 10}]}>
                {driverProfileData.first_name} {driverProfileData.last_name}
              </Text>
              <Text style={ProfileStyles.carNumber}>
                {driverProfileData.phoneNumber}
              </Text>
              <Text style={ProfileStyles.carNumber}>
                {driverProfileData.car_number}
              </Text>
            </View>
          </View>
          <ScrollView style={ProfileStyles.itemsContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // borderBottomWidth: 4,
                // borderTopWidth: 4,
                // borderBottomColor: '#212121',
                // borderTopColor: '#212121',
              }}>
              <View style={ProfileStyles.card}>
                <Text style={[ProfileStyles.title]}>
                  {driverProfileData.balance}
                </Text>
                <Text style={{color: '#CCC'}}>Баланс</Text>
              </View>
              <View style={ProfileStyles.card}>
                <Text style={[ProfileStyles.title]}>
                  {driverProfileData.passengers}
                </Text>
                <Text style={{color: '#CCC'}}>Клиентов</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: 15,
                }}>
                Действия
              </Text>
              {MenuItems.map(touch => (
                <TouchableHighlight onPress={() => console.log(touch)}>
                  <View style={ProfileStyles.item}>
                    <Text style={ProfileStyles.itemTxt}>{touch.label}</Text>
                    <Icon size={24} name={touch.icon} color={'white'} />
                  </View>
                </TouchableHighlight>
              ))}
              <TouchableHighlight onPress={() => handleLogout()}>
                <View style={ProfileStyles.item}>
                  <Text style={ProfileStyles.itemTxt}>Выйти</Text>
                  <Icon size={24} name="log-out" color={'white'} />
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'gray', fontSize: 12}}>
          Версия приложения {appVersion}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
