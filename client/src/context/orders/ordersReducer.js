import {
    CHECKOUT,
    CLEAR_ORDERS,
    GET_ORDERS,
    ORDER_ERROR
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        case CHECKOUT:
            return {
                ...state,
                loading: false
            };
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: null
            };
        case ORDER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};