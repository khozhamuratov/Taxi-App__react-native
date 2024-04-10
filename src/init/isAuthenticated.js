import AsyncStorage from '@react-native-async-storage/async-storage';

const isAuthenticated = async () => {
  try {
    // Проверьте наличие токена в AsyncStorage
    const token = await AsyncStorage.getItem('access');
    return !!token; // Верните true, если токен существует, иначе false
  } catch (error) {
    console.error('Authentication check error:', error);
    throw error;
  }
};

export default isAuthenticated;
