import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import Order from './Order/Order';

const Alert = () => {
  const {ordersDetails} = useAppSelector(select => select.ordersDetails);

  return (
    <>
      {ordersDetails.map((order, index) => (
        <Order
          key={index}
          id={order.id}
          from={order.from_city}
          to={order.to_city}
          address={order.address}
          client={order.client}
          passengers={order.passengers}
        />
      ))}
    </>
  );
};

export default Alert;

const styles = StyleSheet.create({});
