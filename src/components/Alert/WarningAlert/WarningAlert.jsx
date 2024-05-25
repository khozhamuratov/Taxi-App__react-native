import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {clearAlert} from '../../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {width} from '../../../styles';

function WarningAlert() {
  const {isHidden} = useAppSelector(select => select.isHidden);
  const {alertType} = useAppSelector(select => select.alertType);
  const {themeColor} = useAppSelector(select => select.themeColor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isHidden) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isHidden, dispatch]);

  if (!isHidden) {
    return null;
  }

  return isHidden ? (
    <View
      style={{
        width: width - 30,
        marginHorizontal: 15,
        height: 50,
        top: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: themeColor === 'light' ? 'black' : 'white',
        borderRadius: 20,
      }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: themeColor === 'light' ? 'white' : 'black',
        }}>
        {alertType === 'rejected'
          ? `На вашем счету недостаточно средств\nПополните баланс`
          : 'Вы не можете принять больше 4 пассажиров'}
      </Text>
      <TouchableOpacity onPress={() => dispatch(clearAlert())}>
        <Icon
          name="close"
          size={30}
          color={themeColor === 'light' ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <></>
  );
}

export default WarningAlert;
