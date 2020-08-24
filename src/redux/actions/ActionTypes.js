// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}
export const CLEAR_LOGOUT = "CLEAR_LOGOUT";

// USER
export const LOGIN = createRequestTypes("LOGIN");
export const REGISTER = createRequestTypes("REGISTER");
export const LOGOUT = createRequestTypes("LOGOUT");