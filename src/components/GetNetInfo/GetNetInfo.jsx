import NetInfo from '@react-native-community/netinfo';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../../redux/hooks';
import {height, width} from '../../styles';

const GetNetInfo = () => {
  const netInfo = NetInfo.useNetInfo();

  const {themeColor} = useAppSelector(select => select.themeColor);

  return netInfo.isConnected === false ? (
    <View
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: themeColor === 'light' ? 'white' : '#141414',
      }}>
      <Icon name="warning" size={50} color={'skyblue'} />
      <Text
        style={{
          color: themeColor === 'dark' ? 'white' : '#141414',
          fontWeight: '600',
        }}>
        Проверьте интернет соединение
      </Text>
    </View>
  ) : (
    <></>
  );
};

export default GetNetInfo;
