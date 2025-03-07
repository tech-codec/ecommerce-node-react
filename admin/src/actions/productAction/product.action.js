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
        console.log("tous les produits: ",JSON.stringify(res.data))
    }catch(err){
        dispatch({
            type: GET_ALL_PRODUCT_ERROR,
            payload: err.response.data
        })
        console.log("error products: ",JSON.stringify(err.response.data))
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
        console.log("modif cat: ", JSON.stringify(res.data))
        dispatch(getAllProducts())
    }catch(err){
        dispatch({
            type:EDITE_PRODUCT_ERROR,
            payload: err.response.data
        })
        toast.error("le produit n'a pas été modifiée")
        console.log("modif error prod: ", JSON.stringify(err.response.data))
        dispatch(getAllProducts())
    }
}

export const addProduct = (formData)=> async dispatch=>{
    dispatch({type:ADD_PRODUCT_LOADING})
    console.log("ajout product")
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
        console.log("add prod: ", JSON.stringify(res.data))
        dispatch(getAllProducts())
        window.location.reload()
    }catch(err){
        dispatch({
            type:ADD_PRODUCT_LOADED,
            payload:err.response.data
        })
        toast.error("Le produit n'a pas été ajoutée.")
        console.log("error add prod: ", JSON.stringify(err.response.data))
        dispatch(getAllProducts())
        window.location.reload()
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

