import { GET_TEAM, CREATE_TEAM, GET_ALL_TEAMS } from "../actions/types";

const initialState = {
  team: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        team: action.payload
      };
    case CREATE_TEAM:
      return {
        ...state,
        team: action.payload
      };
    case GET_ALL_TEAMS:
      return {
        ...state,
        teams: action.payload
      }
    default:
      return state;
  }
}
