import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {alertStyle} from './styles';

import {Component} from 'react';
import {connect} from 'react-redux';
import {removeOrder} from '../../../features/users/usersSlice';
import LocalNotification from '../../../localNotifications';
import {OrderActions} from './utils';

class Alert extends Component {
  constructor(props, dispatch) {
    super(props);
    this.dispatch = dispatch;
    this.state = {
      counter: 15,
      isAlertShown: false,
    };
  }
  componentDidMount() {
    const {dispatch, id, address, isAlert} = this.props;
    if (isAlert.isAlert === true) {
      LocalNotification(address);
      this.setState(() => ({
        isAlertShown: true,
      }));
      this.interval = setInterval(() => {
        if (this.state.counter === 1) {
          clearInterval(this.interval);
          dispatch(removeOrder(id));
          // this.tst.rejectOrder();
          this.setState(() => ({
            isAlertShown: false,
          }));
        }

        this.setState(prevState => ({
          counter: prevState.counter - 1,
        }));
      }, 1000);
    }
  }

  render() {
    const {id, from, to, address, client, passengers} = this.props;
    const cityKeys = {
      NK: 'Нукус',
      SB: 'Шымбай',
    };

    this.tst = new OrderActions(this.props.dispatch, id);

    return (
      <View
        style={[
          alertStyle.container,
          !this.state.isAlertShown ? {display: 'none'} : {},
          this.props.isAlert.themeColor === 'light'
            ? {backgroundColor: 'white'}
            : {},
        ]}>
        <View style={alertStyle.alertHeader}>
          <Text
            style={[
              alertStyle.orderTitle,
              this.props.isAlert.themeColor === 'light' ? {color: 'black'} : {},
            ]}>
            Новый заказ:
          </Text>
          <View style={alertStyle.alertCounter}>
            <Text
              style={[
                alertStyle.alertCounterTxt,
                this.props.isAlert.themeColor === 'light'
                  ? {color: 'white'}
                  : {},
              ]}>
              {this.state.counter}
            </Text>
          </View>
        </View>
        <View style={alertStyle.orderDetail}>
          <Text
            style={[
              alertStyle.text,
              this.props.isAlert.themeColor === 'light' ? {color: 'black'} : {},
            ]}>
            {cityKeys[from]} {'->'} {cityKeys[to]}
          </Text>
          <Text
            style={[
              alertStyle.text,
              this.props.isAlert.themeColor === 'light' ? {color: 'black'} : {},
            ]}>
            Адрес: <Text style={{fontWeight: '400'}}>{address}</Text>
          </Text>
          <Text
            style={[
              alertStyle.text,
              this.props.isAlert.themeColor === 'light' ? {color: 'black'} : {},
            ]}>
            Пассажиров: {passengers}
          </Text>
          <Text
            style={[
              alertStyle.text,
              this.props.isAlert.themeColor === 'light' ? {color: 'black'} : {},
            ]}>
            Номер: {client.phone_number}
          </Text>
        </View>
        <View style={alertStyle.buttons}>
          <TouchableOpacity
            onPress={() => {
              this.setState(prevState => ({
                isAlertShown: false,
              }));
              this.tst.acceptOrder();
            }}
            style={alertStyle.button}>
            <Text style={alertStyle.buttonTxt}>Принять</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState(prevState => ({
                isAlertShown: false,
              }));
              this.tst.rejectOrder();
            }}
            style={[alertStyle.button, {backgroundColor: '#EF4040'}]}>
            <Text style={alertStyle.buttonTxt}>Отклонить</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAlert: state.isAlert,
});

export default connect(mapStateToProps)(Alert);
