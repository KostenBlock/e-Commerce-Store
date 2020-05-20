import React, {useReducer} from "react";
import OrdersContext from "./ordersContext";
import ordersReducer from "./ordersReducer";
import {CHECKOUT, CLEAR_ORDERS, GET_ORDERS, ORDER_ERROR} from "../types";
import axios from 'axios';

const OrdersState = props => {
    const initialState = {
        orders: null,
        error: null
    };

    const [state, dispatch] = useReducer(ordersReducer, initialState);

    const getOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            dispatch({
                type: GET_ORDERS,
                payload: response.data
            })
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    const checkout = async order => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            await axios.post('/api/orders', order, config);
            dispatch({
                type: CHECKOUT,
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    const clearOrders = () => {
        dispatch({
            type: CLEAR_ORDERS
        });
    };

    return (
        <OrdersContext.Provider value={{
            orders: state.orders,
            error: state.error,
            getOrders,
            checkout,
            clearOrders
        }}>
            {props.children}
        </OrdersContext.Provider>
    )
};

export default OrdersState;