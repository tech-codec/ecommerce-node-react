import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";
import dashboardReducer from "./dashboard.reducer";


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    roles: roleReducer,
    categories: categoryReducer,
    products: productReducer,
    orders: orderReducer,
    dashboard: dashboardReducer
})