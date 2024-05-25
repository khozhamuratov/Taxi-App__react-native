import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  listUsers,
  orderAlert,
  setCompleted,
  setFreeOrders,
  setOrdersDetail,
  showAlert,
} from '../../features/users/usersSlice';
import LocalNotification from '../../localNotifications';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {lightTheme, width} from '../../styles';
import {close, connect, send} from '../../websocketMiddlware';
import {WorkPageStyles} from './styles';

const data = [
  {label: 'Нукус', value: 'NK'},
  {label: 'Шымбай', value: 'SB'},
];

const WorkPage = props => {
  const [value, setValue] = useState('NK');
  const [valueSecond, setValueSecond] = useState('SB');
  const [isFocus, setIsFocus] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [startWork, setStartWork] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [ws, setWs] = useState(null);

  const {themeColor} = useAppSelector(select => select.themeColor);
  const {freeOrders} = useAppSelector(select => select.freeOrders);

  const handleJoinLine = async () => {
    const socket = await connect('wss://1s-taxi.uz/ws/');
    setLoader(true);

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
      if ('line' in JSON.parse(e.data)) {
        dispatch(listUsers(JSON.parse(e.data).line));
        setError(false);
        setLoader(false);
        dispatch(setCompleted(false));
      } else if ('order' in JSON.parse(e.data)) {
        dispatch(orderAlert(true));
        dispatch(setOrdersDetail(JSON.parse(e.data).order));
        setError(false);
      } else if (JSON.parse(e.data).type === 'completed') {
        dispatch(listUsers(''));
        socket.close();
        setError(false);
        setStartWork(false);
        dispatch(setFreeOrders(''));
        dispatch(setCompleted(true));
      } else if (JSON.parse(e.data).type === 'rejected') {
        socket.close();
        setStartWork(false);
        dispatch(showAlert('rejected'));
      } else if ('free_order' in JSON.parse(e.data)) {
        dispatch(setFreeOrders(JSON.parse(e.data).free_order));
        LocalNotification('Свободный заказ');
      } else if ('free_orders' in JSON.parse(e.data)) {
        dispatch(setFreeOrders(JSON.parse(e.data).free_orders));
        if (JSON.parse(e.data).free_orders.length > 0) {
          LocalNotification('Доступен новый свободный заказ');
        }
      } else if (JSON.parse(e.data).type === 'canceled') {
        dispatch(orderAlert(false));
      } else if (JSON.parse(e.data).type === 'over_limit') {
        dispatch(showAlert('over_limit'));
      }
    };

    socket.onerror = async e => {
      dispatch(setFreeOrders([]));
      dispatch(listUsers([]));
      setStartWork(false);
      dispatch(orderAlert(false));
      close();
    };
  };
  const [error, setError] = useState(false);
  const handleOutLine = () => {
    if (ws) {
      send({
        type: 'disconnect',
      });
      ws.close();
      setStartWork(!startWork);
      dispatch(listUsers({}));
      dispatch(setFreeOrders([]));
      dispatch(orderAlert(false));
    }
  };

  return (
    <SafeAreaView>
      <View style={WorkPageStyles.container}>
        <View style={WorkPageStyles.dropdowns}>
          <View>
            <Text
              style={[
                WorkPageStyles.dropdownTxt,
                themeColor === 'light' && lightTheme.lightText,
              ]}>
              Укажите ваш текущий город
            </Text>
            <Dropdown
              style={[
                WorkPageStyles.dropdown,
                isFocus && {borderColor: 'gray'},
              ]}
              selectedTextStyle={[
                WorkPageStyles.selectedTextStyle,
                themeColor === 'light' && lightTheme.lightText,
              ]}
              iconStyle={WorkPageStyles.iconStyle}
              itemTextStyle={[
                WorkPageStyles.itemStyle,
                themeColor === 'light' && lightTheme.lightText,
              ]}
              containerStyle={{
                backgroundColor: themeColor === 'light' ? 'white' : '#141414',
                borderWidth: 0,
                marginTop: 4,
              }}
              data={data}
              maxHeight={300}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Из' : '...'}
              value={value}
              activeColor={themeColor === 'light' ? '#f1f1f1' : '#414141'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View>
            <Text
              style={[
                WorkPageStyles.dropdownTxt,
                themeColor === 'light' && lightTheme.lightText,
              ]}>
              Выберите город, куда вам нужно доехать
            </Text>
            <Dropdown
              style={[
                WorkPageStyles.dropdown,
                isFocus && {borderColor: 'gray'},
              ]}
              selectedTextStyle={[
                WorkPageStyles.selectedTextStyle,
                themeColor === 'light' && lightTheme.lightText,
              ]}
              iconStyle={WorkPageStyles.iconStyle}
              itemTextStyle={[
                WorkPageStyles.itemStyle,
                themeColor === 'light' && lightTheme.lightText,
              ]}
              containerStyle={{
                backgroundColor: themeColor === 'light' ? 'white' : '#141414',
                borderWidth: 0,
                marginTop: 4,
              }}
              data={data}
              maxHeight={300}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'В' : '...'}
              value={valueSecond}
              activeColor={themeColor === 'light' ? '#f1f1f1' : '#414141'}
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
            {loader ? (
              <ActivityIndicator color={'gray'} size={'small'} />
            ) : (
              <Text style={WorkPageStyles.btnTxt}>
                {startWork ? 'Завершить работу' : 'Начать работу'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 20, fontSize: 12, color: 'gray'}}>
          *Не забудьте завершить работу, когда наберете нужное количество
          пассажиров
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WorkPage;
