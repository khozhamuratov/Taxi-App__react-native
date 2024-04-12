import React from 'react';
import {FlatList, Text, View} from 'react-native';
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

const cityKeys = {
  NK: 'Нукус',
  SB: 'Шымбай',
};

const Detail = ({item}: {item: Item}) => {
  const date = new Date(item.created_at);

  return (
    <View
      style={[
        orderStyle.container,
        {marginBottom: 10, marginHorizontal: 15, backgroundColor: '#282828'},
      ]}>
      <View style={orderStyle.alertHeader}>
        <Text style={orderStyle.orderTitle}>
          {cityKeys[item.from_city]} {'->'} {cityKeys[item.to_city]}
        </Text>
      </View>
      <View style={orderStyle.orderDetail}>
        <Text style={orderStyle.text}>Адрес: {item.address}</Text>
        <Text style={orderStyle.text}>Номер: {item.client.phone_number}</Text>
        <Text style={orderStyle.text}>
          Дата: {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

const HistoryPage = ({historyData}: any) => {
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'white',
          marginBottom: 15,
          marginHorizontal: 15,
        }}>
        История пассажиров
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={historyData}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => <Detail item={item} />}
      />
    </>
  );
};

export default HistoryPage;
