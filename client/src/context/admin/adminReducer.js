import {
    CLEAR_ERRORS,
    DELETE_USER,
    GET_ALL_USERS, USERS_FAIL

} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user._id !== action.payload)]
            };
        case USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}