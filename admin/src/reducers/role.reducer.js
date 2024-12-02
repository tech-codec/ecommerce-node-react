import { 
    GET_ALL_ROLE_LOADED, 
    GET_ALL_ROLE_LOADING, 
    GET_ALL_ROLE_ERROR
} from "../actions/roleAction/type.action"


const initialState = {
    rolesData: null,
    loading: false,
    error: null
}

export default function roleReducer(state=initialState, action){
    const {type, payload} = action
    
    switch(type){
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
        default:
            return state
    }
}