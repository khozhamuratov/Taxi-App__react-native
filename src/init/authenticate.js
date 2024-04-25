import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authenticate = async (username, password) => {
  try {
    const response = await axios.post('https://1s-taxi.uz/auth/jwt/create', {
      username,
      password,
    });
    const token = response.data;

    await AsyncStorage.setItem('access', token['access']);
    await AsyncStorage.setItem('refresh', token['refresh']);

    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export default authenticate;
