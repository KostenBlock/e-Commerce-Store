import {
    GET_CATEGORIES,
    GET_ITEMS,
    GET_ITEMS_BY_CATEGORY, GET_ITEMS_BY_SEARCH,
    GET_PRODUCT,
    ITEM_ERROR
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return  {
                ...state,
                items: action.payload,
                loading: false
            };
        case GET_ITEMS_BY_CATEGORY:
            return  {
                ...state,
                itemsByCategory: action.payload,
                loading: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case GET_ITEMS_BY_SEARCH:
            return {
                ...state,
                itemsBySearch: action.payload,
                loading: false
            };
        case ITEM_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}