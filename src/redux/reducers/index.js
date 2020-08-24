import { combineReducers } from "redux";

import register from "./Register";
import login from "./Login";
import logout from "./LogOut";

export const rootReducer = combineReducers({
  register,
  login,
  logout,
});
