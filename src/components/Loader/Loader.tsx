import React from 'react';
import {Image, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {height, width} from '../../styles';

type Props = {};

const Loader = (props: Props) => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: width,
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(34,34,34,0.95)',
        },
        themeColor === 'light' && {backgroundColor: 'white'},
      ]}>
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 200,
          objectFit: 'cover',
        }}
        source={require('./logo.jpg')}
      />
    </View>
  );
};

export default Loader;
