import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ERROR_TYPE } from '../constants/consts';
import { API_URL, EXCEPT_CHECK_TOKEN_LIST } from '../constants/api';
import router from '../routes';
import store from '../store/store';

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
  async postFileUpload(url, params) {
    try {
      const res = await axios.post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (e) {
      if (typeof e === 'string' && e.indexOf('ECONNRESET') > 0) {
        // Vue.$alert.close();
      }
      return e;
    }
  },
  async postFileDown(url, params) {
    try {
      const res = await axios.post(url, params, { responseType: 'blob' });
      const linkUrl = window.URL.createObjectURL(new Blob([res.data]));
      let fileName = res.headers['content-disposition'];
      if (fileName === undefined) {
        return res.data;
      }
      if (fileName) {
        fileName = fileName.split(';')[1];
        fileName = fileName.split('=')[1].replace(/"/g, "'");
        fileName = decodeURI(fileName);
      } else {
        fileName = 'filename';
      }
      const link = document.createElement('a');
      link.href = linkUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      return Promise.resolve(res);
    } catch (e) {
      const resText = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('abort', reject);
        reader.addEventListener('error', reject);
        reader.addEventListener('loadend', () => {
          resolve(reader.result);
        });
        const txt = e.response ? e.response.data : 'None';
        reader.readAsText(txt);
      });
      const resData = JSON.parse(resText);
      // Vue.$alert.error(resData.errorMsg);
      console.log(`error : ${resData.errorMsg}`);
      return resData;
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
  const store = store;
  const requestUrl = config.url;

  const account = store.state.account;

  // account 와 accessToken 이 필요없는 요청(login 등)
  if (EXCEPT_CHECK_TOKEN_LIST.includes(requestUrl)) return config;

  // // account 와 accessToken 없을 경우 login 화면 이동
  if (!account.userId || !account.accessToken) {
    const err = 'Session expired.';
    // Vue.$alert.info('로그인이 필요합니다.');
    console.log('로그인이 필요합니다.');
    router.push({ name: 'LOGIN' }).catch(() => {});
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
  if (resp.data && resp.data.updatedToken) {
    // update 된 user info 가 있다면 sotre 갱신
    const store = store;
    const payload = {
      accessToken: resp.data.updatedToken,
      data: jwt.decode(resp.data.updatedToken),
    };
    store.commit('account/updateSession', payload);
  }
  return resp;
}

// check error
async function checkError(e) {
  console.error('API error occurred:', e);

  const res = e.response;

  // if (e.status == 500 && e.response.data.errorCode == undefined) {
  if (typeof res?.data === 'string') {
    if (res.data.indexOf('ECONNREFUSED') > 0) {
      // Vue.$alert.error('서버 연결에 실패 했습니다.');
      console.log('서버 연결에 실패 했습니다.');
    } else {
      // Vue.$alert.error('서버 연결에 실패 했습니다.(Unknown)');
      console.log('서버 연결에 실패 했습니다.(Unknown)');
    }
    console.error(e);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ errorCode: ERROR_TYPE.INTERNAL_SERVER_ERROR, errorMsg: 'Server error.' });
  }

  const store = store;
  const msg = res.data.errorMsg
    ? `${res.data.errorMsg}(code: ${res.data.errorCode})`
    : '알 수 없는 오류. 관리자에게 문의하세요.';

  const errorCode = res.data.errorCode;
  const data = res.data.data;
  const url = res.config.url;

  // errorCode 별 분기 후 execption 처리.

  if (errorCode === ERROR_TYPE.EXPIRED_ACCESSTOKEN_ERROR.errorCode) {
    // accessToken expired
    const rst = await store.dispatch('account/refresh');
    if (rst) {
      return axios.request(res.config);
    }
  } else if (errorCode === ERROR_TYPE.EXPIRED_REFRESH_TOKEN_ERROR.errorCode) {
    // refreshToken expired
    if (url !== '/api/login') {
      // Vue.$alert.error('세션 오류\n세션이 만료되었습니다.\n다시 로그인 해주세요.');
      console.log('세션 오류\n세션이 만료되었습니다.\n다시 로그인 해주세요.');
      removeSession();
      router.push('/auth/login').catch(() => {});
    }
  } else if (errorCode === ERROR_TYPE.LOST_USER_LOGIN.errorCode) {
    // refreshToken expired
    if (url !== '/api/login') {
      // Vue.$alert.error('로그인 유저정보가 존재하지 않습니다.\n다시 로그인 해주세요.');
      console.log('로그인 유저정보가 존재하지 않습니다.\n다시 로그인 해주세요.');
      removeSession();
      router.push('/auth/login').catch(() => {});
    }
  } else if (errorCode === ERROR_TYPE.TOKEN_CONFIG_MODIFIED_ERROR.errorCode) {
    // 서버 설정에서 token expire 값을 변경. token 재 취득 필요.
    await store.dispatch('account/refreshAll', data);
    return axios.request(res.config);
  } else if (errorCode === ERROR_TYPE.INVALID_SERVER.errorCode) {
    // Vue.$alert.error('존재하지 않는 서버정보입니다.');
    console.log('존재하지 않는 서버정보입니다.');
    router.push('/servers').catch(() => {});
  } else if (res.data instanceof Blob) {
    return Promise.reject(e);
  } else if (
    errorCode === ERROR_TYPE.INVALID_ACCOUNT_ERROR.errorCode ||
    errorCode === ERROR_TYPE.LOCKED_ACCOUNT_ERROR.errorCode
  ) {
    return Promise.reject(res.data);
  } else {
    // 미정의 에러
    // Vue.$alert.error(msg);
    console.log(msg);
  }

  return Promise.reject(res.data);
}

function removeSession() {
  store.dispatch('account/delSession', Object.keys(store.state.account));
}
