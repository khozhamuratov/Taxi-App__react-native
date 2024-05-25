import {createSlice} from '@reduxjs/toolkit';

interface UsersState {
  listDrivers: Array<any>;
  Driver: {
    id: number;
    first_name: string;
    last_name: string;
    car_number: string;
    car_brand: string;
    passengers: number;
    joined_at: string;
  };
  alertType: any;
  isSelected: boolean;
  isLogined: boolean;
  isWork: boolean;
  isAlert: boolean;
  isHidden: boolean;
  isCompleted: boolean;
  ordersDetails: any[];
  themeColor: string;
  profileData: any;
  freeOrders: any[];
}

const initialState: UsersState = {
  listDrivers: [],
  alertType: {},
  Driver: {
    id: 0,
    first_name: '',
    last_name: '',
    car_number: '',
    car_brand: '',
    passengers: 0,
    joined_at: '',
  },
  isSelected: false,
  isLogined: false,
  isWork: false,
  isAlert: false,
  isCompleted: false,
  isHidden: false,
  ordersDetails: [],
  themeColor: '',
  profileData: {},
  freeOrders: [],
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
      state.ordersDetails = [action.payload];
    },
    removeOrder: (state, action) => {
      state.ordersDetails = state.ordersDetails.filter(
        item => item.id !== action.payload,
      );
    },
    themeToggler: (state, action) => {
      state.themeColor = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setFreeOrders: (state, action) => {
      state.freeOrders = action.payload;
    },
    setCompleted: (state, action) => {
      state.isCompleted = action.payload;
    },
    showAlert: (state, action) => {
      state.isHidden = true;
      state.alertType = action.payload;
    },
    clearAlert: state => {
      state.isHidden = false;
      state.alertType = null;
    },
  },
});

export const {
  listUsers,
  selected,
  selectedDriver,
  logined,
  work,
  logout,
  orderAlert,
  setOrdersDetail,
  removeOrder,
  themeToggler,
  setProfileData,
  setFreeOrders,
  setCompleted,
  showAlert,
  clearAlert,
} = usersSlice.actions;
export default usersSlice.reducer;
