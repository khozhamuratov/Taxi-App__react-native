import AsyncStorage from '@react-native-async-storage/async-storage';

const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('access');
    return !!token;
  } catch (error) {
    console.error('Authentication check error:', error);
    throw error;
  }
};

export default isAuthenticated;
