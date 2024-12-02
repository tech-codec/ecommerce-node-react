import { GET_USER_ERROR, GET_USER_LOADED, GET_USER_LOADING } from "../actions/userAction/type.action"

const initialState = {
    user : null,
    loading: false,
    error : null
}


export default function userReducer(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_USER_LOADING:
            return{
                ...state,
                loading:true,
            }
        case GET_USER_LOADED:
            return{
                ...state,
                loading:false,
                user:payload,
                error:null
            }
        case GET_USER_ERROR:
            return{
                ...state,
                loading:false,
                user:null,
                error:payload
            }
        default:
            return state
    }
}