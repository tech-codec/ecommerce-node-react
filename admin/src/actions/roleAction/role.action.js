import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { 
    GET_ALL_ROLE_LOADED, 
    GET_ALL_ROLE_LOADING,
    GET_ALL_ROLE_ERROR,
    GET_ROLE_LOADING,
    GET_ROLE_LOADED,
    GET_ROLE_ERROR,
    EDITE_ROLE_LOADING,
    ADD_ROLE_LOADED,
    ADD_ROLE_LOADING,
    ADD_ROLE_ERROR,
    EDITE_ROLE_LOADED,
    EDITE_ROLE_ERROR,
    DELETE_ROLE_LOADING,
    DELETE_ROLE_ERROR,
    DELETE_ROLE_LOADED
} from "./type.action"


export const getAllRoles = ()=> async dispatch =>{
    dispatch({type:GET_ALL_ROLE_LOADING})

    try{
        const res = await axios.get("/roles")
        dispatch({
            type:GET_ALL_ROLE_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_ROLE_ERROR,
            payload: err.response.data
        })
    }
}

export const getRole = (id)=> async dispatch =>{
    dispatch({type:GET_ROLE_LOADING})
    try{
        const res = await axios.get(`/roles/${id}`)
        dispatch({
            type:GET_ROLE_LOADED,
            payload: res.data
        })
        console.log(res.data)
    }catch(err){
        dispatch({
            type:GET_ROLE_ERROR,
            payload: err.response.data
        })
        console.log(err.response.data)
    }
}


export const deleteRole = (id)=> async dispatch =>{
    dispatch({type:DELETE_ROLE_LOADING})
    try{
        const res = await axios.delete(`/roles/${id}`)
        dispatch({
            type:DELETE_ROLE_LOADED,
            payload: res.data
        })
        toast.success("Le rôle à été supprimer avec succès")
        //window.location.reload()
        dispatch(getAllRoles())
    }catch(err){
        dispatch({
            type:DELETE_ROLE_ERROR,
            payload: err.response.data
        })
        toast.error("Le rôle n'a pas été supprimer")
        dispatch(getAllRoles())
    }
}


export const editeRole = (id, {name})=> async dispatch =>{
    dispatch({type:EDITE_ROLE_LOADING})
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const body = JSON.stringify({name})
    try{
        const res = await axios.put(`/roles/${id}`, body, config)
        dispatch({
            type:EDITE_ROLE_LOADED,
            payload: res.data
        })
        toast.success("Le rôle à été modifier avec succès")
        //window.location.reload()
        dispatch(getAllRoles())
    }catch(err){
        dispatch({
            type:EDITE_ROLE_ERROR,
            payload: err.response.data
        })
    }
    toast.error("Le rôle n'a pas été modifier")
    dispatch(getAllRoles())
}


export const addRole = ({name})=> async dispatch =>{
    dispatch({type:ADD_ROLE_LOADING})
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const body = JSON.stringify({name})
    try{
        const res = await axios.post(`/roles`, body, config)
        dispatch({
            type:ADD_ROLE_LOADED,
            payload: res.data
        })
        toast.success("le rôle à été ajouter avec succès")
        dispatch(getAllRoles())
        //window.location.reload()
    }catch(err){
        dispatch({
            type:ADD_ROLE_ERROR,
            payload: err.response.data
        })
    }
    //toast.error("Le rôle n'as pas été ajouter")
    dispatch(getAllRoles())
    //window.location.reload()
}