
import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { 
    DELETE_ORDER_ERROR,
    DELETE_ORDER_LOADED,
    DELETE_ORDER_LOADING,
    GET_ALL_ORDER_ERROR, 
    GET_ALL_ORDER_LOADED, 
    GET_ALL_ORDER_LOADING, 
    GET_ORDER_ERROR, 
    GET_ORDER_LOADED, 
    GET_ORDER_LOADING,
    UPDATE_STATUS_ORDER_ERROR,
    UPDATE_STATUS_ORDER_LOADED,
    UPDATE_STATUS_ORDER_LOADING
} from "./type.action"


export const getAllOrders = ()=> async dispatch =>{
    dispatch({type:GET_ALL_ORDER_LOADING})

    try{
        const res = await axios.get("/orders")
        dispatch({
            type:GET_ALL_ORDER_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_ORDER_ERROR,
            payload: err.response.data
        })
    }
}


export const getOrder = (id)=> async dispatch =>{
    dispatch({type:GET_ORDER_LOADING})
    try{
        const res = await axios.get(`/orders/${id}`)
        dispatch({
            type:GET_ORDER_LOADED,
            payload: res.data
        })
        console.log(res.data)
    }catch(err){
        dispatch({
            type:GET_ORDER_ERROR,
            payload: err.response.data
        })
        console.log(err.response.data)
    }
}


export const deleteOrder = (id)=> async dispatch =>{
    dispatch({type:DELETE_ORDER_LOADING})
    try{
        const res = await axios.delete(`/orders/${id}`)
        dispatch({
            type:DELETE_ORDER_LOADED,
            payload: res.data
        })
        toast.success("La commande à été supprimer avec succès")
        //window.location.reload()
        dispatch(getAllOrders())
    }catch(err){
        dispatch({
            type:DELETE_ORDER_ERROR,
            payload: err.response.data
        })
        toast.error("La commande n'a pas été supprimer")
        dispatch(getAllOrders())
    }
}



export const updateStatusOrder = (id, {orderStatus}) => async dispatch=>{
    dispatch({type:UPDATE_STATUS_ORDER_LOADING})
    const config = {
        headers:{
            'content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({orderStatus})

    try{
        const res = await axios.put(`/orders/${id}`, body, config)
        dispatch({
            type:UPDATE_STATUS_ORDER_LOADED,
            payload:res.data
        })
        toast.success("status de la commande modifier")
    }catch(err){
        dispatch({
            type: UPDATE_STATUS_ORDER_ERROR,
            payload: err.response.data
        })
        toast.error("Le status n'a pas été modifier")
        console.log("erreur status order: ", JSON.stringify(err.response.data))
    }
}
