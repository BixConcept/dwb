import {
    combineReducers
} from "redux"
import assignments from "./assignments";
import auth from "./auth"


export default combineReducers({
    assignments,
    auth
})