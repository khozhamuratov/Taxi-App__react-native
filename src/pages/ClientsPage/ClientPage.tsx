import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {lightTheme} from '../../styles';
import {orderStyle} from './styles';

const cityKeys: any = {
  NK: 'Нукус',
  SB: 'Шымбай',
};

const ClientPage = ({clientsData}: any) => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <View>
      {clientsData.length > 0 ? (
        <View
          style={{
            gap: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 220,
          }}>
          {clientsData.map((clientData: any, index: number) => (
            <View
              key={index}
              style={[
                orderStyle.container,
                themeColor === 'light' && {
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                },
              ]}>
              <View style={orderStyle.alertHeader}>
                <Text
                  style={[
                    orderStyle.orderTitle,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
                  {cityKeys[clientData.from_city]} {'->'}{' '}
                  {cityKeys[clientData.to_city]}
                </Text>
              </View>
              <View style={orderStyle.orderDetail}>
                <Text
                  style={[
                    orderStyle.text,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
                  Адрес: {clientData.address}
                </Text>
                <Text
                  style={[
                    orderStyle.text,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
                  Номер: {clientData.client.phone_number}
                </Text>
                <Text
                  style={[
                    orderStyle.text,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
                  Пассажиров: {clientData.passengers}
                </Text>
                <Text
                  style={[
                    orderStyle.text,
                    themeColor === 'light' && lightTheme.lightText,
                  ]}>
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
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 700,
          }}>
          <Text style={{color: 'gray', fontSize: 16, fontWeight: '600'}}>
            Список пуст
          </Text>
        </View>
      )}
    </View>
  );
};

export default ClientPage;

const styles = StyleSheet.create({});
