import { GET_TEAM } from "./types";
import axios from "axios";

// GET_TEAM
export const getTeam = () => dispatch => {
  axios
    .get("http://localhost:8000/team/", {
      withCredentials: true
    })
    .then(res => {
        dispatch({
            type: GET_TEAM,
            payload: res.data
        })
    })
};
