import { createReducer, on } from "@ngrx/store"
import { addVendorFailure, addVendorRequest, addVendorSuccess, deleteVendorFailure, deleteVendorRequest, deleteVendorSuccess, fetchVendorsFailure, fetchVendorsRequest, fetchVendorsSuccess, resetVendorLoading, setVendorLoading, updateVendorFailure, updateVendorRemote, updateVendorRequest, updateVendorSuccess } from "./vendor.actions";
import { IVendorsState, Vendor } from "../models/vendor";

export const initialState: IVendorsState = {
    vendors: [],
    isLoading: false,
}

export const vendorReducer = createReducer(
    initialState,
    on(fetchVendorsRequest, (state) => {
        console.log("fetchVendors:", "state: ", state);
        return (state);
    }),
    on(fetchVendorsSuccess, (state, action) => {
        console.log("fetchVendorsSuccess:", "state: ", state, "action ->", action);
        return ({ ...state, vendors: action.vendors });
    }),
    on(fetchVendorsFailure, (state, action) => {
        console.log("fetchVendorsFailure:", "state: ", state, "action ->", action);
        return (state);
    }),

    // add vendors
    on(addVendorRequest, (state, action) => {
        console.log("addVendorRequest", "state:", state, "action: ", action)
        return (state)
    }),
    on(addVendorSuccess, (state, action) => {
        console.log("addVendorSuccess", "state:", state, "action: ", action)
        return ({ ...state, vendors: [...state.vendors, action.vendor] });
    }),

    on(addVendorFailure, (state, action) => {
        console.log("addVendorFailure", "state:", state, "action: ", action)
        return (state)
    }),

    // update vendor
    on(updateVendorRequest, (state, action) => {
        console.log("updateVendorRequest:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(updateVendorSuccess, (state, action) => {
        console.log("updateVendorSuccess:", "state: ", state, "action ->", action);
        const newVenors = state.vendors.map((vendor: Vendor) => {
            if (vendor._id == action.vendor._id) {
                vendor = action.vendor
            }
            return vendor
        })

        return ({ ...state, vendors: newVenors });
    }),
    on(updateVendorFailure, (state, action) => {
        console.log("updateVendorFailure:", "state: ", state, "action ->", action);
        return (state);
    }),

    // remote update
    on(updateVendorRemote, (state, action) => {
        console.log("updateVendorSuccess:", "state: ", state, "action ->", action);
        const newVenors = state.vendors.map((vendor: Vendor) => {
            if (vendor._id == action.vendor._id) {
                vendor = action.vendor
            }
            return vendor
        })

        return ({ ...state, vendors: newVenors });
    }),

    // delete vendor
    on(deleteVendorRequest, (state, action) => {
        console.log("deleteVendorRequest:", "state: ", state, "action ->", action);
        return (state);
    }),
    on(deleteVendorSuccess, (state, action) => {
        console.log("deleteVendorSuccess:", "state: ", state, "action ->", action);
        const newVendors = state.vendors.filter((vendor: Vendor) => vendor._id !== action.vendor._id)

        return ({ ...state, vendors: newVendors });
    }),
    on(deleteVendorFailure, (state, action) => {
        console.log("deleteVendorFailure:", "state: ", state, "action ->", action);
        return (state);
    }),

    // loading...
    on(setVendorLoading, (state) => {
        console.log("setVendorLoading", "state:", state, "action: ", undefined)
        return ({ ...state, isLoading: true });
    }),
    on(resetVendorLoading, (state) => {
        console.log("resetVendorLoading", "state:", state, "action: ", undefined)
        return ({...state, isLoading: false });
    })
)