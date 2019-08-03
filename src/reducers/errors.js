import {
    GET_ERRORS
} from "../actions/types";


const initialState = {
    error: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                errors: action.payload.error
            };
 
        default:
            return state
    }
}