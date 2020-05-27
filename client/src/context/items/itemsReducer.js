import {
    CLEAR_FILTER,
    FILTER_ITEMS, GET_CATEGORIES,
    GET_ITEMS,
    GET_ITEMS_BY_CATEGORY,
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
        case FILTER_ITEMS:
            return {
                ...state,
                filtered: state.items.filter(item => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return item.name.match(regex) || item.category.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
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