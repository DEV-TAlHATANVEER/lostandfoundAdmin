import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from './reducers/authReducer';
const store = configureStore({
    reducer: combineReducers({
        sidebar: sidebarReducer,
        auth: authReducer,
    })
});

export default store;