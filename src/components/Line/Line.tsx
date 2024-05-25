import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {selected, selectedDriver} from '../../features/users/usersSlice';
import {orderStyle} from '../../pages/ClientsPage/styles';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {lightTheme} from '../../styles';
import {send} from '../../websocketMiddlware';
import {driverStyles} from './Driver/styles';

const Line = () => {
  const {listDrivers} = useAppSelector(select => select.listUsers);
  const refRBSheet: React.MutableRefObject<any> = useRef();
  const {themeColor} = useAppSelector(select => select.themeColor);
  const {Driver} = useAppSelector(select => select.selectedDriver);
  const date = new Date(Driver.joined_at);
  const {profileData} = useAppSelector(select => select.profileData);
  const {freeOrders} = useAppSelector(select => select.freeOrders);
  const {isCompleted} = useAppSelector(select => select.isCompleted);
  const dispatch = useAppDispatch();

  const cityKeys: any = {
    NK: 'Нукус',
    SB: 'Шымбай',
  };

  return (
    <>
      <View style={{marginBottom: 180}}>
        {freeOrders.length > 0 ? (
          <View
            style={{
              gap: 10,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 10,
            }}>
            {freeOrders.map((order, index) => (
              <View key={order.id} style={{marginVertical: 5}}>
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
                      {cityKeys[order.from_city]} {'->'}{' '}
                      {cityKeys[order.to_city]}
                    </Text>
                  </View>
                  <View style={orderStyle.orderDetail}>
                    <Text
                      style={[
                        orderStyle.text,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      Адрес: {order.address}
                    </Text>
                    <Text
                      style={[
                        orderStyle.text,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      Номер: {order.client.phone_number}
                    </Text>
                    <Text
                      style={[
                        orderStyle.text,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      Пассажиров: {order.passengers}
                    </Text>
                    <Text
                      style={[
                        orderStyle.text,
                        themeColor === 'light' && lightTheme.lightText,
                      ]}>
                      Дата: {new Date(order.created_at).toLocaleDateString()}{' '}
                      {new Date(order.created_at).toLocaleTimeString()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      send({type: 'accept', order_id: `${order.id}`});
                    }}
                    style={orderStyle.button}>
                    <Text style={[driverStyles.userTxt, {fontSize: 14}]}>
                      Принять
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <></>
        )}
        {listDrivers.length > 0 ? (
          listDrivers.map((user, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(selectedDriver(user.id));
                dispatch(selected());
                refRBSheet.current.open();
              }}
              key={user.id}
              style={[
                driverStyles.driversTableRow,
                user.username === profileData.username
                  ? themeColor !== 'light'
                    ? driverStyles.active
                    : {backgroundColor: '#f1f1f1'}
                  : null,
              ]}>
              <View style={driverStyles.driverInfo}>
                <Text style={driverStyles.span}>{index + 1}</Text>
                <View style={driverStyles.userName}>
                  <Text
                    style={[
                      driverStyles.userTxt,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {user.first_name}
                  </Text>
                  <Text
                    style={[
                      driverStyles.userTxt,
                      themeColor === 'light' && lightTheme.lightText,
                    ]}>
                    {user.last_name}
                  </Text>
                  <Text style={driverStyles.userCarTxt}>
                    {user.car_number} · {user.username}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  driverStyles.userCarTxt,
                  {fontWeight: '400', color: 'gray'},
                ]}>
                {user.passengers} / 4
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 700,
            }}>
            {isCompleted ? (
              <View style={{alignItems: 'center', gap: 5}}>
                <Icon name="checkmark" size={56} color="#72cf4a" />
                <Text
                  style={{
                    color: themeColor === 'light' ? 'black' : 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    width: 250,
                    textAlign: 'center',
                  }}>
                  Вы набрали нужное количество пассажиров
                </Text>
              </View>
            ) : (
              <Text style={{color: 'gray', fontSize: 16, fontWeight: '600'}}>
                Список пуст
              </Text>
            )}
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          height={170}
          closeOnPressBack={true}
          dragOnContent={false}
          draggable={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: themeColor === 'light' ? 'black' : '#FFF',
            },
            container: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: themeColor === 'light' ? '#fff' : '#212121',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            },
          }}
          customModalProps={{
            animationType: 'fade',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={driverStyles.driverWrapper}>
            <Text
              style={[
                driverStyles.h1,
                themeColor === 'light' && {color: 'black'},
              ]}>
              {Driver.first_name} {Driver.last_name}
            </Text>
            <Text style={driverStyles.span}>
              Гос.номер: {Driver.car_number}
            </Text>
            <Text style={driverStyles.span}>
              Марка автомобиля: {Driver.car_brand}
            </Text>
            <Text style={driverStyles.span}>
              Присоединился в: {date.toLocaleDateString()}{' '}
              {date.toLocaleTimeString()}
            </Text>
            <Text style={driverStyles.span}>
              Всего пассажиров: {Driver.passengers}/4
            </Text>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default Line;
