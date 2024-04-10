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
    },
    removeOrder: (state, action) => {
      state.ordersDetails = state.ordersDetails.filter(
        item => item.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    // builder
    // 	.addCase(fetchAllCountries.fulfilled, (state, action) => {
    // 		state.countries = action.payload
    // 	})
    // 	.addCase(fetchAllCountries.rejected, state => {
    // 		state.countries = []
    // 	})
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
} = usersSlice.actions;
export default usersSlice.reducer;
