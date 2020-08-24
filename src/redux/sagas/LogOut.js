import { take, put, call, fork } from "redux-saga/effects";

import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/LogOut";

import ApiSauce from "../../services/apiSauce";
import { LOGOUT_API } from "../../config/WebServices";
import { ErrorHelper } from "../../helpers";

function callRequest(data) {
  const { token } = data
  return ApiSauce.postWithToken(LOGOUT_API, {}, token);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.EMPLOYEE_LOGOUT.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response));
    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
