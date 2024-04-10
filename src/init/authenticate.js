import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authenticate = async (username, password) => {
  try {
    // Выполните запрос на сервер для аутентификации
    const response = await axios.post(
      'http://192.168.100.8:8080/auth/jwt/create',
      {
        username,
        password,
      },
    );
    const token = response.data;

    // Сохраните токен в AsyncStorage
    await AsyncStorage.setItem('access', token['access']);
    await AsyncStorage.setItem('refresh', token['refresh']);

    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export default authenticate;
