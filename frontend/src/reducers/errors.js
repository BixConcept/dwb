import {GET_ERROR} from "../actions/types";

const initialState = {
    errors: {
        login: "",
        register: "",
        createAssignment: "",
        createTeam: "",
        addMember: ""
    },
    options: {
        login: {
            401: "invalid credentials",
            default: "some error happened while logging you in"
        },
        register: {
            409: "username is already taken",
            default: "some error happened while creating user"
        },

        createAssignment: {
         default: "error creating assignment"
        },

        createTeam: {
            default: "error creating team"
        },
        addMember: {
            default: "error adding member"
        }
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERROR:
            if (
                state.options[action.payload.type][action.payload.status] === undefined
            )
                return {
                    ...state,
                    errors: {
                        [action.payload.type]: state.options[action.payload.type].default
                    }
                };
            else
                return {
                    ...state,
                    errors: {
                        [action.payload.type]: state.options[action.payload.type][action.payload.status]
                    }
                };

        default:
            return state;
    }
}
