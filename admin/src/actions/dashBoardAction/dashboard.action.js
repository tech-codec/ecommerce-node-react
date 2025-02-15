
import { toast } from "react-toastify"
import axios from "../../utils/axiosConfig"
import { 
    GET_ALL_CUSTOMER_ACTIVITY_ERROR,
    GET_ALL_CUSTOMER_ACTIVITY_LOADED,
    GET_ALL_CUSTOMER_ACTIVITY_LOADING,
    GET_ALL_CUSTOMER_STATS_ERROR,
    GET_ALL_CUSTOMER_STATS_LOADED,
    GET_ALL_CUSTOMER_STATS_LOADING,
    GET_ALL_LOW_STOCK_ERROR,
    GET_ALL_LOW_STOCK_LOADED, 
    GET_ALL_LOW_STOCK_LOADING, 
    GET_ALL_REAL_TIME_ERROR, 
    GET_ALL_REAL_TIME_LOADED, 
    GET_ALL_REAL_TIME_LOADING, 
    GET_ALL_RECENT_ORDERS_ERROR, 
    GET_ALL_RECENT_ORDERS_LOADED, 
    GET_ALL_RECENT_ORDERS_LOADING, 
    GET_ALL_SALES_ERROR, 
    GET_ALL_SALES_LOADED, 
    GET_ALL_SALES_LOADING, 
    GET_ALL_TOP_PRODUCTS_ERROR, 
    GET_ALL_TOP_PRODUCTS_LOADED, 
    GET_ALL_TOP_PRODUCTS_LOADING,
    GET_ALL_VISITORS_ERROR,
    GET_ALL_VISITORS_LOADED,
    GET_ALL_VISITORS_LOADING
} from "./type.action"



export const getAllLowStock = ()=> async dispatch =>{
    dispatch({type:GET_ALL_LOW_STOCK_LOADING})

    try{
        const res = await axios.get("/dashboard/low-stock")
        dispatch({
            type:GET_ALL_LOW_STOCK_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_LOW_STOCK_ERROR,
            payload: err.response.data
        })
    }
}

export const getAllTopProducts = ()=> async dispatch =>{
    dispatch({type:GET_ALL_TOP_PRODUCTS_LOADING})

    try{
        const res = await axios.get("/dashboard/top-products")
        dispatch({
            type:GET_ALL_TOP_PRODUCTS_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_TOP_PRODUCTS_ERROR,
            payload: err.response.data
        })
    }
}

export const getAllCustomerActivity = ()=> async dispatch =>{
    dispatch({type:GET_ALL_CUSTOMER_ACTIVITY_LOADING})

    try{
        const res = await axios.get("/dashboard/customer-activity")
        dispatch({
            type:GET_ALL_CUSTOMER_ACTIVITY_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_CUSTOMER_ACTIVITY_ERROR,
            payload: err.response.data
        })
    }
}

export const getAllCustomerStats = ()=> async dispatch =>{
    dispatch({type:GET_ALL_CUSTOMER_STATS_LOADING})

    try{
        const res = await axios.get("/dashboard/customer-stats")
        dispatch({
            type:GET_ALL_CUSTOMER_STATS_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_CUSTOMER_STATS_ERROR,
            payload: err.response.data
        })
    }
}



export const getAllRecentOrders = ()=> async dispatch =>{
    dispatch({type:GET_ALL_RECENT_ORDERS_LOADING})

    try{
        const res = await axios.get("/dashboard/recent-orders")
        dispatch({
            type:GET_ALL_RECENT_ORDERS_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_RECENT_ORDERS_ERROR,
            payload: err.response.data
        })
    }
}


export const getAllSales = ()=> async dispatch =>{
    dispatch({type:GET_ALL_SALES_LOADING})

    try{
        const res = await axios.get("/dashboard/sales")
        dispatch({
            type:GET_ALL_SALES_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_SALES_ERROR,
            payload: err.response.data
        })
    }
}


export const getAllVisitors = ()=> async dispatch =>{
    dispatch({type:GET_ALL_VISITORS_LOADING})

    try{
        const res = await axios.get("/dashboard/visitors")
        dispatch({
            type:GET_ALL_VISITORS_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_VISITORS_ERROR,
            payload: err.response.data
        })
    }
}


export const getAllRealTime = ()=> async dispatch =>{
    dispatch({type:GET_ALL_REAL_TIME_LOADING})

    try{
        const res = await axios.get("/dashboard/real-time")
        dispatch({
            type:GET_ALL_REAL_TIME_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:GET_ALL_REAL_TIME_ERROR,
            payload: err.response.data
        })
    }
}
