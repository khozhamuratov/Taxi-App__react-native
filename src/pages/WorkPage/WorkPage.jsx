import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Dropdown} from 'react-native-element-dropdown';
import {
  listUsers,
  orderAlert,
  setOrdersDetail,
} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {headerStyles, width} from '../../styles';
import {connect, send} from '../../websocketMiddlware';
import {orderStyle} from '../ClientsPage/styles';
import {WorkPageStyles} from './styles';

const data = [
  {label: 'Нукус', value: 'NK'},
  {label: 'Шымбай', value: 'SB'},
];

const WorkPage = props => {
  const [value, setValue] = useState('NK');
  const [valueSecond, setValueSecond] = useState('SB');
  const [isFocus, setIsFocus] = useState(false);
  const [startWork, setStartWork] = useState(false);
  const dispatch = useAppDispatch();
  const [ws, setWs] = useState(null);

  const {themeColor} = useAppSelector(select => select.themeColor);

  const handleJoinLine = async () => {
    const socket = await connect('wss://api.1s-taxi.uz/ws/');

    socket.onopen = () => {
      setWs(socket);
      setStartWork(!startWork);
      socket.send(
        JSON.stringify({
          type: 'join_line',
          from_city: value,
          to_city: valueSecond,
        }),
      );
    };

    socket.onmessage = e => {
      console.log('Nurman', e.data);
      if ('line' in JSON.parse(e.data)) {
        dispatch(listUsers(JSON.parse(e.data).line));
        console.log('line', e.data);
        setError(false);
      } else if ('order' in JSON.parse(e.data)) {
        dispatch(orderAlert(true));
        dispatch(setOrdersDetail(JSON.parse(e.data).order));
        console.log('Order', e.data);
        console.log('on message');
        setError(false);
      } else if (JSON.parse(e.data).type === 'completed') {
        dispatch(listUsers(''));
        ws?.close();
        setError(false);
        setStartWork(false);
      }
    };

    socket.onerror = e => {
      setError(true);
    };
  };
  const [appVersion, setAppVersion] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAppVersion() {
      const version = DeviceInfo.getVersion();
      setAppVersion(version);
    }

    fetchAppVersion();
  }, []);
  const handleOutLine = () => {
    if (ws) {
      send({type: 'work_completed'});
      setStartWork(!startWork);
      ws.close();
      dispatch(listUsers({}));
    }
  };

  return (
    <View style={WorkPageStyles.container}>
      <View>
        <View style={headerStyles.header}>
          <Text style={orderStyle.pageTitle}>Выберите маршрут</Text>
        </View>
        <View style={WorkPageStyles.dropdowns}>
          <View>
            <Text style={WorkPageStyles.dropdownTxt}>
              Укажите ваш текущий город
            </Text>
            <Dropdown
              style={[
                WorkPageStyles.dropdown,
                isFocus && {borderColor: 'gray'},
              ]}
              selectedTextStyle={WorkPageStyles.selectedTextStyle}
              iconStyle={WorkPageStyles.iconStyle}
              itemTextStyle={WorkPageStyles.itemStyle}
              containerStyle={{
                backgroundColor: '#212121',
                borderWidth: 0,
                marginTop: 4,
                borderRadius: 10,
              }}
              data={data}
              maxHeight={300}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Из' : '...'}
              value={value}
              activeColor="#414141"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View>
            <Text style={WorkPageStyles.dropdownTxt}>
              Выберите город, куда вам нужно доехать
            </Text>
            <Dropdown
              style={[
                WorkPageStyles.dropdown,
                isFocus && {borderColor: 'gray'},
              ]}
              selectedTextStyle={WorkPageStyles.selectedTextStyle}
              iconStyle={WorkPageStyles.iconStyle}
              itemTextStyle={WorkPageStyles.itemStyle}
              containerStyle={{
                backgroundColor: '#212121',
                borderWidth: 0,
                marginTop: 4,
                borderRadius: 10,
              }}
              data={data}
              maxHeight={300}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'В' : '...'}
              value={valueSecond}
              activeColor="#414141"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValueSecond(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          {error && (
            <Text
              style={{
                width: width - 100,
                fontSize: 12,
                marginTop: 10,
                color: '#EF4040',
              }}>
              Произошла ошибка. Попробуйте ещё раз
            </Text>
          )}
          <TouchableOpacity
            onPress={() => (startWork ? handleOutLine() : handleJoinLine())}
            style={[
              WorkPageStyles.button,
              startWork && {backgroundColor: '#EF4040'},
            ]}>
            <Text style={WorkPageStyles.btnTxt}>
              {startWork ? 'Завершить работу' : 'Начать работу'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, fontSize: 12, color: '#CCC'}}>
          *Не забудьте завершить работу, когда наберете нужное количество
          пассажиров
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'gray', fontSize: 12}}>
          Версия приложения {appVersion}
        </Text>
      </View>
    </View>
  );
};

export default WorkPage;
