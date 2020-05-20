import React, {useReducer} from "react";
import AdminContext from "./adminContext";
import axios from "axios";
import {
    CLEAR_ERRORS,
    DELETE_USER,
    GET_ALL_USERS,
    USERS_FAIL,
} from "../types";
import adminReducer from "./adminReducer";

const AdminState = props => {
    const initialState = {
        users: null,
        error: null
    };

    const [state, dispatch] = useReducer(adminReducer, initialState);

    // Получить пользователей
    const getAllUsers = async () => {
        try {
            const response = await axios.get('/api/users');

            dispatch({
                type: GET_ALL_USERS,
                payload: response.data
            });
        } catch (err) {
            dispatch({
               type: USERS_FAIL,
               payload: err.response.data.msg
            });
        }
    }

    const deleteUser = async id => {
        await axios.delete(`/api/users/${id}`);
        try{
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: USERS_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }
    return (
        <AdminContext.Provider value={{
            users: state.users,
            getAllUsers,
            deleteUser,
            clearErrors
        }}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminState;