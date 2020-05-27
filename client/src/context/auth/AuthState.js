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
    CHANGE_ERROR,
    GET_AVATAR,
    AVATAR_ERROR, CHANGE_AVATAR
} from '../types';
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        role: null,
        avatar: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Загрузка пользователя
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const response = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    // Регистрация
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

    // Вход
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
            });
        }
    };

    // Изменение данных пользователя
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

    // Загрузка изображения пользователя
    const getAvatar = async () => {
        try {
            const response = await axios.get('/api/user_img');
            dispatch({
                type: GET_AVATAR,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: AVATAR_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    // Изменение изображения пользователя
    const changeAvatar = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('/api/user_img', formData, config);
            dispatch({
                type: CHANGE_AVATAR,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: CHANGE_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    // Выход
    const logout = () => dispatch({ type: LOGOUT });

    // Очистка ошибок
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            role: state.role,
            avatar: state.avatar,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            login,
            loadUser,
            logout,
            getAvatar,
            changeBIO,
            changeAvatar,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;