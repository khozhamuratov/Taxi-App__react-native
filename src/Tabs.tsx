import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ClientPage from './pages/ClientsPage/ClientPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import {tabStyles} from './styles';

type Props = {};

const Tab = createBottomTabNavigator();

const Tabs = (props: Props) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: '#141414',
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
            if (route.name === 'Clients') {
              color = focused ? '#f1f1f3' : '#424242';
            }

            return (
              <>
                <Icon name="people" size={25} color={color} />
                <Text
                  style={[
                    tabStyles.tabTxt,
                    focused ? tabStyles.focused : null,
                  ]}>
                  Клиенты
                </Text>
              </>
            );
          },
        })}
        name="Clients"
        component={ClientPage}
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

const styles = StyleSheet.create({});
