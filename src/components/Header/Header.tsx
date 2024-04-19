import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {headerStyles} from '../../styles';

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.container}>
        <Icon
          name="location"
          size={17}
          color="white"
          style={{paddingRight: 10}}
        />
        <Text style={headerStyles.geoStyle}>Нукус</Text>
      </View>
    </View>
  );
};

export default Header;
