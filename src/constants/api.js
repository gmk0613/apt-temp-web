const BASE_PATH = '/api';

// 소문자만 입력한다.
// /api/분류별 base path/요청대상
export const API_URL = {
  ACCOUNT: {
    LOGIN: `${BASE_PATH}/login`,
    REFRESH: `${BASE_PATH}/login`,
  },
};

export const EXCEPT_CHECK_TOKEN_LIST = [API_URL.ACCOUNT.LOGIN];
