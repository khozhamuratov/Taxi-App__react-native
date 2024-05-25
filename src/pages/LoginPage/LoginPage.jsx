import React, {useEffect, useState} from 'react';

import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Loader from '../../components/Loader/Loader';
import {logined} from '../../features/users/usersSlice';
import authenticate from '../../init/authenticate';
import isAuthenticated from '../../init/isAuthenticated';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {lightTheme, width} from '../../styles';
import {loginStyles} from './styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const {isLogined} = useAppSelector(select => select.isLogined);
  const {themeColor} = useAppSelector(select => select.themeColor);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleLogin = async () => {
    setLoader(true);
    try {
      await authenticate(username, password);
      isAuthenticated().then(authenticated => {
        if (authenticated) {
          setLoader(false);
          dispatch(logined());
        }
      });
    } catch (error) {
      setError(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    isAuthenticated().then(authenticated => {
      if (authenticated) {
        dispatch(logined());
      }
    });
  }, [isLogined]);

  return (
    <>
      {!loader ? (
        <View
          style={[
            loginStyles.page,
            themeColor === 'light' && {backgroundColor: 'white'},
          ]}>
          <Text
            style={[
              loginStyles.title,
              themeColor === 'light' && lightTheme.lightText,
            ]}>
            Авторизация
          </Text>
          <TextInput
            editable
            numberOfLines={4}
            maxLength={40}
            placeholder="Введите номер машины"
            onChangeText={text => setUsername(text)}
            value={username}
            placeholderTextColor={'gray'}
            style={[
              loginStyles.input,
              themeColor === 'light' && [
                lightTheme.lightText,
                {borderColor: 'gray'},
              ],
            ]}
          />
          <View>
            <TextInput
              editable
              numberOfLines={4}
              maxLength={40}
              secureTextEntry={visible}
              placeholderTextColor={'gray'}
              placeholder="Введите пароль"
              password={visible}
              onChangeText={text => setPassword(text)}
              value={password}
              style={[
                loginStyles.input,
                themeColor === 'light' && [
                  lightTheme.lightText,
                  {borderColor: 'gray'},
                ],
              ]}
            />
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{position: 'absolute', right: 10, top: 22}}>
              <Text
                style={{
                  textAlign: 'right',
                  marginTop: 5,
                  fontSize: 12,
                  color: '#ccc',
                }}>
                {visible ? 'Показать' : 'Скрыть'}
              </Text>
            </TouchableOpacity>
          </View>
          {error && (
            <Text
              style={{
                width: width - 100,
                fontSize: 12,
                marginTop: 10,
                color: '#EF4040',
              }}>
              Произошла ошибка. Попробуйте ещё раз
            </Text>
          )}
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={loginStyles.button}>
            <Text style={{color: 'white', fontWeight: 500, fontSize: 14}}>
              Войти
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LoginPage;
