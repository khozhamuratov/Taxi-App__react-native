import React, {useEffect, useState} from 'react';

import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Loader from '../../components/Loader/Loader';
import {logined} from '../../features/users/usersSlice';
import authenticate from '../../init/authenticate';
import isAuthenticated from '../../init/isAuthenticated';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {width} from '../../styles';
import {loginStyles} from './styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const {isLogined} = useAppSelector(select => select.isLogined);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleLogin = async () => {
    setLoader(true);
    try {
      await authenticate(username, password);
      isAuthenticated().then(authenticated => {
        if (authenticated) {
          dispatch(logined());
          setLoader(false);
        }
      });
    } catch (error) {
      console.log(error);
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

  // const refreshAccessToken = () => {
  //   try {
  //     const response = await axios.post(
  //       'http://192.168.100.8:8080/auth/jwt/refresh',
  //       {
  //         refreshToken,
  //       },
  //     );

  //     const newAccessToken = response.data.accessToken;

  //     setAccessToken(newAccessToken);

  //     // Сохраняем новый access токен в AsyncStorage
  //     await AsyncStorage.setItem('accessToken', newAccessToken);

  //     // Повторяем запрос к API с новым access токеном
  //     await handleApiCall();
  //   } catch (error) {
  //     console.error('Refresh token error:', error);
  //     // Если не удалось обновить токен, перенаправляем пользователя на экран входа
  //     handleLogout();
  //   }
  // };
  return (
    <>
      {!loader ? (
        <View style={loginStyles.page}>
          <Text style={loginStyles.title}>Авторизация</Text>
          <TextInput
            editable
            numberOfLines={4}
            maxLength={40}
            placeholder="Введите номер машины"
            onChangeText={text => setUsername(text)}
            value={username}
            style={loginStyles.input}
          />
          <View>
            <TextInput
              editable
              numberOfLines={4}
              maxLength={40}
              secureTextEntry={visible}
              placeholder="Введите пароль"
              password={visible}
              onChangeText={text => setPassword(text)}
              value={password}
              style={loginStyles.input}
            />
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{position: 'absolute', right: 10, top: 22}}>
              <Text style={{textAlign: 'right', marginTop: 5, fontSize: 12}}>
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
            // onPress={() => dispatch(logined())}
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
