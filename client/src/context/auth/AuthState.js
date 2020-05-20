import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CHANGE_BIO,
    CHANGE_ERROR
} from '../types';
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        role: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const response = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    };

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    //Login
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    };

    const changeBIO = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.put("api/users", formData, config);

            dispatch({
                type: CHANGE_BIO,
                payload: response.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: CHANGE_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            role: state.role,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            login,
            loadUser,
            logout,
            changeBIO,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;