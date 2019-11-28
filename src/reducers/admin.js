import {
  GET_ALL_ASSIGNMENTS,
  GET_ALL_TEAMS,
  GET_ALL_USERS
} from "../actions/types";

const initialState = {
  allUsers: [],
  allAssignments: [],
  allTeams: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case GET_ALL_ASSIGNMENTS:
      return {
        ...state,
        allAssignments: action.payload
      };
    case GET_ALL_TEAMS:
      return {
        ...state,
        allTeams: action.payload
      };
    default:
      return state;
  }
}
