import {
    ADD_ONE,
    ADD_TO_CART,
    CLEAR_CART,
    CLEAR_ERRORS,
    DELETE_ITEM_FROM_CART,
    GET_ITEMS_FROM_CART,
    SUB_ONE
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_ITEMS_FROM_CART:
            return {
                ...state,
                productsInCart: action.payload,
                totalQty: action.totalQty,
                totalPrice: action.totalPrice
            };
        case ADD_TO_CART:
            let exist = state.productsInCart.find(pic => action.payload._id === pic._id);
            if (exist){
                if(exist.qty >= 10) {
                    return {
                        ...state,
                        error: "Максимальное количество на один товар - 10 штук"
                    }
                } else {
                    exist.qty++;
                    state.totalQty++;
                    return {
                        ...state,
                        loading: false,
                        totalPrice: state.totalPrice + action.payload.price,
                        totalQty: state.totalQty
                    }
                }
            }
            else {
                let newTotal = state.totalPrice + action.payload.price;
                state.totalQty++;
                action.payload.qty = 1;
                return {
                    ...state,
                    productsInCart: [...state.productsInCart, action.payload],
                    loading: false,
                    totalPrice: newTotal,
                    totalQty: state.totalQty
                }
            }
        case ADD_ONE:
            let addProduct = state.productsInCart.find(pic => pic._id === action.payload._id);
            if(addProduct.qty >= 10) {
                return {
                    ...state,
                    error: "Максимальное количество на один товар - 10 штук"
                }
            } else {
                addProduct.qty++;
                state.totalQty++;
                return {
                    ...state,
                    totalPrice: state.totalPrice + action.payload.price,
                    totalQty: state.totalQty,
                    loading: false,
                }
            }
        case SUB_ONE:
            let subProduct = state.productsInCart.find(pic => pic._id === action.payload._id);
            if(subProduct.qty === 1) {
                let newItems = state.productsInCart.filter(pic => pic._id !== action.payload._id)
                subProduct.qty--;
                state.totalQty--;
                return {
                    ...state,
                    productsInCart: newItems,
                    totalPrice: state.totalPrice - action.payload.price,
                    totalQty: state.totalQty,
                    loading: false,
                }
            }
            else {
                subProduct.qty--;
                state.totalQty--;
                return {
                    ...state,
                    totalPrice: state.totalPrice - action.payload.price,
                    totalQty: state.totalQty,
                    loading: false,
                }
            }
        case DELETE_ITEM_FROM_CART:
            let delProduct = state.productsInCart.find(pic => pic._id === action.payload._id);
            state.totalPrice -= (action.payload.price * delProduct.qty);
            state.totalQty -= delProduct.qty;
            return {
                ...state,
                productsInCart: [...state.productsInCart.filter(item => item._id !== action.payload._id)],
                totalPrice: state.totalPrice,
                totalQty: state.totalQty
            };
        case CLEAR_CART:
            return {
                ...state,
                productsInCart: [],
                totalQty: null,
                totalPrice: null,
                loading: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};