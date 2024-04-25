import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {selected} from '../../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {driverStyles} from './styles';

const DriverDetails = (refRBSheet: any) => {
  const {isSelected} = useAppSelector(select => select.isSelected);
  const {Driver} = useAppSelector(select => select.selectedDriver);
  var dispatch = useAppDispatch();

  const date = new Date(Driver.joined_at);

  return (
    <>
      {isSelected && (
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          height={230}
          closeOnPressBack={true}
          dragOnContent={false}
          draggable={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#FFF',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: '#212121',
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={driverStyles.driverWrapper}>
            <Text style={driverStyles.h1}>{Driver.first_name}</Text>
            <Text style={driverStyles.span}>
              Гос.номер: {Driver.car_number}
            </Text>
            <Text style={driverStyles.span}>
              Присоединился в: {date.toLocaleDateString()}{' '}
              {date.toLocaleTimeString()}
            </Text>
            <Text style={driverStyles.span}>
              Всего пассажиров: {Driver.passengers}/4
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(selected())}
              style={driverStyles.button}>
              <Text style={{fontWeight: '500', color: 'white'}}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      )}
    </>
  );
};

export default DriverDetails;
