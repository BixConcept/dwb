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

      let error =
        err.status === 500 ? "some error happened" : "invalid credentials";

      dispatch({
        type: GET_ERROR,
        payload: {
          type: "login",
          error
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
    }).catch(err => {
      let error = err.status === 500 ? "some error happened" : "username already exists"

      dispatch({
        type: GET_ERROR,
        payload: {
          type: "register",
          error
        }
      })
    })
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
