import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Dropdown} from 'react-native-element-dropdown';
import {headerStyles} from '../../components/Header/styles';
import {
  listUsers,
  orderAlert,
  setOrdersDetail,
} from '../../features/users/usersSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {connect} from '../../websocketMiddlware';
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
  const {listDrivers} = useAppSelector(select => select.listUsers);
  const {websocket} = useAppSelector(select => select.websocket);
  const [ws, setWs] = useState(null);

  const handleJoinLine = async () => {
    const socket = await connect('ws://192.168.100.8:8080');

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
      } else if ('order' in JSON.parse(e.data)) {
        dispatch(orderAlert(true));
        dispatch(setOrdersDetail(JSON.parse(e.data).order));
        console.log('Order', e.data);
        console.log('on message');
      } else if (JSON.parse(e.data).type === 'accepted') {
        dispatch(listUsers(''));
      }
    };
  };
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    async function fetchAppVersion() {
      const version = DeviceInfo.getVersion();
      setAppVersion(version);
    }

    fetchAppVersion();
  }, []);
  const handleOutLine = () => {
    if (ws) {
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
        <View style={styles.dropdowns}>
          <View>
            <Text style={styles.dropdownTxt}>Укажите ваш текущий город</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemStyle}
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
            <Text style={styles.dropdownTxt}>
              Выберите город, куда вам нужно доехать
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemStyle}
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
          <TouchableOpacity
            onPress={() => (startWork ? handleOutLine() : handleJoinLine())}
            style={[styles.button, startWork && {backgroundColor: '#EF4040'}]}>
            <Text style={styles.btnTxt}>
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

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    padding: 16,
  },
  btnTxt: {
    color: '#FFF',
    fontWeight: '600',
  },
  button: {
    width: width - 30,
    backgroundColor: '#212121',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  dropdowns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 30,
  },
  dropdownTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  itemStyle: {
    color: '#CCC',
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

// import React, {Component} from 'react';
// import {Text, View} from 'react-native';

// class WorkPage extends Component {
//   constructor(props) {
//     super(props);
//     // Установите URL вашего WebSocket сервера
//     this.socket = new WebSocket(
//       (uri = 'ws://192.168.100.8:8080'),
//       (options = []),
//       {
//         headers: {
//           Authorization:
//             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNzYwNjQ2LCJpYXQiOjE3MTIzMjg2NDYsImp0aSI6IjBmYjhjOGFkMDllNzRhMWJhYmY5MDAyYTU4MGVkMjg0IiwidXNlcl9pZCI6M30.S0F2e3Gv9t0bfdPNDxPi1tvsJUkBHzWksf7OVo5t-YA',
//         },
//       },
//     );

//     // Слушайте событие открытия соединения
//     this.socket.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     // Слушайте событие получения сообщения
//     this.socket.onmessage = e => {
//       console.log('Received message: ', e.data);
//     };

//     // Слушайте событие закрытия соединения
//     this.socket.onclose = () => {
//       console.log('WebSocket closed');
//     };

//     // Слушайте событие ошибки соединения
//     this.socket.onerror = e => {
//       console.log('WebSocket error: ', e.message);
//     };
//   }

//   render() {
//     return (
//       <View>
//         <Text>React Native WebSocket Example</Text>
//       </View>
//     );
//   }
// }

// export default WorkPage;
