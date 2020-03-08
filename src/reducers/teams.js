import {
  GET_TEAM,
  CREATE_TEAM,
  ADD_USER_TO_TEAM,
  SET_TEAM_MESSAGE
} from "../actions/types";

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
    case ADD_USER_TO_TEAM:
      return {
        ...state,
        team: action.payload
      };
    case SET_TEAM_MESSAGE:
      let foo = state;
      foo.team.message = action.payload;
      return foo;
    default:
      return state;
  }
}
