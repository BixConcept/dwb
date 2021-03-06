import { combineReducers } from "redux";
import assignments from "./assignments";
import auth from "./auth";
import teams from "./teams";
import errors from "./errors"

export default combineReducers({
  assignments,
  auth,
  teams,
  errors
});
