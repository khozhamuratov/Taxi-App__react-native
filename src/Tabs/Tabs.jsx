import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../pages/MainPage/MainPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import WorkPage from '../pages/WorkPage/WorkPage';
import {useAppSelector} from '../redux/hooks';
import {tabStyles} from './styles';

const Tab = createBottomTabNavigator();

const Tabs = props => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: themeColor === 'dark' ? '#141414' : '#FFF',
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#17161b',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#222222',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            if (route.name === 'Home') {
              color = focused ? '#f1f1f3' : '#424242';
            }

            return (
              <>
                <Icon name="list-outline" size={30} color={color} />
                <Text
                  style={[
                    tabStyles.tabTxt,
                    focused ? tabStyles.focused : null,
                  ]}>
                  Очередь
                </Text>
              </>
            );
          },
        })}
        name="Home"
        component={MainPage}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            if (route.name === 'Work') {
              color = focused ? '#f1f1f3' : '#424242';
            }

            return (
              <>
                <Icon name="car" size={25} color={color} />
                <Text
                  style={[
                    tabStyles.tabTxt,
                    focused ? tabStyles.focused : null,
                  ]}>
                  Работа
                </Text>
              </>
            );
          },
        })}
        name="Work"
        component={WorkPage}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            if (route.name === 'Settings') {
              color = focused ? '#f1f1f3' : '#424242';
            }

            return (
              <>
                <Icon name="person" size={25} color={color} />
                <Text
                  style={[
                    tabStyles.tabTxt,
                    focused ? tabStyles.focused : null,
                  ]}>
                  Профиль
                </Text>
              </>
            );
          },
        })}
        name="Settings"
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
