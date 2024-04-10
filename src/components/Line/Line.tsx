import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {selected, selectedDriver} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {driverStyles} from './Driver/styles';

const Line = () => {
  const {listDrivers} = useAppSelector(select => select.listUsers);

  const dispatch = useAppDispatch();

  return (
    <>
      <View>
        {listDrivers.length > 0 ? (
          listDrivers.map((user, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(selectedDriver(user.id));
                dispatch(selected());
              }}
              key={user.id}
              style={[
                driverStyles.driversTableRow,
                user.id === 3 ? driverStyles.active : null,
              ]}>
              <View style={driverStyles.driverInfo}>
                <Text style={driverStyles.span}>{index + 1}</Text>
                <View style={driverStyles.userName}>
                  <Text style={driverStyles.userTxt}>{user.first_name}</Text>
                  <Text style={driverStyles.userTxt}>{user.last_name}</Text>
                  <Text style={driverStyles.userCarTxt}>{user.car_number}</Text>
                </View>
              </View>
              <Text
                style={
                  (driverStyles.userTxt, {fontWeight: '400', color: '#CCC'})
                }>
                {user.passengers} / 4
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 700,
            }}>
            <Text style={{color: '#CCC', fontSize: 16, fontWeight: '600'}}>
              Список пуст
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Line;

const styles = StyleSheet.create({});
