import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";


export default combineReducers({
    auth: authReducer,
    user: userReducer,
    roles: roleReducer
})