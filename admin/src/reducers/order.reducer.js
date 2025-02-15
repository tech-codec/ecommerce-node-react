import {
    DELETE_ORDER_ERROR,
    DELETE_ORDER_LOADED,
    DELETE_ORDER_LOADING,
    GET_ALL_ORDER_ERROR,
    GET_ALL_ORDER_LOADED,
    GET_ALL_ORDER_LOADING,
    GET_ORDER_ERROR,
    GET_ORDER_LOADED,
    GET_ORDER_LOADING,
    UPDATE_STATUS_ORDER_ERROR,
    UPDATE_STATUS_ORDER_LOADED,
    UPDATE_STATUS_ORDER_LOADING
} from "../actions/orderAction/type.action"



const initialState = {
    ordersData: null,
    order: null,
    loading: false,
    error: null
}

export default function orderReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ALL_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_ORDER_LOADED:
            return {
                ...state,
                loading: false,
                ordersData: payload,
                error: null
            }
        case GET_ALL_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                ordersData: null,
                error: payload
            }
        case GET_ORDER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_ORDER_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                order: payload
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                order: null,
                error: payload
            }
        
        case UPDATE_STATUS_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case UPDATE_STATUS_ORDER_LOADED:
            return {
                ...state,
                loading: false,
                order: payload,
                error: null
            }
        case UPDATE_STATUS_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                order: null,
                error: payload
            }
        case DELETE_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case DELETE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }

}