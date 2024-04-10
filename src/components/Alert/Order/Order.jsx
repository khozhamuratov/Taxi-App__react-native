import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {orderAlert, removeOrder} from '../../../features/users/usersSlice';
import {send} from '../../../websocketMiddlware';
import {alertStyle} from './styles';

import {Component} from 'react';
import {connect} from 'react-redux';

// type Props = {
//   id: number;
//   from: string;
//   address: string;
//   phoneNumber: string;
//   to: string;
// };

// const Order = (props: Props) => {
//   const [counter, setCounter] = useState(15);
//   const {isAlert} = useAppSelector(select => select.isAlert);
//   const dispatch = useAppDispatch();

//   const acceptOrder = () => {
//     dispatch(orderAlert(false));
//     send({type: 'asdadsd'});
//     dispatch(removeOrder(props.id));
//   };
//   const rejectOrder = () => {
//     dispatch(orderAlert(false));
//     dispatch(removeOrder(props.id));
//   };

//   useEffect(() => {
//     if (isAlert) {
//       const interval = setInterval(() => {
//         setCounter(prevSeconds => {
//           if (prevSeconds === 1) {
//             clearInterval(interval);
//             dispatch(orderAlert(false));
//             dispatch(removeOrder(props.id));
//           }
//           return prevSeconds - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isAlert]);

//   return (
//     <View style={[alertStyle.container, !isAlert ? {display: 'none'} : {}]}>
//       <View style={alertStyle.alertHeader}>
//         <Text style={alertStyle.orderTitle}>Новый заказ:</Text>
//         <View style={alertStyle.alertCounter}>
//           <Text style={alertStyle.alertCounterTxt}>{counter}</Text>
//         </View>
//       </View>
//       <View style={alertStyle.orderDetail}>
//         <Text style={alertStyle.text}>
//           {props.from} {props.to}
//         </Text>
//         <Text style={alertStyle.text}>Адрес: {props.address}</Text>
//         <Text style={alertStyle.text}>Номер: {props.phoneNumber}</Text>
//       </View>
//       <View style={alertStyle.buttons}>
//         <TouchableOpacity
//           onPress={() => acceptOrder()}
//           style={alertStyle.button}>
//           <Text style={alertStyle.buttonTxt}>Принять</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => rejectOrder()}
//           style={[alertStyle.button, {backgroundColor: '#EF4040'}]}>
//           <Text style={alertStyle.buttonTxt}>Отклонить</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Order;

class Test {
  constructor(dispatch, id) {
    this.dispatch = dispatch;
    this.id = id;
  }

  acceptOrder = () => {
    this.dispatch(orderAlert(false));
    send({type: 'accept', order_id: `${this.id}`});
    this.dispatch(removeOrder(this.id));
    console.log('orderId', this.id);
  };
  rejectOrder = () => {
    this.dispatch(orderAlert(false));
    this.dispatch(removeOrder(this.id));
  };
}

connect()(Test);

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 15,
      isAlertShown: false,
    };
  }
  componentDidMount() {
    if (this.props.isAlert.isAlert === true) {
      this.setState(prevState => ({
        isAlertShown: true,
      }));
      this.interval = setInterval(() => {
        if (this.state.counter === 1) {
          clearInterval(this.interval);
          this.setState(prevState => ({
            isAlertShown: false,
          }));
          console.log(this.state.isAlertShown);
          // this.props.dispatch(removeOrder(this.props.id));
        }

        this.setState(prevState => ({
          counter: prevState.counter - 1,
        }));
      }, 1000);
    }
  }

  render() {
    const {id} = this.props;
    const {from} = this.props;
    const {to} = this.props;
    const {address} = this.props;
    const {phoneNumber} = this.props;

    this.tst = new Test(this.props.dispatch, id);

    return (
      <View
        style={[
          alertStyle.container,
          !this.state.isAlertShown ? {display: 'none'} : {},
        ]}>
        <View style={alertStyle.alertHeader}>
          <Text style={alertStyle.orderTitle}>Новый заказ:</Text>
          <View style={alertStyle.alertCounter}>
            <Text style={alertStyle.alertCounterTxt}>{this.state.counter}</Text>
          </View>
        </View>
        <View style={alertStyle.orderDetail}>
          <Text style={alertStyle.text}>
            {from} {to}
          </Text>
          <Text style={alertStyle.text}>Адрес: {address}</Text>
          <Text style={alertStyle.text}>Номер: {phoneNumber}</Text>
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
