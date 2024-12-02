import axios from "../../utils/axiosConfig"
import { 
    GET_ALL_ROLE_LOADED, 
    GET_ALL_ROLE_LOADING,
    GET_ALL_ROLE_ERROR
} from "./type.action"


export const getAllRole = ()=> async dispatch =>{
    dispatch({type:GET_ALL_ROLE_LOADING})

    try{
        const res = await axios.get("/roles")
        console.log(res.data)
        dispatch({
            type:GET_ALL_ROLE_LOADED,
            payload:res.data
        })
    }catch(err){
        console.log(err.response.data)
        dispatch({
            type:GET_ALL_ROLE_ERROR,
            payload: err.response.data
        })
    }
}