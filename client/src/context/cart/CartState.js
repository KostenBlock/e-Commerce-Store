import React, {useReducer} from "react";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";
import {
    ADD_ONE,
    ADD_TO_CART, CLEAR_CART,
    CLEAR_ERRORS,
    DELETE_ITEM_FROM_CART,
    GET_ITEMS_FROM_CART,
    SUB_ONE
} from "../types";

const CartState = props => {
    const initialState = {
        productsInCart: localStorage.cart ? JSON.parse(localStorage.cart).productsInCart : null,
        totalQty: localStorage.cart ? JSON.parse(localStorage.cart).totalQty : null,
        totalPrice: localStorage.cart ? JSON.parse(localStorage.cart).totalPrice : null,
        error: null
    }

    const [state, dispatch] = useReducer(cartReducer, initialState);

    localStorage.setItem("cart", JSON.stringify(state));

    const getItemsFromCart = () => {
        dispatch({
            type: GET_ITEMS_FROM_CART,
            payload: state.productsInCart || [],
            totalQty: state.totalQty || 0,
            totalPrice: state.totalPrice || 0,
        });
    };

    const addToCart = (product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: product
        });
    };

    const increaseByOne = (product) => {
        dispatch({
            type: ADD_ONE,
            payload: product
        });
    };

    const decreaseByOne = product => {
        dispatch({
            type: SUB_ONE,
            payload: product
        });
    };

    const deleteItemFromCart = product => {
        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: product,
        });
    };

    const clearCart = () => {
        dispatch({
            type: CLEAR_CART
        });
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }

    return (
        <CartContext.Provider value={{
            productsInCart: state.productsInCart,
            totalQty: state.totalQty,
            totalPrice: state.totalPrice,
            error: state.error,
            getItemsFromCart,
            addToCart,
            increaseByOne,
            decreaseByOne,
            deleteItemFromCart,
            clearCart,
            clearErrors
        }}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartState;