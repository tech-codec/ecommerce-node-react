import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { DELETE_USER_ERROR, DELETE_USER_LOADED, DELETE_USER_LOADING, GET_ALL_USER_ERROR, GET_ALL_USER_LOADED, GET_ALL_USER_LOADING, GET_USER_ERROR, 
    GET_USER_LOADED,
     GET_USER_LOADING, 
     UPDATE_STATUS_USER_LOADED, 
     UPADATE_USER_LOADED, 
     UPDATE_STATUS_USER_ERROR, 
     UPDATE_STATUS_USER_LOADING, 
     UPDATE_USER_ERROR, 
     UPDATE_USER_LOADING,
     RESET_PASSWORD_USER_LOADING,
     RESET_PASSWORD_USER_LOADED,
     RESET_PASSWORD_USER_ERROR,
     ADD_USER_LOADED,
     ADD_USER_ERROR,
     ADD_USER_LOADING, 
      } from "./type.action"


export const getAllUser = ()=>async dispatch=>{
    dispatch({type:GET_ALL_USER_LOADING})
    try{

        const res = await axios.get('/users')
        dispatch({
            type: GET_ALL_USER_LOADED,
            payload:res.data
        })
        console.log("la liste des user: "+res.data)
    }catch(err){
        dispatch({
            type:GET_ALL_USER_ERROR,
            payload:err.response.data
        })
        console.log("error users: "+err.response.data)
    }
}

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


export const deleteUser = (id)=> async dispatch =>{
    dispatch({type:DELETE_USER_LOADING})
    try{
        const res = await axios.delete(`/users/${id}`)
        dispatch({
            type:DELETE_USER_LOADED,
            payload: res.data
        })
        toast.success("L'utilisateur à été supprimer avec succès")
        dispatch(getAllUser())
        //window.location.reload()
    }catch(err){
        dispatch({
            type:DELETE_USER_ERROR,
            payload: err.response.data
        })
        toast.error("L'utilisateur n'a pas été supprimer")
        dispatch(getAllUser())
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
            type:UPADATE_USER_LOADED,
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


export const adminUpdateUser = (id, formData) => async dispatch =>{
    dispatch({type:UPDATE_USER_LOADING})
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
        
    try{
        const {data} = await axios.put(`/users/admin/${id}`, formData, config)
        dispatch({
            type:UPADATE_USER_LOADED,
            payload:data
        })
        toast.success("L'utilisateur à été modifier avec succès")
        dispatch(getAllUser())
    }catch(err){
        dispatch({
            type:UPDATE_USER_ERROR,
            payload: err.response.data
        })
        toast.error("L'utilisateur n'a pas été moddifier cas un problème est survenu")
        dispatch(getAllUser())
    }
}


export const updateStatusUser = (id, {isActive}) => async dispatch=>{
    dispatch({type:UPDATE_STATUS_USER_LOADING})
    const config = {
        headers:{
            'content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({isActive})

    try{
        const res = await axios.put(`/users/state/${id}`, body, config)
        dispatch({
            type:UPDATE_STATUS_USER_LOADED,
            payload:res.data
        })
        toast.success("status de l'utilisation modifier")
    }catch(err){
        dispatch({
            type: UPDATE_STATUS_USER_ERROR,
            payload: err.response.data
        })
        toast.error("Le status n'a pas été modifier")
    }
}

export const resetPasswordUser = (id, {password, confirmPassword}) => async dispatch=>{
    dispatch({type:RESET_PASSWORD_USER_LOADING})
    const config = {
        headers:{
            'content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({password, confirmPassword})

    try{
        const res = await axios.put(`/users/admin-update-password/${id}`, body, config)
        dispatch({
            type:RESET_PASSWORD_USER_LOADED,
            payload:res.data
        })
        toast.success("Le mot de passe de l'utilisateur à été rénitialisé")
    }catch(err){
        dispatch({
            type: RESET_PASSWORD_USER_ERROR,
            payload: err.response.data
        })
        toast.error("Le mot de passe de l'utilisateur n'a pas été rénitialisé")
    }
}



export const addUser = (formData) => async dispatch =>{
    dispatch({type:ADD_USER_LOADING})
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
        
    try{
        const {data} = await axios.post(`/users/`, formData, config)
        dispatch({
            type:ADD_USER_LOADED,
            payload:data
        })
        toast.success("L'utilisateur à été ajouter avec succès")
        dispatch(getAllUser())
        window.location.reload()
    }catch(err){
        dispatch({
            type:ADD_USER_ERROR,
            payload: err.response.data
        })
        toast.error("L'utilisateur n'à pas été ajouter")
        dispatch(getAllUser())
        window.location.reload()
    }
}
