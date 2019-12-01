import { GET_ASSIGNMENTS, CREATE_ASSIGNMENT, DELETE_ASSIGNMENT } from "./types";
import axios from "axios";

import { API_HOST } from "../index";

// GET_ASSIGNMENTS
export const getAssignments = () => dispatch => {
  fetch(API_HOST + "/assignment/", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res
      });
    })
    .catch(err => console.log(err));
};

// CREATE_ASSIGNMENTS
export const createAssignment = assignment => dispatch => {
  assignment.due_date = new Date(assignment.due_date);
  axios
    .post(API_HOST + "/assignment/", JSON.stringify(assignment), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: CREATE_ASSIGNMENT,
        payload: assignment
      });
    })
    .catch(err => {
      dispatch(err => {
        dispatch({
          type: "createAssignment",
          error: "error creating assignment."
        });
      });
    });
};

// delete ASSIGNMENT

export const deleteAssignment = assignment => dispatch => {
  console.log(assignment);
  axios
    // I really hate this line.
    // why is there no real string formatting?
    .delete(API_HOST + "/assignment/" + assignment.id.toString(), {
      withCredentials: true
    })
    .then(res => {
      console.log(assignment);
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: assignment.id
      });
    })
    .catch(err => console.log(err));
};
