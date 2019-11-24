import axios from "axios";
import { API_HOST } from "..";
import { GET_ALL_USERS, GET_ALL_TEAMS } from "./types";

export const getAllUsers = () => dispatch => {
  axios.get(API_HOST + "/user/all", {
    withCredentials: true
  }).then(res => {
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    });
  });
};
