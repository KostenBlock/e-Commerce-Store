import React, {useReducer} from "react";
import ItemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import axios from "axios";
import {
    ADD_ITEM,
    CATEGORIES_ERROR,
    CLEAR_FILTER,
    FILTER_ITEMS,
    GET_CATEGORIES,
    GET_ITEMS,
    GET_ITEMS_BY_CATEGORY,
    GET_PRODUCT,
    ITEM_ERROR
} from "../types";

const ItemsState = props => {
    const initialState = {
        items: null,
        itemsByCategory: null,
        categories: null,
        current: null,
        filtered: null,
        error: null,
        product: null
    };

    const [state, dispatch] = useReducer(itemsReducer, initialState);

    //Показать все товары
    const getItems = async () => {
        try {
            const response = await axios.get('/api/items');
            dispatch({
                type: GET_ITEMS,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: ITEM_ERROR ,
                payload: err.response.msg
            });
        }
    };

    // Получить товары по категории
    const getItemsByCategory = async name => {
        try {
            const response = await axios.get(`/api/items/category/${name}`);
            dispatch({
                type: GET_ITEMS_BY_CATEGORY,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: ITEM_ERROR ,
                payload: err.response.msg
            });
        }
    };

    //Показать один товар
    const getProduct = async id => {
        try {
            const response = await axios.get(`/api/items/product/${id}`);
            dispatch({
                type: GET_PRODUCT,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: ITEM_ERROR,
                payload: err.response.data
            });
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/items/categories');
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: CATEGORIES_ERROR,
                payload: err.response.data
            });
        }
    };

    const addItem = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('/api/items', formData, config);
            dispatch({
                type: ADD_ITEM,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: ITEM_ERROR,
                payload: err.response.data
            });
        }
    };

    //Поиск по товарам
    const filterItems = text => {
        dispatch({
            type: FILTER_ITEMS,
            payload: text
        });
    };

    //Очистка поиска
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    };

    return (
        <ItemsContext.Provider value={{
            items: state.items,
            itemsByCategory: state.itemsByCategory,
            categories: state.categories,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            product: state.product,
            getItems,
            getItemsByCategory,
            getProduct,
            getCategories,
            addItem,
            filterItems,
            clearFilter
        }}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsState;