import axios from "../../utils/axiosConfig"
import { GET_USER_ERROR, GET_USER_LOADED, GET_USER_LOADING, UPDATE_USER_ERROR, UPDATE_USER_LOADING, UPDATE_USER_LODED } from "./type.action"


export const getUser = (id) => async dispatch =>{
    dispatch({type:GET_USER_LOADING})
    try {
        const res = await axios.get(`/users/${id}`)
        console.log("l'utilisateur connester : "+res.data)
        dispatch({
            type:GET_USER_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_USER_ERROR,
            payload:err.response.data
        })
    }
}


export const UpdateUser = (id, formData) => async dispatch =>{
    dispatch({type:UPDATE_USER_LOADING})
        const config = {
            headers:{
                'content-type' : 'application/json'
            }
        }
    try{
        const {data} = await axios.put(`/users/${id}`, formData, config)
        dispatch({
            type:UPDATE_USER_LODED,
            payload:data
        })
    }catch(err){
        dispatch({
            type:UPDATE_USER_ERROR,
            payload: err.response.data
        })
    }
}