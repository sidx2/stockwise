import { createReducer, on } from "@ngrx/store"
import { addVendorFailure, addVendorRequest, addVendorSuccess, deleteVendorFailure, deleteVendorRequest, deleteVendorSuccess, fetchVendorsFailure, fetchVendorsRequest, fetchVendorsSuccess, updateVendorFailure, updateVendorRemote, updateVendorRequest, updateVendorSuccess } from "./vendor.actions";
import { IVendorsState, Vendor } from "../models/vendor";

export const initialState: IVendorsState = {
    vendors: [],
    isLoading: false,
}

export const vendorReducer = createReducer(
    initialState,
    on(fetchVendorsRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(fetchVendorsSuccess, (state, action) => {
        return ({ ...state, vendors: action.vendors, isLoading: false });
    }),
    on(fetchVendorsFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),

    // add vendors
    on(addVendorRequest, (state) => {
        return ({ ...state, isLoading: true })
    }),
    on(addVendorSuccess, (state, action) => {
        return ({ ...state, vendors: [...state.vendors, action.vendor], isLoading: false });
    }),

    on(addVendorFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),

    // update vendor
    on(updateVendorRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(updateVendorSuccess, (state, action) => {
        const newVenors = state.vendors.map((vendor: Vendor) => {
            if (vendor._id == action.vendor._id) {
                vendor = action.vendor
            }
            return vendor
        })

        return ({ ...state, vendors: newVenors, isLoading: false });
    }),
    on(updateVendorFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),

    // remote update
    on(updateVendorRemote, (state, action) => {
        const newVenors = state.vendors.map((vendor: Vendor) => {
            if (vendor._id == action.vendor._id) {
                vendor = {...vendor, ...action.vendor}
            }
            return vendor
        })

        return ({ ...state, vendors: newVenors });
    }),

    // delete vendor
    on(deleteVendorRequest, (state) => {
        return ({ ...state, isLoading: true });
    }),
    on(deleteVendorSuccess, (state, action) => {
        const newVendors = state.vendors.filter((vendor: Vendor) => vendor._id !== action.vendor._id)
        return ({ ...state, vendors: newVendors, isLoading: false });
    }),
    on(deleteVendorFailure, (state) => {
        return ({ ...state, isLoading: false });
    }),
)