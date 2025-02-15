import {
    DELETE_USER_ERROR,
    DELETE_USER_LOADED,
    DELETE_USER_LOADING,
    GET_ALL_USER_ERROR,
    GET_ALL_USER_LOADED,
    GET_ALL_USER_LOADING,
    GET_USER_ERROR,
    GET_USER_LOADED,
    GET_USER_LOADING,
    UPDATE_STATUS_USER_LOADED,
    UPDATE_STATUS_USER_ERROR,
    UPDATE_STATUS_USER_LOADING,
    RESET_PASSWORD_USER_LOADING,
    RESET_PASSWORD_USER_LOADED,
    RESET_PASSWORD_USER_ERROR,
    UPDATE_PASSWORD_USER_LOADING,
    UPDATE_PASSWORD_USER_LOADED,
    UPDATE_PASSWORD_USER_ERROR,
    UPDATE_USER_LOADING,
    UPADATE_USER_LOADED,
    UPDATE_USER_ERROR,
    ADD_USER_LOADED,
    ADD_USER_ERROR,
    ADD_USER_LOADING
} from "../actions/userAction/type.action"

const initialState = {
    user: null,
    usersData: null,
    loading: false,
    error: null
}


export default function userReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_LOADED:
            return {
                ...state,
                loading: false,
                user: payload,
                error: null
            }
        case GET_USER_ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                error: payload
            }
        case GET_ALL_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_USER_LOADED:
            return {
                ...state,
                loading: false,
                usersData: payload,
                error: null
            }
        case GET_ALL_USER_ERROR:
            return {
                ...state,
                loading: false,
                usersData: null,
                error: payload
            }
        case DELETE_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DELETE_USER_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case DELETE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case UPDATE_STATUS_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_STATUS_USER_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case UPDATE_STATUS_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case RESET_PASSWORD_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case RESET_PASSWORD_USER_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case RESET_PASSWORD_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case UPDATE_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case UPADATE_USER_LOADED:
            return {
                ...state,
                loading: false,
                user: payload,
                error: null
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                user: null,
                error: payload
            }
        case ADD_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ADD_USER_LOADED:
            return {
                ...state,
                loading: false,
                user: payload,
                error: null
            }
        case ADD_USER_ERROR:
            return {
                ...state,
                loading: false,
                USER: null,
                error: payload
            }
        case UPDATE_PASSWORD_USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PASSWORD_USER_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case UPDATE_PASSWORD_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}