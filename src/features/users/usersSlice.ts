import {createSlice} from '@reduxjs/toolkit';

interface UsersState {
  listDrivers: Array<any>;
  Driver: {
    id: number;
    first_name: string;
    last_name: string;
    car_number: string;
    passengers: number;
    joined_at: string;
  };
  websocket: any;
  isSelected: boolean;
  isLogined: boolean;
  isWork: boolean;
  isAlert: boolean;
  ordersDetails: any[];
  themeColor: string;
  profileData: any;
}

const initialState: UsersState = {
  listDrivers: [],
  websocket: {},
  Driver: {
    id: 0,
    first_name: '',
    last_name: '',
    car_number: '',
    passengers: 0,
    joined_at: '',
  },
  isSelected: false,
  isLogined: false,
  isWork: false,
  isAlert: false,
  ordersDetails: [],
  themeColor: '',
  profileData: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    listUsers: (state, action) => {
      state.listDrivers = action.payload;
    },
    selectedDriver: (state, action) => {
      let selectedDriver = state.listDrivers.find(
        obj => obj.id === action.payload,
      );

      if (selectedDriver) {
        state.Driver = selectedDriver;
      }
    },
    setWebsocket: (state, action) => {
      state.websocket = action.payload;
    },
    selected: state => {
      state.isSelected = !state.isSelected;
    },
    logined: state => {
      state.isLogined = true;
    },
    logout: state => {
      state.isLogined = false;
    },
    work: state => {
      state.isWork = !state.isWork;
    },
    orderAlert: (state, action) => {
      state.isAlert = action.payload;
    },
    setOrdersDetail: (state, action) => {
      const newDatas = [...state.ordersDetails, action.payload];
      state.ordersDetails = newDatas;
      console.log(state.ordersDetails);
    },
    removeOrder: (state, action) => {
      state.ordersDetails = state.ordersDetails.filter(
        item => item.id !== action.payload,
      );
      console.log('Order', state.ordersDetails);
      console.log('Id', action.payload);
    },
    themeToggler: (state, action) => {
      state.themeColor = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const {
  listUsers,
  selected,
  setWebsocket,
  selectedDriver,
  logined,
  work,
  logout,
  orderAlert,
  setOrdersDetail,
  removeOrder,
  themeToggler,
  setProfileData,
} = usersSlice.actions;
export default usersSlice.reducer;
