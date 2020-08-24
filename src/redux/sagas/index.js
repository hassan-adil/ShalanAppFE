import { fork } from "redux-saga/effects";

import register from "./Register";
import login from "./Login";
import logout from "./Login";

export default function* rootSaga() {
  yield fork(register);
  yield fork(login);
  yield fork(logout);
}
