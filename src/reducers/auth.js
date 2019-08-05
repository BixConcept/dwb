import {
  LOGIN,
  REGISTER,
  GET_USER,
  SET_AUTHENTICATED,
  SET_IS_TEAM_MEMBER
} from "../actions/types";

const initialState = {
  user: {},
  isAuthenticated: !!false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case SET_IS_TEAM_MEMBER:
      return {
        ...state,
        user: { team_member: action.payload }
      };
    default:
      return state;
  }
}
