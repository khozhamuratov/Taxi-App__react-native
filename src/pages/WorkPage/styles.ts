import {StyleSheet} from 'react-native';
import {height, width} from '../../styles';

export const WorkPageStyles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    width: width,
    height: height - 85,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  btnTxt: {
    color: '#FFF',
    fontWeight: '600',
  },
  button: {
    width: width - 30,
    backgroundColor: '#212121',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  dropdowns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 30,
  },
  dropdownTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  itemStyle: {
    color: '#CCC',
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
