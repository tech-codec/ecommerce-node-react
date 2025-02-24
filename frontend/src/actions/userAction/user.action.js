import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { 
    GET_USER_ERROR,
    GET_USER_LOADED, 
    GET_USER_LOADING, 
    UPDATE_PASSWORD_USER_ERROR, 
    UPDATE_PASSWORD_USER_LOADED, 
    UPDATE_PASSWORD_USER_LOADING, 
    UPDATE_USER_ERROR, 
    UPDATE_USER_LOADING, 
    UPDATE_USER_LOADED
 } from "./type.action"


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


export const updateUser = (id, formData) => async dispatch =>{
    dispatch({type:UPDATE_USER_LOADING})
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
        
    try{
        const {data} = await axios.put(`/users/${id}`, formData, config)
        dispatch({
            type:UPDATE_USER_LOADED,
            payload:data
        })
        toast.success("L'utilisateur à été modifier avec succès")
    }catch(err){
        dispatch({
            type:UPDATE_USER_ERROR,
            payload: err.response.data
        })
        toast.error("L'utilisateur n'a pas été moddifier cas un problème est survenu")
        
    }
}





export const updatePasswordUser = (id, {password, newPassword, confirmPassword}) => async dispatch=>{
    dispatch({type:UPDATE_PASSWORD_USER_LOADING})
    const config = {
        headers:{
            'content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({password,newPassword, confirmPassword})

    try{
        const res = await axios.put(`/users/update-USER-password/${id}`, body, config)
        dispatch({
            type:UPDATE_PASSWORD_USER_LOADED,
            payload:res.data
        })
        toast.success("Votre mot de passe n'a été modiffié")
    }catch(err){
        dispatch({
            type: UPDATE_PASSWORD_USER_ERROR,
            payload: err.response.data
        })
        toast.error("Votre mot de passe n'a pas été modiffié")
    }
}