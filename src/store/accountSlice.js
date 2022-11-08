import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  userId: '',
  userRole: '',
  accessToken: '',
  refreshToken: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialStateValue,
  reducers: {
    login: (state, action) => {
      const data = action.data;
      state.userId = data.userId;
      state.userRole = data.userRole;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
    },
    logout: (state) => {
      state.userId = '';
      state.userRole = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
    test: (state, action) => {
      const data = action.data;
      state.userId = data.userId;
      state.userRole = data.userRole;
    },
  },
  extraReducers: {},
});

export default accountSlice;
