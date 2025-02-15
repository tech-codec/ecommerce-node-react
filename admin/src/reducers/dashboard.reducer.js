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
} from "../actions/dashBoardAction/type.action"


const initialState = {
    lowStockProducts: null,
    errorLowStock: null,
    loadingLowStock: false,

    topProducts: null,
    errorTopProducts: null,
    loadingTopProducts: false,

    customerActivity: null,
    errorCustomerActivity: null,
    loadingCustomerActivity: false,

    customerStats: null,
    errorCustomerStats: null,
    loadingCustomerStats: false,

    recentOrders: null,
    errorRecentOrders: null,
    loadingRecentOrders: false,

    salesData: null,
    errorSales: null,
    loadingSales: false,

    visitorsData: null,
    errorVisitors: null,
    loadingVisitors: false,

    statistic: null,
    errorStats: null,
    loadingStats: false
}


export default function dashboardReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action

    switch (type) {
        case GET_ALL_LOW_STOCK_LOADING:
            return {
                ...state,
                loadingLowStock: true
            }
        case GET_ALL_LOW_STOCK_LOADED:
            return {
                ...state,
                loadingLowStock: false,
                lowStockProducts: payload,
                errorLowStock: null
            }
        case GET_ALL_LOW_STOCK_ERROR:
            return {
                ...state,
                loadingLowStock: false,
                lowStockProducts: null,
                errorLowStock: payload
            }
        case GET_ALL_TOP_PRODUCTS_LOADING:
            return {
                ...state,
                loadingTopProducts: true
            }
        case GET_ALL_TOP_PRODUCTS_LOADED:
            return {
                ...state,
                loadingTopProducts: false,
                topProducts: payload,
                errorTopProducts: null
            }
        case GET_ALL_TOP_PRODUCTS_ERROR:
            return {
                ...state,
                loadingTopProducts: false,
                topProducts: null,
                errorTopProducts: payload
            }
        case GET_ALL_CUSTOMER_ACTIVITY_LOADING:
            return {
                ...state,
                loadingCustomerActivity: true
            }
        case GET_ALL_CUSTOMER_ACTIVITY_LOADED:
            return {
                ...state,
                loadingCustomerActivity: false,
                customerActivity: payload,
                errorCustomerActivity: null
            }
        case GET_ALL_CUSTOMER_ACTIVITY_ERROR:
            return {
                ...state,
                loadingCustomerActivity: false,
                customerActivity: null,
                errorCustomerActivity: payload
            }
        case GET_ALL_CUSTOMER_STATS_LOADING:
            return {
                ...state,
                loadingCustomerStats: true
            }
        case GET_ALL_CUSTOMER_STATS_LOADED:
            return {
                ...state,
                loadingCustomerStats: false,
                customerStats: payload,
                errorCustomerStats: null
            }
        case GET_ALL_CUSTOMER_STATS_ERROR:
            return {
                ...state,
                loadingCustomerStats: false,
                customerStats: null,
                errorCustomerStats: payload
            }
        case GET_ALL_RECENT_ORDERS_LOADING:
            return {
                ...state,
                loadingRecentOrders: true
            }
        case GET_ALL_RECENT_ORDERS_LOADED:
            return {
                ...state,
                loadingRecentOrders: false,
                recentOrders: payload,
                errorRecentOrders: null
            }
        case GET_ALL_RECENT_ORDERS_ERROR:
            return {
                ...state,
                loadingRecentOrders: false,
                recentOrders: null,
                errorRecentOrders: payload
            }
        case GET_ALL_SALES_LOADING:
            return {
                ...state,
                loadingSales: true
            }
        case GET_ALL_SALES_LOADED:
            return {
                ...state,
                loadingSales: false,
                salesData: payload,
                errorSales: null
            }
        case GET_ALL_SALES_ERROR:
            return {
                ...state,
                loadingSales: false,
                salesData: null,
                errorSales: payload
            }
        case GET_ALL_VISITORS_LOADING:
            return {
                ...state,
                loadingVisitors: true
            }
        case GET_ALL_VISITORS_LOADED:
            return {
                ...state,
                loadingVisitors: false,
                visitorsData: payload,
                errorVisitors: null
            }
        case GET_ALL_VISITORS_ERROR:
            return {
                ...state,
                loadingVisitors: false,
                visitorsData: null,
                errorVisitors: payload
            }
        case GET_ALL_REAL_TIME_LOADING:
            return {
                ...state,
                loadingStats: true
            }
        case GET_ALL_REAL_TIME_LOADED:
            return {
                ...state,
                loadingStats: false,
                statistic: payload,
                errorStats: null
            }
        case GET_ALL_REAL_TIME_ERROR:
            return {
                ...state,
                loadingStats: false,
                statistic: null,
                errorStats: payload
            }
        default:
            return state
    }

}