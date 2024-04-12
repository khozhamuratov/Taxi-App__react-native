import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {headerStyles} from '../../components/Header/styles';
import {logout} from '../../features/users/usersSlice';
import HistoryPage from '../ClientsPage/HistoryPage';
import {orderStyle} from '../ClientsPage/styles';
import FeedBackPage from '../FeedbackPage/FeedBackPage';
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

interface UserData {
  balance: string;
  first_name: string;
  id: number;
  last_name: string;
  passengers_count: number;
  phone_number: string;
  username: string;
}

const MenuItems = [
  {
    label: 'История пассажиров',
    icon: 'people',
    routeName: 'History',
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
    Alert.alert('Выйти из аккаунта', 'Вы точно хотите выйти?', [
      {
        text: 'Отмена',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Выйти из аккаунта',
        onPress: async () => {
          await AsyncStorage.removeItem('access');
          await AsyncStorage.removeItem('refresh');
          dispatch(logout());
        },
      },
    ]);
  };
  const [appVersion, setAppVersion] = useState('');
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [historyData, setHistoryData] = useState<UserData | null>(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const getHistoryData = (token: any, user_id: string) => {
    axios
      .get(`http://192.168.100.8:8080/api/v1/order/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setHistoryData(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    async function fetchApp() {
      const version = DeviceInfo.getVersion();
      const token = await AsyncStorage.getItem('access');
      setAppVersion(version);
      axios
        .get('http://192.168.100.8:8080/auth/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setProfileData(res.data);
          if (res.data) {
            getHistoryData(token, res.data.id);
          }
        })
        .catch(err => console.log(err));
    }

    fetchApp();
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
              {profileData ? (
                <>
                  <Text style={[ProfileStyles.title, {marginBottom: 10}]}>
                    {profileData.first_name} {profileData.last_name}
                  </Text>
                  <Text style={ProfileStyles.carNumber}>
                    {profileData.phone_number}
                  </Text>
                  <Text style={ProfileStyles.carNumber}>
                    {profileData.username}
                  </Text>
                </>
              ) : (
                <ActivityIndicator size={20} color="gray" />
              )}
            </View>
          </View>
          <ScrollView style={ProfileStyles.itemsContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {profileData ? (
                <>
                  <View style={ProfileStyles.card}>
                    <Text style={[ProfileStyles.title]}>
                      {Number(profileData.balance)}
                    </Text>
                    <Text style={{color: '#CCC'}}>Баланс</Text>
                  </View>
                  <View style={ProfileStyles.card}>
                    <Text style={[ProfileStyles.title]}>
                      {profileData.passengers_count}
                    </Text>
                    <Text style={{color: '#CCC'}}>Клиентов</Text>
                  </View>
                </>
              ) : (
                <></>
              )}
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
              {MenuItems.map((touch, index) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => {
                    touch.routeName === 'History'
                      ? refRBSheet.current.open()
                      : refRBSheet2.current.open();
                  }}>
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
          <RBSheet
            ref={refRBSheet}
            useNativeDriver={false}
            height={600}
            closeOnPressBack={true}
            dragOnContent={false}
            closeOnDragDown={false}
            dragFromTopOnly={true}
            draggable={true}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#FFF',
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#212121',
              },
            }}
            customModalProps={{
              animationType: 'slide',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}>
            <HistoryPage historyData={historyData} />
          </RBSheet>
          <RBSheet
            ref={refRBSheet2}
            useNativeDriver={false}
            height={230}
            closeOnPressBack={true}
            dragOnContent={false}
            closeOnDragDown={false}
            dragFromTopOnly={true}
            draggable={true}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#FFF',
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#212121',
              },
            }}
            customModalProps={{
              animationType: 'slide',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}>
            <FeedBackPage />
          </RBSheet>
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
