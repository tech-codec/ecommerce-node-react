import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"

import { ADD_PRODUCT_LOADED, ADD_PRODUCT_LOADING, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_LOADED, DELETE_PRODUCT_LOADING, EDITE_PRODUCT_ERROR, EDITE_PRODUCT_LOADED, EDITE_PRODUCT_LOADING, GET_ALL_PRODUCT_ERROR, GET_ALL_PRODUCT_LOADED, GET_ALL_PRODUCT_LOADING } from "./type.action"

export const getAllProducts = ()=> async dispatch=>{
    dispatch({type: GET_ALL_PRODUCT_LOADING})

    try{
        const res = await axios.get('/products')
        dispatch({
            type: GET_ALL_PRODUCT_LOADED,
            payload: res.data
        })
        
    }catch(err){
        dispatch({
            type: GET_ALL_PRODUCT_ERROR,
            payload: err.response.data
        })
        
    }
}


export const editeProduct = (id, formData) => async dispatch=>{
    dispatch({type:EDITE_PRODUCT_LOADING})

    const config = {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }

    try{
        const res = await axios.put(`/products/${id}`,formData, config)
        dispatch({
            type:EDITE_PRODUCT_LOADED,
            payload: res.data
        })
        toast.success("le produit a été modifiée avec succès.")
        
        dispatch(getAllProducts())
    }catch(err){
        dispatch({
            type:EDITE_PRODUCT_ERROR,
            payload: err.response.data
        })
        toast.error("le produit n'a pas été modifiée")
        
        dispatch(getAllProducts())
    }
}

export const addProduct = (formData)=> async dispatch=>{
    dispatch({type:ADD_PRODUCT_LOADING})
    
    const config = {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }
    try{
        const res = await axios.post('/products', formData, config)
        dispatch({
            type:ADD_PRODUCT_LOADED,
            payload:res.data
        })
        toast.success("Le produit a été ajoutée avec succès.")
        
        dispatch(getAllProducts())
    }catch(err){
        dispatch({
            type:ADD_PRODUCT_LOADED,
            payload:err.response.data
        })
        toast.error("Le produit n'a pas été ajoutée.")
        
        dispatch(getAllProducts())
    }
}


export const deleteProduct = (id)=>async dispatch=>{
    dispatch({type:DELETE_PRODUCT_LOADING})

    try{
        const res = await axios.delete(`/products/${id}`)
        dispatch({
            type:DELETE_PRODUCT_LOADED,
            payload: res.data
        })
        toast.success(res.data)
        dispatch(getAllProducts())
    }catch(err){
        dispatch({
            type: DELETE_PRODUCT_ERROR,
            payload: err.response.data
        })
        toast.error(err.response.data)
        dispatch(getAllProducts())
    }
}

