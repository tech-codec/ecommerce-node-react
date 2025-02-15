import { ADD_CATEGORY_ERROR, ADD_CATEGORY_LOADED, ADD_GATEGORY_LOADING, DELETE_CATEGORY_ERROR, DELETE_CATEGORY_LOADED, DELETE_GATEGORY_LOADING, EDITE_CATEGORY_ERROR, EDITE_CATEGORY_LOADED, EDITE_GATEGORY_LOADING, GET_ALL_CATEGORY_ERROR, GET_ALL_CATEGORY_LOADED, GET_ALL_GATEGORY_LOADING } from "../actions/categoryAction/type.action"


const initialState = {
    categoriesData: null,
    category: null,
    error: null,
    loading: false
}


export default function categoryReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_ALL_GATEGORY_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_CATEGORY_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                categoriesData: payload
            }
        case GET_ALL_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                categoriesData: null
            }
        case EDITE_GATEGORY_LOADING:
            return {
                ...state,
                loading: true,
            }
        case EDITE_CATEGORY_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                category: payload
            }
        case EDITE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                category: null
            }
        case ADD_GATEGORY_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ADD_CATEGORY_LOADED:
            return {
                ...state,
                loading: false,
                error: null,
                category: payload
            }
        case ADD_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                category: null
            }
        case DELETE_GATEGORY_LOADING:
            return {
                ...state,
                loading: true,
            }
        case DELETE_CATEGORY_LOADED:
            return {
                ...state,
                loading: false,
                error: null
            }
        case DELETE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                category: null
            }
        default:
            return state
    }
}