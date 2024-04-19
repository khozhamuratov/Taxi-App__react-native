import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {orderStyle} from './styles';

type Props = {};

const cityKeys: any = {
  NK: 'Нукус',
  SB: 'Шымбай',
};

const ClientPage = ({clientsData}: any) => {
  return (
    <View
      style={{
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 220,
      }}>
      {clientsData.map((clientData: any, index: number) => (
        <View key={index} style={orderStyle.container}>
          <View style={orderStyle.alertHeader}>
            <Text style={orderStyle.orderTitle}>
              {cityKeys[clientData.from_city]} {'->'}{' '}
              {cityKeys[clientData.to_city]}
            </Text>
          </View>
          <View style={orderStyle.orderDetail}>
            <Text style={orderStyle.text}>Адрес: {clientData.address}</Text>
            <Text style={orderStyle.text}>
              Номер: {clientData.client.phone_number}
            </Text>
            <Text style={orderStyle.text}>
              Пассажиров: {clientData.passengers}
            </Text>
            <Text style={orderStyle.text}>
              Дата: {new Date(clientData.created_at).toLocaleDateString()}{' '}
              {new Date(clientData.created_at).toLocaleTimeString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${clientData.client.phone_number}`);
            }}
            style={orderStyle.button}>
            <Text style={orderStyle.buttonTxt}>Позвонить</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ClientPage;

const styles = StyleSheet.create({});
