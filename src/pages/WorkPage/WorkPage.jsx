import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Dropdown} from 'react-native-element-dropdown';
import {
  listUsers,
  orderAlert,
  setOrdersDetail,
} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {lightTheme, width} from '../../styles';
import {connect, send} from '../../websocketMiddlware';
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
      } else if ('order' in JSON.parse(e.data)) {
        dispatch(orderAlert(true));
        dispatch(setOrdersDetail(JSON.parse(e.data).order));
        setError(false);
      } else if (JSON.parse(e.data).type === 'completed') {
        dispatch(listUsers(''));
        socket.close();
        setError(false);
        setStartWork(false);
      } else if (JSON.parse(e.data).type === 'rejected') {
        socket.close();
        setStartWork(false);
        setRejected(true);
      } else if ('order' in JSON.parse(e.data)) {
        dispatch(orderAlert(true));
        dispatch(setOrdersDetail(JSON.parse(e.data).order));
        setError(false);
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
          {rejected && (
            <Text
              style={{
                width: width - 100,
                fontSize: 12,
                marginTop: 10,
                color: '#EF4040',
              }}>
              Пополните баланс. На вашем счету недостаточно средств
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
