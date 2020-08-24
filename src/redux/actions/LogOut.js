// @flow

import { LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: LOGOUT.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: LOGOUT.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: LOGOUT.FAILURE
  };
}