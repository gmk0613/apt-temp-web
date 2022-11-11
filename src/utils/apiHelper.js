import axios from 'axios';
import jwt from 'jwt-decode';
import store from '../store/store'
import { ERROR_TYPE } from '../constants/consts';
import { API_URL, EXCEPT_CHECK_TOKEN_LIST } from '../constants/api';
import appHistory from '../appHistory';

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

axios.interceptors.request.use(checkToken);

axios.interceptors.response.use(checkResponse, checkError);

export default {
  async get(url, params) {
    try {
      const res = await axios.get(url, { params });
      return res.data;
    } catch (e) {
      return e;
    }
  },

  async post(url, params) {
    try {
      const res = await axios.post(url, params);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  async put(url, params) {
    try {
      const res = await axios.put(url, params);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  async patch(url, params) {
    try {
      const res = await axios.patch(url, params);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  async delete(url, params) {
    try {
      const res = await axios.delete(url, { data: params });
      return res.data;
    } catch (e) {
      return e;
    }
  },
};

/**
 *  토큰 체크 과정
 *  1. account, accessToken 이 필요 없으면 그대로 요청
 *  2. account, accessToken 이 없으면 login 화면 이동
 *  3. refresh 요청일 시 header에 refreshToken 담아 요청
 *  4. 그 외에는 header에 accessToken 담아 요청
 */
async function checkToken(config) {
  const requestUrl = config.url;

  const account = store.getState().account;

  // account 와 accessToken 이 필요없는 요청(login 등)
  if (EXCEPT_CHECK_TOKEN_LIST.includes(requestUrl)) return config;

  // account 와 accessToken 없을 경우 login 화면 이동
  if (!account.userId || !account.accessToken) {
    const err = 'Session expired.';
    alert('로그인이 필요합니다.');
    appHistory.push("/login");
    return err;
  }

  const refreshToken = account.refreshToken;

  // refresh 요청시
  if (requestUrl === API_URL.ACCOUNT.REFRESH) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
    return config;
  }

  config.headers.Authorization = `Bearer ${account.accessToken}`;
  return config;
}

// check response
function checkResponse(resp) {
  console.log("checkResponse", resp);
  if (resp.data && resp.data.updatedToken) {
    // update 된 user info 가 있다면 sotre 갱신
    const payload = {
      accessToken: resp.data.updatedToken,
      data: jwt.decode(resp.data.updatedToken),
    };
    // store.dispatch({type: 'account/updateSession', payload});
  }
  return resp;
}

//  check error
async function checkError(e) {
  console.error('API error occurred:', e);

  const res = e.response;
  const dispatch = store.dispatch();

  if (typeof res?.data === 'string') {
    if (res.data.indexOf('ECONNREFUSED') > 0) {
      alert('서버 연결에 실패 했습니다.');
    } else {
      alert('서버 연결에 실패 했습니다.(Unknown)');
    }
    console.error(e);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ errorCode: ERROR_TYPE.INTERNAL_SERVER_ERROR, errorMsg: 'Server error.' });
  }

  const msg = res.data.errorMsg
    ? `${res.data.errorMsg}(code: ${res.data.errorCode})`
    : '알 수 없는 오류. 관리자에게 문의하세요.';

  const errorCode = res.data.errorCode;
  const data = res.data.data;
  const url = res.config.url;

  // errorCode 별 분기 후 execption 처리.
  console.log(errorCode);
  if (errorCode === ERROR_TYPE.EXPIRED_ACCESSTOKEN_ERROR.errorCode) {
    // accessToken expired
    const rst = await dispatch('account/refresh');
    if (rst) {
      return axios.request(res.config);
    }
  } else if (errorCode === ERROR_TYPE.EXPIRED_REFRESH_TOKEN_ERROR.errorCode) {
    // refreshToken expired
    if (url !== '/api/login') {
      alert('세션 오류\n세션이 만료되었습니다.\n다시 로그인 해주세요.');
      dispatch({type: 'account/logout'});
      appHistory.push("/login");
    }
  } else if (errorCode === ERROR_TYPE.LOST_USER_LOGIN.errorCode) {
    //  refreshToken expired
    if (url !== '/api/login') {
      alert('로그인 유저정보가 존재하지 않습니다.\n다시 로그인 해주세요.');
      dispatch({type: 'account/logout'});
      appHistory.push("/login");
    }
  } else if (errorCode === ERROR_TYPE.TOKEN_CONFIG_MODIFIED_ERROR.errorCode) {
    // 서버 설정에서 token expire 값을 변경. token 재 취득 필요.
    await dispatch({type: 'account/refreshAll', data});
    return axios.request(res.config);
  } else if (errorCode === ERROR_TYPE.INVALID_SERVER.errorCode) {
    alert('존재하지 않는 서버정보입니다.');
    appHistory.push("/login");
  } else if (res.data instanceof Blob) {
    return Promise.reject(e);
  } else if (
    errorCode === ERROR_TYPE.INVALID_ACCOUNT_ERROR.errorCode ||
    errorCode === ERROR_TYPE.LOCKED_ACCOUNT_ERROR.errorCode
  ) {
    return Promise.reject(res.data);
  } else {
    console.log(msg);
  }

  return Promise.reject(res.data);
}