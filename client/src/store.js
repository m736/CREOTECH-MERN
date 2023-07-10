import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import VechicleDetailSliceReducer from "./slices/VechicleDetailSlice";
import VehicleInductionSliceReducer from "./slices/VehicleInductionSlice";

const reducer = combineReducers({
  VechicleDetailState: VechicleDetailSliceReducer,
  VechicleInductionState: VehicleInductionSliceReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
