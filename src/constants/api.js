const BASE_PATH = '/api';

// 소문자만 입력한다.
// /api/분류별 base path/요청대상
export const API_URL = {
  ACCOUNT: {
    LOGIN: `${BASE_PATH}/login`,
    REFRESH: `${BASE_PATH}/login`,
  },
  TEST: {
    PING: `${BASE_PATH}/ping`,
    PING_PARAM: (id) => `${BASE_PATH}/ping/${id}`,
  },
};

export const EXCEPT_CHECK_TOKEN_LIST = [API_URL.ACCOUNT.LOGIN, API_URL.TEST.PING, API_URL.TEST.PING_PARAM];
