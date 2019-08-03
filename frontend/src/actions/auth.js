import axios from "axios";
import { LOGIN, REGISTER, GET_USER, SET_AUTHENTICATED } from "./types";

export const login = user => dispatch => {
  axios
    .post("https://api.3nt3.de/user/login/", JSON.stringify(user), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: LOGIN
      });
    })
    .catch(err => window.location.href = "/");
};

export const register = user => dispatch => {
  axios
    .post("https://api.3nt3.de/user/register", JSON.stringify(user), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: REGISTER
      });
    });
};

export const getUser = () => dispatch => {
  axios
    .get("https://api.3nt3.de/user/",  {
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
