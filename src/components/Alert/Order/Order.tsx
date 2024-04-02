import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {alertStyle} from './styles';

type Props = {
  id: number;
  from: string;
  address: string;
  phoneNumber: string;
};

const Order = (props: Props) => {
  const [counter, setCounter] = useState(15);
  const [isAlert, setIsAlert] = useState(true);

  const acceptOrder = () => {
    setIsAlert(false);
  };
  const rejectOrder = () => {
    setIsAlert(false);
  };

  useEffect(() => {
    if (isAlert) {
      const interval = setInterval(() => {
        setCounter(prevSeconds => {
          if (prevSeconds === 1) {
            clearInterval(interval);
            setIsAlert(false);
          }
          return prevSeconds - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAlert]);

  return (
    <View style={[alertStyle.container, !isAlert ? {display: 'none'} : {}]}>
      <View style={alertStyle.alertHeader}>
        <Text style={alertStyle.orderTitle}>Новый заказ:</Text>
        <View style={alertStyle.alertCounter}>
          <Text style={alertStyle.alertCounterTxt}>{counter}</Text>
        </View>
      </View>
      <View style={alertStyle.orderDetail}>
        <Text style={alertStyle.text}>Город: {props.from}</Text>
        <Text style={alertStyle.text}>Адрес: {props.address}</Text>
        <Text style={alertStyle.text}>Номер: {props.phoneNumber}</Text>
      </View>
      <View style={alertStyle.buttons}>
        <TouchableOpacity
          onPress={() => acceptOrder()}
          style={alertStyle.button}>
          <Text style={alertStyle.buttonTxt}>Принять</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => rejectOrder()}
          style={[alertStyle.button, {backgroundColor: '#EF4040'}]}>
          <Text style={alertStyle.buttonTxt}>Отклонить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;
