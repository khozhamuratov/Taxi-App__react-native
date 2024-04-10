import React from 'react';
import {Text, View} from 'react-native';
import {orderStyle} from './styles';

type Props = {};

const clientHistoryData = [
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-04T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-05T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-04T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-06T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-07T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-08T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-08T23:03:57.446484',
  },
  {
    from: 'Нукус',
    to: 'Шымбай',
    address: 'ул.Беруний ориентир Лас Вегас',
    phoneNumber: '+998 91 303 71 13',
    date: '2024-04-08T23:03:57.446484',
  },
];

interface Item {
  from: string;
  to: string;
  address: string;
  phoneNumber: string;
  date: string;
}

interface DataDisplayProps {
  data: Item[];
}

const groupedData: {[date: string]: Item[]} = clientHistoryData.reduce(
  (acc: any, curr: any) => {
    const date = new Date(curr.date).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  },
  {},
);

const HistoryPage = (props: Props) => {
  return (
    <>
      <View
        style={{
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 220,
        }}>
        <View>
          {Object.entries(groupedData).map(([date, items]) => {
            return (
              <View style={{gap: 10}} key={date}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'white',
                    marginTop: 10,
                  }}>
                  {date}
                </Text>
                {items.map((item, index) => (
                  <View key={index} style={orderStyle.container}>
                    <View style={orderStyle.alertHeader}>
                      <Text style={orderStyle.orderTitle}>
                        {item.from} {'->'} {item.to}
                      </Text>
                    </View>
                    <View style={orderStyle.orderDetail}>
                      <Text style={orderStyle.text}>Адрес: {item.address}</Text>
                      <Text style={orderStyle.text}>
                        Номер: {item.phoneNumber}
                      </Text>
                      <Text style={orderStyle.text}>Дата: {item.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        {/* {clientHistoryData.map((clientHistory, index) => (
          <View key={index} style={orderStyle.container}>
            <View style={orderStyle.alertHeader}>
              <Text style={orderStyle.orderTitle}>
                {clientHistory.from} {'->'} {clientHistory.to}
              </Text>
            </View>
            <View style={orderStyle.orderDetail}>
              <Text style={orderStyle.text}>
                Адрес: {clientHistory.address}
              </Text>
              <Text style={orderStyle.text}>
                Номер: {clientHistory.phoneNumber}
              </Text>
              <Text style={orderStyle.text}>Дата: {clientHistory.date}</Text>
            </View>
          </View>
        ))} */}
      </View>
    </>
  );
};

export default HistoryPage;
