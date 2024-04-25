import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {orderStyle} from './styles';

interface Item {
  order: {
    from_city: string;
    to_city: string;
    address: string;
    date: string;
    created_at: string;
    client: {
      phone_number: string;
    };
  };
}

interface DataDisplayProps {
  data: Item[];
}

const cityKeys: any = {
  NK: 'Нукус',
  SB: 'Шымбай',
};

const Detail = ({item}: {item: Item}) => {
  const date = new Date(item.order.created_at);
  const {themeColor} = useAppSelector(select => select.themeColor);

  return (
    <View
      style={[
        orderStyle.container,
        {marginBottom: 10, marginHorizontal: 15, backgroundColor: '#282828'},
      ]}>
      <View style={orderStyle.alertHeader}>
        <Text
          style={[
            orderStyle.orderTitle,
            themeColor === 'light' && {color: 'black'},
          ]}>
          {cityKeys[item.order.from_city]} {'->'} {cityKeys[item.order.to_city]}
        </Text>
      </View>
      <View style={orderStyle.orderDetail}>
        <Text
          style={[orderStyle.text, themeColor === 'light' && {color: 'black'}]}>
          Адрес: {item.order.address}
        </Text>
        <Text
          style={[orderStyle.text, themeColor === 'light' && {color: 'black'}]}>
          Номер: {item.order.client.phone_number}
        </Text>
        <Text
          style={[orderStyle.text, themeColor === 'light' && {color: 'black'}]}>
          Дата: {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

const HistoryPage = ({historyData}: any) => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: themeColor === 'light' ? 'black' : 'white',
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
