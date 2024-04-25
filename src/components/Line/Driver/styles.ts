import {StyleSheet} from 'react-native';
import {height, width} from '../../../styles';

export const driverStyles = StyleSheet.create({
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
    color: 'gray',
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

  driverDetails: {
    position: 'absolute',
    width: width,
    height: height - 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverWrapper: {
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#414141',
    padding: 10,
    borderRadius: 10,
    width: width - 80,
    marginTop: 10,
    alignItems: 'center',
  },
  h1: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    color: 'white',
  },
  span: {
    fontSize: 14,
    color: 'gray',
  },
});
