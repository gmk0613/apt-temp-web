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
    updateSession: (state, action) => {
      console.log("updateSession state", state);
      console.log("updateSession action", action);
    },
    refresh: (state) => {
      console.log("refresh state", state);
      return true;
    },
    test: (state, action) => {
      const data = action.data;
      state.userId = data.userId;
      state.userRole = data.userRole;
    },
    testRefresh: (state, action) => {
      const data = action.data;
      state.refreshToken = data.refreshToken;
      console.log("testRefresh state", data.refreshToken);
    },
  },
  extraReducers: {},
});

export default accountSlice;
