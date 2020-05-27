import {
    AUTH_ERROR,
    AVATAR_ERROR, CHANGE_AVATAR,
    CHANGE_BIO,
    CHANGE_ERROR,
    CLEAR_ERRORS,
    GET_AVATAR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                role: action.payload.role
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case GET_AVATAR:
            return {
                ...state,
                avatar: action.payload.imgName,
                loading: false
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.payload.imgName,
                loading: false
            };
        case CHANGE_BIO:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case AVATAR_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case CHANGE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}