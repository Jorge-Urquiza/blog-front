const HTTP_ERROR_CODES = {
  EXPIRED_TOKEN: {
    CODE: 403,
    MESSAGE: 'EXPIRED_TOKEN',
  },
  ACCESS_DENIED: {
    CODE: 403,
    MESSAGE: 'ACCESS_DENIED',
  },
  INVALID_HEADER: {
    CODE: 401,
    MESSAGE: 'INVALID_HEADER',
  },
};
export default HTTP_ERROR_CODES;
