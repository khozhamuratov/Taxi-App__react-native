import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../../redux/hooks';

type Props = {};

const FeedBackPage = (props: Props) => {
  const {themeColor} = useAppSelector(select => select.themeColor);
  return (
    <View style={{marginHorizontal: 15}}>
      <Text
        style={{
          marginBottom: 10,
          fontWeight: '600',
          fontSize: 18,
          color: 'white',
        }}>
        Обратная связь
      </Text>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Icon
            size={15}
            color={themeColor === 'light' ? 'black' : 'white'}
            name="paper-plane"
          />
          <Text
            style={[
              {fontWeight: '600', fontSize: 16, color: 'white'},
              themeColor === 'light' && {color: '#212121'},
            ]}>
            Оператор
          </Text>
        </View>
        <Text style={{color: themeColor === 'light' ? 'black' : 'white'}}>
          Нурполат Омирзаков
        </Text>
        <Text style={{color: themeColor === 'light' ? 'black' : 'white'}}>
          +998 (77) 000 09 30
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Icon
            size={15}
            color={themeColor === 'light' ? 'black' : 'white'}
            name="mail"
          />
          <Text
            style={[
              {fontWeight: '600', fontSize: 16, color: 'white'},
              themeColor === 'light' && {color: '#212121'},
            ]}>
            Сообщить о проблеме
          </Text>
        </View>
        <View>
          <Text style={{color: 'gray'}}>+998 (93) 364 07 67</Text>
          <Text style={{color: 'gray'}}>polatbeknazarov@gmail.com</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedBackPage;
