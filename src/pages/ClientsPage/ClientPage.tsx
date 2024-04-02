import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {orderStyle} from './styles';

type Props = {};

const clientData = [
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
  },
];

const ClientPage = (props: Props) => {
  return (
    <ScrollView
      style={orderStyle.clientPageContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={orderStyle.pageTitle}>Ваши поссажиры:</Text>
      {clientData.map((clientData, index) => (
        <View key={index} style={orderStyle.container}>
          <View style={orderStyle.alertHeader}>
            <Text style={orderStyle.orderTitle}>
              {clientData.from} {'->'} {clientData.to}
            </Text>
          </View>
          <View style={orderStyle.orderDetail}>
            <Text style={orderStyle.text}>Адрес: {clientData.address}</Text>
            <Text style={orderStyle.text}>Номер: {clientData.phoneNumber}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${clientData.phoneNumber}`);
            }}
            style={orderStyle.button}>
            <Text style={orderStyle.buttonTxt}>Позвонить</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ClientPage;

const styles = StyleSheet.create({});
