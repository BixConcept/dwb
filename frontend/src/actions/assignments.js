import {
  GET_ASSIGNMENTS,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from "./types";
import axios from "axios";

// GET_ASSIGNMENTS
export const getAssignments = () => dispatch => {
  fetch("https://api.3nt3.de/assignment/", {
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
    .post("https://api.3nt3.de/assignment/", JSON.stringify(assignment), {
      withCredentials: true
    })
    .then(res => {
      dispatch({
        type: CREATE_ASSIGNMENT,
        payload: assignment
      });
    })
    .catch(err => console.log(err));
};

// delete ASSIGNMENT

export const deleteAssignment = assignment => dispatch => {
  //console.log(assignment)
  axios
    .delete(`https://api.3nt3.de/assignment/${assignment.id}/`)
    .then(res => {
      console.log(assignment);
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: assignment.id
      });
    })
    .catch(err => console.log(err));
};