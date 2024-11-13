import { 
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_SUCCESS, 
    USER_AUTORISED_ERROR, 
    USER_AUTORISED_LOADED, 
    USER_AUTORISED_LOADING
} from "../actions/authAction/type.auth.action"



const initialState = {
    isAuthenticated:null,
    loading:false,
    success:null,
    error:null,
    user:null
}


export default function authReducer(state=initialState, action){
    const {type, payload} = action

    switch(type){

        case USER_AUTORISED_LOADING:
            return{
                ...state,
                loading:true
            }
        case USER_AUTORISED_LOADED:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:payload,
            }
        case USER_AUTORISED_ERROR:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                success:payload,
                loading:false,
                error:null,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                success:null,
                loading:false,
                error:payload,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
                success:payload,
                loading:false,
                error:null,
            }
        case LOGIN_ERROR:
            return{
                ...state,
                isAuthenticated:false,
                success:null,
                loading:false,
                error:payload,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                success:payload,
                loading:false,
                error:null,
            }
        case FORGOT_PASSWORD_ERROR:
            return{
                ...state,
                success:null,
                loading:false,
                error:payload,
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
                success:payload,
                loading:false,
                error:null,
                user:null
            }
            case LOGOUT_ERROR:
                return{
                    ...state,
                    isAuthenticated:false,
                    success:null,
                    loading:false,
                    error:payload,
                    user:null
            }
        default:
            return state
    }
}