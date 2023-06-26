import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import VechicleDetailSliceReducer from "./slices/VechicleDetailSlice";


const reducer = combineReducers({
    VechicleDetailState: VechicleDetailSliceReducer,
   
    
})


const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;