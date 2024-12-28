import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    roles: roleReducer,
    categories: categoryReducer,
    products: productReducer
})