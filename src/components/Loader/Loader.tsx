import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {height, width} from '../../styles';

type Props = {};

const Loader = (props: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(34,34,34,0.95)',
      }}>
      <ActivityIndicator size={'large'} color={'gray'} />
    </View>
  );
};

export default Loader;
