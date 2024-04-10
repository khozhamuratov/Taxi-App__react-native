import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

export const orderStyle = StyleSheet.create({
  clientPageContainer: {
    // paddingTop: 20,
    marginHorizontal: 15,
  },
  headerBtns: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerBtn: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 15,
    width: width / 2,
    alignItems: 'center',
  },
  container: {
    padding: 15,
    backgroundColor: '#222222',
    borderRadius: 10,
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
  button: {
    backgroundColor: '#414141',
    padding: 10,
    borderRadius: 10,
    width: width - 60,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
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
  },
});
