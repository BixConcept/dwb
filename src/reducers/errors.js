import { GET_ERROR } from "../actions/types";

const initialState = {
  login: "",
  register: "",

  createAssignment: "",

  createTeam: "",
  addMember: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        [action.payload.type]: action.payload.error
      };

    default:
      return state;
  }
}
