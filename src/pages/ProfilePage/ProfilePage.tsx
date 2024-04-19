import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Appearance,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {logout, themeToggler} from '../../features/users/usersSlice';
import {useAppSelector} from '../../redux/hooks';
import {headerStyles, lightTheme} from '../../styles';
import HistoryPage from '../ClientsPage/HistoryPage';
import {orderStyle} from '../ClientsPage/styles';
import FeedBackPage from '../FeedbackPage/FeedBackPage';
import {ProfileStyles} from './styles';

const height = Dimensions.get('screen').height;

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

  const profile = {
    balance: '25000',
    first_name: 'Polat',
    id: 2,
    last_name: 'Beknazarov',
    passengers_count: 4,
    phone_number: '+998933640767',
    username: '95 X 245 HA',
  };

  const [appVersion, setAppVersion] = useState('');
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [historyData, setHistoryData] = useState<UserData | null>(null);
  const refRBSheet: React.MutableRefObject<any> = useRef();
  const refRBSheet2: React.MutableRefObject<any> = useRef();

  const getHistoryData = (token: any) => {
    axios
      .get(`https://api.1s-taxi.uz/api/v1/orders/history/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setHistoryData(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const {themeColor} = useAppSelector(select => select.themeColor);

  const toggleSwitch = () => {
    isEnabled
      ? dispatch(themeToggler('light'))
      : dispatch(themeToggler('dark'));

    console.log(themeColor);
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    dispatch(themeToggler(colorScheme));

    if (colorScheme === 'dark') {
      setIsEnabled(true); // true means dark
    } else {
      setIsEnabled(false); // false means light
    }
  }, []);

  useEffect(() => {
    async function fetchApp() {
      const version = DeviceInfo.getVersion();
      const token = await AsyncStorage.getItem('access');
      setProfileData(profile);
      setAppVersion(version);
      // axios
      //   .get('https://api.1s-taxi.uz/auth/users/me', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then(res => {
      //     setProfileData(res.data);
      //     if (res.data) {
      //       getHistoryData(token);
      //     }
      //   })
      //   .catch(err => console.log(err));
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
        <View
          style={[
            headerStyles.header,
            themeColor === 'light' && lightTheme.lightBg,
          ]}>
          <Text
            style={[
              orderStyle.pageTitle,
              themeColor === 'light' && lightTheme.lightText,
            ]}>
            Профиль
          </Text>
        </View>
        <View style={ProfileStyles.container}>
          <View style={ProfileStyles.userInfo}>
            <Icon
              size={100}
              color={themeColor === 'dark' ? 'white' : 'black'}
              name="person-circle"
            />
            <View style={ProfileStyles.userData}>
              {profileData ? (
                <>
                  <Text
                    style={[
                      headerStyles.title,
                      {marginBottom: 10},
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {profileData.first_name} {profileData.last_name}
                  </Text>
                  <Text
                    style={[
                      ProfileStyles.carNumber,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {profileData.phone_number}
                  </Text>
                  <Text
                    style={[
                      ProfileStyles.carNumber,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
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
                    <Text style={[headerStyles.title]}>
                      {Number(profileData.balance)}
                    </Text>
                    <Text style={{color: '#CCC'}}>Баланс</Text>
                  </View>
                  <View style={ProfileStyles.card}>
                    <Text style={[headerStyles.title]}>
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
              <View style={ProfileStyles.item}>
                <Text style={ProfileStyles.itemTxt}>Тёмный режим</Text>
                <Switch
                  trackColor={{false: 'light', true: 'dark'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
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
