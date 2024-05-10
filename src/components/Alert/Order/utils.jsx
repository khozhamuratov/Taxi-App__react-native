import {connect} from 'react-redux';
import {orderAlert} from '../../../features/users/usersSlice';
import {send} from '../../../websocketMiddlware';

export class OrderActions {
  constructor(dispatch, id) {
    this.dispatch = dispatch;
    this.id = id;
  }

  acceptOrder = () => {
    this.dispatch(orderAlert(false));
    send({type: 'accept', order_id: `${this.id}`});
    // this.dispatch(removeOrder(this.id));
    console.log('orderId', this.id);
  };
  rejectOrder = () => {
    this.dispatch(orderAlert(false));
    // this.dispatch(removeOrder(this.id));
  };
}

connect()(OrderActions);
