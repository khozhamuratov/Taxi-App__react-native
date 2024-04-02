import {StyleSheet} from 'react-native';
import Order from './Order/Order';

const orderDatas = [
  {
    id: 1,
    from: 'Нукус',
    address: 'ул.Беруний 25/1',
    phoneNumber: '+998 91 303 7113',
  },
  {
    id: 2,
    from: 'Нукус',
    address: 'ул.Т.Кайпбергенов 1',
    phoneNumber: '+998 77 000 0930',
  },
  {
    id: 3,
    from: 'Нукус',
    address: 'ул.Шайхана',
    phoneNumber: '+998 93 322 7113',
  },
  {
    id: 4,
    from: 'Нукус',
    address: 'ул.Алтин Орда 23',
    phoneNumber: '+998 91 303 12 21',
  },
];

const Alert = () => {
  return (
    <>
      {orderDatas.map(order => (
        <Order
          key={order.id}
          id={order.id}
          from={order.from}
          address={order.address}
          phoneNumber={order.phoneNumber}
        />
      ))}
    </>
  );
};

export default Alert;

const styles = StyleSheet.create({});
