import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from 'src/constants/api';
import apiHelper from 'src/utils/apiHelper';

const initialStateValue = {
  userId: null,
  userRole: null,
  accessToken: null,
  refreshToken: null,
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
      state.userId = null;
      state.userRole = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateSession: (state, action) => {
      // 어떤 정보를 업데이트할지 정해지지 않음
      console.log('updateSession state', state);
      console.log('updateSession action', action);
    },
    refresh: async (state) => {
      const res = await apiHelper.post(API_URL.ACCOUNT.REFRESH, {});
      if (res.errorCode === 0) {
        state.accessToken = res.data.accessToken;
        return true;
      }
      return false;
    },
    refreshAll: (state, action) => {
      const data = action.data;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
    },
  },
});

export default accountSlice;
