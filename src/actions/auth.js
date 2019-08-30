import axios from "axios";
import { LOGIN, REGISTER, GET_USER, SET_AUTHENTICATED } from "./types";
import { GET_ERROR } from "./types";

import { API_HOST } from "../index";

export const login = user => dispatch => {
  axios
    .post(API_HOST + "/user/login/", JSON.stringify(user), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: LOGIN
      });
    })
    .catch(err => {
      console.log(err);
      if (err.response === undefined) return;
      dispatch({
        type: GET_ERROR,
        payload: {
          type: "login",
          status: err.response.status
        }
      });
    });
};

export const register = user => dispatch => {
  axios
    .post(API_HOST + "/user/register", JSON.stringify(user), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: REGISTER
      });
    })
    .catch(err => {
      console.log(err);
      if (err.response === undefined) return;
      dispatch({
        type: GET_ERROR,
        payload: {
          type: "register",
          status: err.response.status
        }
      })
    });
};

export const getUser = () => dispatch => {
  axios
    .get(API_HOST + "/user/", {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: SET_AUTHENTICATED,
    payload: false
  });
};

export const setAuthenticated = authenticated => dispatch => {
  dispatch({
    type: SET_AUTHENTICATED,
    payload: authenticated
  });
};
