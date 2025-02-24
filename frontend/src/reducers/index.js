import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    orders: orderReducer
})