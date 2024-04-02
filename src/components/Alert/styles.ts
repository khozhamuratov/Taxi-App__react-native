import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('screen').width;

export const alertStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    bottom: 70,
    gap: 5,
  },
});
