import axios from "axios";
import { API_HOST } from "..";
import { GET_ALL_USERS, GET_ALL_TEAMS, GET_ALL_ASSIGNMENTS } from "./types";

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

export const getAllAssignments = () => dispatch => {
  axios.get(API_HOST + "/assignment/all", {
    withCredentials: true
  }).then(res => {
    dispatch({
      type: GET_ALL_ASSIGNMENTS,
      payload: res.data
    });
  });
};

export const getAllTeams = () => dispatch => {
  axios.get(API_HOST + "/team/all", {
    withCredentials: true
  }).then(res => {
    dispatch({
      type: GET_ALL_TEAMS,
      payload: res.data
    });
  });
};
