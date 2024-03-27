import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Нукус</Text>
    </View>
  );
};

export default Header;
