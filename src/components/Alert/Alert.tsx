import {View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import Order from './Order/Order';

const Alert = () => {
  const {ordersDetails} = useAppSelector(select => select.ordersDetails);
  const {isAlert} = useAppSelector(select => select.isAlert);

  return (
    <View style={{paddingHorizontal: 5, gap: 10}}>
      {isAlert &&
        ordersDetails.map((order, index) => (
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
    </View>
  );
};

export default Alert;
