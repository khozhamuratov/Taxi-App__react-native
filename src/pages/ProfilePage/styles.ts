import {StyleSheet} from 'react-native';
import {width} from '../../styles';

export const ProfileStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  carNumber: {
    fontSize: 12,
    color: '#FFF',
  },
  card: {
    marginVertical: 10,
    width: width / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 5,
  },
  userData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  properties: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  balanceTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  balance: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  balanceNum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
  itemsContainer: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
