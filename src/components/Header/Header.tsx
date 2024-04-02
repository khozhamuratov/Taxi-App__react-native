import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Icon
          name="location"
          size={17}
          color="white"
          style={{paddingRight: 10}}
        />
        <Text style={styles.geoStyle}>Нукус</Text>
      </View>
    </View>
  );
};

export default Header;
