export const USER_ROLE = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
};

export const ERROR_TYPE = {
  // 400
  BAD_REQUEST: { errorCode: 40000, message: 'Invalid input parameters.' },
  INVALID_SERVER: { errorCode: 40001, message: '존재하지 않는 서버정보입니다.' },

  // 401
  // 토큰 에러
  INVALID_TOKEN_ERROR: { errorCode: 40100, message: 'Invalid token.' },
  EXPIRED_ACCESSTOKEN_ERROR: { errorCode: 40101, message: 'Expired accessToken.' },
  EXPIRED_REFRESH_TOKEN_ERROR: { errorCode: 40102, message: 'Expired refreshToken.' },
  TOKEN_CONFIG_MODIFIED_ERROR: { errorCode: 40103, message: 'Token config has modified.' },
  TOKEN_CREATE_ERROR: { errorCode: 40104, message: 'Failed create token.' },
  LOST_USER_LOGIN: { errorCode: 40105, message: 'Not found Login User.' },

  // 404
  NOT_FOUND: { errorCode: 40400, message: 'Not found.' },

  // 500
  // 서버 에러
  INVALID_ACCOUNT_ERROR: { errorCode: 50000, message: '잘못된 아이디 또는 비밀번호입니다.' },

  // DB
  DB_QUERY_ERROR: { errorCode: 50010, message: 'DB 오류가 발생 했습니다.' },
};
