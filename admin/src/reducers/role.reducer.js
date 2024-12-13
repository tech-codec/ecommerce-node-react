import {
    GET_ALL_ROLE_LOADED,
    GET_ALL_ROLE_LOADING,
    GET_ALL_ROLE_ERROR,
    GET_ROLE_LOADING,
    GET_ROLE_LOADED,
    GET_ROLE_ERROR,
    DELETE_ROLE_LOADING,
    DELETE_ROLE_LOADED,
    DELETE_ROLE_ERROR,
    EDITE_ROLE_LOADING,
    EDITE_ROLE_LOADED,
    EDITE_ROLE_ERROR,
    ADD_ROLE_LOADING,
    ADD_ROLE_LOADED,
    ADD_ROLE_ERROR
} from "../actions/roleAction/type.action"


const initialState = {
    rolesData: null,
    role: null,
    loading: false,
    error: null
}

export default function roleReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_ALL_ROLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_ROLE_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                rolesData: payload
            }
        case GET_ALL_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                rolesData: null
            }
        case GET_ROLE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_ROLE_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                role: payload
            }
        case GET_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                role: null
            }
        case DELETE_ROLE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DELETE_ROLE_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case DELETE_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                role: null
            }
        case EDITE_ROLE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case EDITE_ROLE_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                role: payload
            }
        case EDITE_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                role: null
            }
        case ADD_ROLE_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ADD_ROLE_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                role: payload
            }
        case ADD_ROLE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                role: null
            }
        default:
            return state
    }
}