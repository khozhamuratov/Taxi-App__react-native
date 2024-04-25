import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
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
import FeedBackPage from '../FeedbackPage/FeedBackPage';
import {ProfileStyles} from './styles';

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
  const STYLES: StatusBarStyle[] = ['default', 'dark-content', 'light-content'];
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );

  const colorScheme = useColorScheme();

  const toggleSwitch = () => {
    if (isEnabled) {
      dispatch(themeToggler('light'));
      console.log(colorScheme);
      setStatusBarStyle(STYLES[1]);
    } else {
      dispatch(themeToggler('dark'));
      setStatusBarStyle(STYLES[2]);
      console.log(themeColor);
    }
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    async function fetchApp() {
      const version = DeviceInfo.getVersion();
      const token = await AsyncStorage.getItem('access');
      setAppVersion(version);
      axios
        .get('https://1s-taxi.uz/auth/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setProfileData(res.data);
          if (res.data) {
            getHistoryData(token);
          }
        })
        .catch(err => console.log(err));
    }

    themeColor === 'light'
      ? setStatusBarStyle(STYLES[1])
      : setStatusBarStyle(STYLES[2]);

    themeColor === 'light' ? setIsEnabled(false) : setIsEnabled(true);

    fetchApp();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={statusBarStyle} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={ProfileStyles.itemsContainer}>
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
                    <Text
                      style={[
                        headerStyles.title,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      {Number(profileData.balance)}
                    </Text>
                    <Text style={{color: 'gray'}}>Баланс</Text>
                  </View>
                  <View style={ProfileStyles.card}>
                    <Text
                      style={[
                        headerStyles.title,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      {profileData.passengers_count}
                    </Text>
                    <Text style={{color: 'gray'}}>Клиентов</Text>
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
                  color: themeColor === 'light' ? '#141414' : 'white',
                  marginBottom: 15,
                }}>
                Действия
              </Text>
              {MenuItems.map((touch, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    touch.routeName === 'History'
                      ? refRBSheet.current.open()
                      : refRBSheet2.current.open();
                  }}>
                  <View style={ProfileStyles.item}>
                    <Text
                      style={[
                        ProfileStyles.itemTxt,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      {touch.label}
                    </Text>
                    <Icon
                      size={24}
                      name={touch.icon}
                      color={themeColor === 'light' ? '#141414' : 'white'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
              <View style={ProfileStyles.item}>
                <Text
                  style={[
                    ProfileStyles.itemTxt,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
                  Тёмный режим
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: 'gray'}}
                  thumbColor={isEnabled ? 'white' : '#141414'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <TouchableOpacity onPress={() => handleLogout()}>
                <View style={ProfileStyles.item}>
                  <Text
                    style={[
                      ProfileStyles.itemTxt,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    Выйти
                  </Text>
                  <Icon
                    size={24}
                    name="log-out"
                    color={themeColor === 'light' ? '#141414' : 'white'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
                backgroundColor: themeColor === 'light' ? '#000' : '#fff',
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: themeColor === 'light' ? '#fff' : '#212121',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            }}
            customModalProps={{
              animationType: 'fade',
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
                backgroundColor: themeColor === 'light' ? '#000' : '#fff',
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: themeColor === 'light' ? '#fff' : '#212121',

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              },
            }}
            customModalProps={{
              animationType: 'fade',
              statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
              enabled: false,
            }}>
            <FeedBackPage />
          </RBSheet>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
