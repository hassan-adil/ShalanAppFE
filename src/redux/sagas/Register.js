import { take, put, call, fork } from "redux-saga/effects";

import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/Register";
import ApiSauce from "../../services/apiSauce";
import { REGISTER_API } from "../../config/WebServices";
import { ErrorHelper } from "../../helpers";

function callRequest(data) {
    return ApiSauce.post(REGISTER_API, data);
}
function* watchRequest() {
    while (true) {
        const { payload } = yield take(types.REGISTER.REQUEST);
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

