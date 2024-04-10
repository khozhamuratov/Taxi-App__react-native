import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const loginStyles = StyleSheet.create({
  page: {
    width: width,
    height: height,
    backgroundColor: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    borderWidth: 0.2,
    borderColor: '#ccc',
    width: width - 100,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#414141',
  },
});
