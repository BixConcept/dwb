import {
    combineReducers
} from "redux"
import assignments from "./assignments";
import auth from "./auth"
import teams from "./teams";


export default combineReducers({
    assignments,
    auth,
    teams
})