import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {driverStyles} from './styles';

const Component = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <View style={driverStyles.driverDetails}>
    <View style={driverStyles.driverWrapper}>
      <Text style={driverStyles.h1}>Xojamuratov Nurman</Text>
      <Text style={driverStyles.span}>Гос. номер: 95 G 411 GA</Text>
      <Text style={driverStyles.span}>Присоединился в: 01.04.2024 14:51</Text>
      <Text style={driverStyles.span}>Всего пассажиров: 2/4</Text>
      <TouchableOpacity
        onPress={() => setIsActive(false)}
        style={driverStyles.button}>
        <Text style={{fontWeight: '500', color: 'white'}}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const DriverDetails = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>{isActive && <Component isActive={isActive} setIsActive={setIsActive} />}</>
);

export default DriverDetails;
