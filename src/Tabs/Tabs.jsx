import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../pages/MainPage/MainPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import WorkPage from '../pages/WorkPage/WorkPage';
import {useAppSelector} from '../redux/hooks';

const Tab = createBottomTabNavigator();

const Tabs = props => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: themeColor === 'dark' ? '#141414' : '#fff',
      }}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: themeColor === 'dark' ? 'white' : '#141414',
        tabBarActiveTintColor: themeColor === 'dark' ? 'white' : '#212121',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
          borderTopWidth: 0.5,
          borderTopColor: themeColor === 'dark' ? '#00000000' : '#CCC',
          backgroundColor: themeColor === 'light' ? 'white' : '#212121',
        },
        headerStyle: {
          backgroundColor: themeColor === 'light' ? 'white' : '#141414',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Очередь') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person';
          } else if (route.name === 'Работа') {
            iconName = focused ? 'car' : 'car';
          }

          return (
            <Icon
              style={{marginTop: 5}}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Очередь" component={MainPage} />
      <Tab.Screen name="Работа" component={WorkPage} />
      <Tab.Screen name="Профиль" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default Tabs;
