import { createSlice } from "@reduxjs/toolkit";
const VechicleDetailSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    requiredFields: [
      "ID",
      "Vehicle No",
      "Company",
      "Date",
      "Slip No",
      "Trip",
      "Time",
      "P_D",
      "Distance",
      "Start Location",
      "End Location",
    ],
    vechicle: [],
    addvechicle: {},
  },
  reducers: {
    vechicleRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    vechicleSuccess(state, action) {
      return {
        ...state,
        loading: false,
        vechicle: action.payload,
      };
    },
    vechicleFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    // vechicleListRequest(state, action) {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    // vechicleListSuccess(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     addVechicle: action.payload.addvechicle,
    //   };
    // },
    // vechicleListFail(state, action) {
    //   return {
    //     loading: false,
    //     error: action.payload,
    //   };
    // },
  },
});

const { actions, reducer } = VechicleDetailSlice;

export const { vechicleRequest, vechicleSuccess, vechicleFail } = actions;

export default reducer;
