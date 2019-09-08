import {
  GET_TEAM,
  ADD_USER_TO_TEAM,
  CREATE_TEAM,
  SET_IS_TEAM_MEMBER,
  GET_ALL_TEAMS
} from "./types";
import axios from "axios";

import store from "../store";

import { API_HOST } from "../index";

// GET_TEAM
export const getTeam = () => dispatch => {
  axios
    .get(API_HOST + "/team/", {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: GET_TEAM,
        payload: res.data
      });
    });
};

export const createTeam = name => dispatch => {
  axios
    .post(
      API_HOST + "/team/",
      JSON.stringify({
        name
      }),
      {
        withCredentials: true
      }
    )
    .then(res => {
      console.log(res.data);

      dispatch({
        type: CREATE_TEAM,
        payload: res.data
      });
      store.dispatch({
        type: SET_IS_TEAM_MEMBER,
        payload: !false
      });
    })
    .catch(err => {
      dispatch({
        type: "createTeam",
        error: "error creating team."
      });
    });
};

// ADD_USER_TO_TEAM
export const addUserToTeam = username => dispatch => {
  axios
    .post(API_HOST + "/team/addMember/", JSON.stringify(username), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: ADD_USER_TO_TEAM,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "addMember",
        error: "error adding user to team."
      });
    });
};

export const getAllTeams = () => dispatch => {
  axios
    .get(API_HOST + "/team/all", {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: GET_ALL_TEAMS,
        payload: res.data
      });
    });
};
