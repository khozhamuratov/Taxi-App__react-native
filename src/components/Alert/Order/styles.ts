import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

export const alertStyle = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#222222',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  alertHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDetail: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#72cf4a',
    padding: 10,
    borderRadius: 10,
    width: width / 2 - 40,
    alignItems: 'center',
  },
  buttonTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  alertCounter: {
    backgroundColor: '#414141',
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertCounterTxt: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  text: {
    color: '#CCC',
    fontWeight: '600',
  },
});
