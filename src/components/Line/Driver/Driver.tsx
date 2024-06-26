import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {selected} from '../../../features/users/usersSlice';
import {useAppDispatch} from '../../../redux/hooks';
import {driverStyles} from './styles';

type User = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    carNumber: string;
    joinedAt: string;
    passengers: number;
  };

  index: number;
};

const Driver = (props: User) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(selected())}
      key={props.user.id}
      style={[
        driverStyles.driversTableRow,
        props.user.id === 3 ? driverStyles.active : null,
      ]}>
      <View style={driverStyles.driverInfo}>
        <Text style={driverStyles.span}>{props.index + 1}</Text>
        <View style={driverStyles.userName}>
          <Text style={driverStyles.userTxt}>{props.user.firstName}</Text>
          <Text style={driverStyles.userTxt}>{props.user.lastName}</Text>
          <Text style={driverStyles.userCarTxt}>{props.user.carNumber}</Text>
        </View>
      </View>
      <Text style={(driverStyles.userTxt, {fontWeight: '400', color: '#CCC'})}>
        {props.user.passengers} / 4
      </Text>
    </TouchableOpacity>
  );
};

export default Driver;

const styles = StyleSheet.create({});
