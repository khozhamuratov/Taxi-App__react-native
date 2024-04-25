import React, {useEffect, useState} from 'react';
import {Appearance, StatusBar} from 'react-native';
import Loader from './components/Loader/Loader';
import {logined, themeToggler} from './features/users/usersSlice';
import isAuthenticated from './init/isAuthenticated';
import LoginPage from './pages/LoginPage/LoginPage';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import Tabs from './Tabs/Tabs';

const IsAuthorization = () => {
  const {isLogined} = useAppSelector(select => select.isLogined);
  const {themeColor} = useAppSelector(select => select.themeColor);
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const STYLES = ['default', 'light-content', 'dark-content'];
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    dispatch(themeToggler(colorScheme));
    if (themeColor === 'dark') {
      setIsEnabled(true); // true means dark
      setStatusBarStyle(STYLES[1]);
      console.log(themeColor);
    } else {
      setIsEnabled(false); // false means light
      console.log(themeColor);
      setStatusBarStyle(STYLES[2]);
    }
  }, []);

  useEffect(() => {
    isAuthenticated().then(authenticated => {
      setLoader(false);
      if (authenticated) {
        dispatch(logined());
      }
    });
  }, [isLogined]);

  return isLogined ? (
    <>
      <Tabs />
      <StatusBar barStyle={statusBarStyle} />
    </>
  ) : loader ? (
    <>
      <Loader />
      <StatusBar barStyle={statusBarStyle} />
    </>
  ) : (
    <>
      <LoginPage />
      <StatusBar barStyle={statusBarStyle} />
    </>
  );
};

export default IsAuthorization;
