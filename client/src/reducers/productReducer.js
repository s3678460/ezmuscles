import {
    GET_PRODUCT,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    ADD_PRODUCT,
    UPDATE_PRODUCT
} from "../actions/types";


const initialState = {
    products: [],
    product: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload)
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        default:
            return state;
    }
}