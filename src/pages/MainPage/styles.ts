import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('screen').height;

export const mainPageStyles = StyleSheet.create({
  pageTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textStyle: {
    color: 'red',
    textAlign: 'center',
    paddingTop: 20,
  },
  driversTableRow: {
    display: 'flex',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
  },
  userTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  userCarTxt: {
    fontSize: 12,
    color: '#CCC',
  },
  userName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  active: {
    backgroundColor: '#222222',
    borderBottomWidth: 0,
  },
});
