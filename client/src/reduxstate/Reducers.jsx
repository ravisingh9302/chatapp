import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ChatReducer from "./ChatSlice";


const rootReducers = combineReducers({
    Auth: AuthReducer,
    Chat:ChatReducer
   
})

export default rootReducers