import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: '#222222',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  geoStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    borderStyle: 'solid',
  },
});
