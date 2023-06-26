import { createSlice } from "@reduxjs/toolkit";
const VechicleDetailSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        requiredFields : ["ID", "Vehicle No", "Company", "Date", "Slip No", "Trip", "Time", "P_D", "Distance", "Start Location", "End Location"],
        vechicle: []
    },
    reducers: { 
     
        vechicleRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        vechicleSuccess(state, action) {
            return {
                ...state,
                loading: false,
                vechicle: action.payload,
              
            }
        },
        vechicleFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        // bulkUpdateRequest(state, action) {
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // },
        // bulkUpdateSuccess(state, action) {
        //     return {
        //         ...state,
        //         loading: false,
        //         bulkupdate: action.payload.message,
              
        //     }
        // },
        // bulkUpdateFail(state, action) {
        //     return {
        //         loading: false,
        //         error: action.payload
        //     }
        // },
    }
});

const { actions, reducer } = VechicleDetailSlice;

export const {
    vechicleRequest,
    vechicleSuccess,
    vechicleFail,
    // bulkUpdateRequest,
    // bulkUpdateSuccess,
    // bulkUpdateFail
   
} = actions;

export default reducer;