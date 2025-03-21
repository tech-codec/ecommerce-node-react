import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { ADD_CATEGORY_ERROR, ADD_CATEGORY_LOADED, ADD_GATEGORY_LOADING, DELETE_CATEGORY_ERROR, DELETE_CATEGORY_LOADED, DELETE_GATEGORY_LOADING, EDITE_CATEGORY_ERROR, EDITE_CATEGORY_LOADED, EDITE_GATEGORY_LOADING, GET_ALL_CATEGORY_ERROR, GET_ALL_CATEGORY_LOADED, GET_ALL_GATEGORY_LOADING } from "./type.action"


export const getAllCategories = ()=>async dispatch  =>{
    dispatch({type:GET_ALL_GATEGORY_LOADING})

    try{
        const res = await axios.get('/categories')
        dispatch({
            type: GET_ALL_CATEGORY_LOADED,
            payload: res.data
        })
        
    }catch(err){
        dispatch({
            type: GET_ALL_CATEGORY_ERROR,
            payload: err.response.data
        })
        
    }
}


export const editeCategory = (id, formData) => async dispatch=>{
    dispatch({type:EDITE_GATEGORY_LOADING})

    const config = {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }

    try{
        const res = await axios.put(`/categories/${id}`,formData, config)
        dispatch({
            type:EDITE_CATEGORY_LOADED,
            payload: res.data
        })
        toast.success("la catégorie a été modifiée avec succès.")
       
        dispatch(getAllCategories())
    }catch(err){
        dispatch({
            type:EDITE_CATEGORY_ERROR,
            payload: err.response.data
        })
        toast.error(err.response.data)
        dispatch(getAllCategories())
    }
}

export const addCategory = (formData)=> async dispatch=>{
    dispatch({type:ADD_GATEGORY_LOADING})
    
    const config = {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    }
    try{
        const res = await axios.post('/categories', formData, config)
        dispatch({
            type:ADD_CATEGORY_LOADED,
            payload:res.data
        })
        toast.success("La catégorie a été ajoutée avec succès.")
        
        dispatch(getAllCategories())
        //window.location.reload()
    }catch(err){
        dispatch({
            type:ADD_CATEGORY_ERROR,
            payload:err.response.data
        })
        toast.err("La catégorie n'a pas été ajoutée.")
        
        dispatch(getAllCategories())
    }
}


export const deleteCategory = (id) => async dispatch=>{
    dispatch({type:DELETE_GATEGORY_LOADING})

    try{

        const res = await axios.delete(`/categories/${id}`)
        dispatch({
            type:DELETE_CATEGORY_LOADED,
            payload: res.data
        })
        toast.success(res.data)
        dispatch(getAllCategories())
    }catch(err){
        dispatch({
            type:DELETE_CATEGORY_ERROR,
            payload: err.response.data
        })
        toast.error(err.response.data)
        dispatch(getAllCategories())
    }
}