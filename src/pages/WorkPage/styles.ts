import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const WorkPageStyles = StyleSheet.create({
  container: {
    width: width,
    height: height - 85,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
