import {
  GET_TEAM,
  ADD_USER_TO_TEAM,
  CREATE_TEAM,
  SET_IS_TEAM_MEMBER
} from "./types";
import axios from "axios";

import store from "../store";

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

export const createTeam = (name) => dispatch => {
  axios
    .post("http://localhost:8000/team/", JSON.stringify({
      name
    }), {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data)

      dispatch({
        type: CREATE_TEAM,
        payload: res.data
      })
      store.dispatch({
        type: SET_IS_TEAM_MEMBER,
        payload: !false
      })
    })

}

// ADD_USER_TO_TEAM
export const addUserToTeam = (username) => dispatch => {
  axios
    .post("http://localhost:8000/team/addMember/", JSON.stringify(username), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: ADD_USER_TO_TEAM,
        payload: res.data
      })
    })
}