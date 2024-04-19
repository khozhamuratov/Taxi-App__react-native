import {Dimensions, StyleSheet} from 'react-native';
export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const headerStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    height: 100,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#414141',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export const lightTheme = StyleSheet.create({
  lightText: {
    color: '#141414',
  },
  lightBg: {
    backgroundColor: '#FFF',
  },
});
