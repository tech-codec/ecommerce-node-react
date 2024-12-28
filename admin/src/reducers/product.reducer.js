import { ADD_PRODUCT_ERROR, ADD_PRODUCT_LOADED, ADD_PRODUCT_LOADING, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_LOADED, DELETE_PRODUCT_LOADING, EDITE_PRODUCT_ERROR, EDITE_PRODUCT_LOADED, EDITE_PRODUCT_LOADING, GET_ALL_PRODUCT_ERROR, GET_ALL_PRODUCT_LOADED, GET_ALL_PRODUCT_LOADING } from "../actions/productAction/type.action"


const initialState = {
    loading: false,
    product: null,
    productsData: null,
    error: null
}


export default function productReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ALL_PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_PRODUCT_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                productsData: payload
            }
        case GET_ALL_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                productsData: null
            }
        case EDITE_PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case EDITE_PRODUCT_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                product: payload
            }
        case EDITE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                product: null
            }
        case ADD_PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ADD_PRODUCT_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                product: payload
            }
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                product: null
            }
        case DELETE_PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default:
            return state
    }
}