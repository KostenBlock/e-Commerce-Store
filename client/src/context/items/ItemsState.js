import React, {useReducer} from "react";
import ItemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import axios from "axios";
import {
    ADD_ITEM,
    CATEGORIES_ERROR,
    GET_CATEGORIES,
    GET_ITEMS,
    GET_ITEMS_BY_CATEGORY,
    GET_ITEMS_BY_SEARCH,
    GET_PRODUCT,
    ITEM_ERROR
} from "../types";

const ItemsState = props => {
    const initialState = {
        items: null,
        itemsByCategory: null,
        itemsBySearch: null,
        categories: null,
        error: null,
        product: null
    };

    const [state, dispatch] = useReducer(itemsReducer, initialState);

    //Показать все товары
    const getItems = async () => {
        try {
            const response = await axios.get('/api/items');
            let items = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].map(d => items.push(d));
            }
            dispatch({
                type: GET_ITEMS,
                payload: items
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

    // Поиск по сайту
    const search = async query => {
        try {
            const response = await axios.get(`/api/items/search/${query}`);
            dispatch({
                type: GET_ITEMS_BY_SEARCH,
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

    return (
        <ItemsContext.Provider value={{
            items: state.items,
            itemsByCategory: state.itemsByCategory,
            itemsBySearch: state.itemsBySearch,
            categories: state.categories,
            error: state.error,
            product: state.product,
            getItems,
            getItemsByCategory,
            getProduct,
            getCategories,
            search,
            addItem
        }}>
            {props.children}
        </ItemsContext.Provider>
    )
};

export default ItemsState;