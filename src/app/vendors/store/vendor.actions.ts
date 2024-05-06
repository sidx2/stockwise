import { createAction, props } from "@ngrx/store";

export const fetchVendorsRequest = createAction("fetchVendorsRequest");
export const fetchVendorsSuccess = createAction("fetchVendorsSuccess", props<any>())
export const fetchVendorsFailure = createAction("fetchVendorsFailure", props<any>())

export const addVendorRequest = createAction("addVendorsRequest", props<any>());
export const addVendorSuccess = createAction("addVendorsSuccess", props<any>())
export const addVendorFailure = createAction("addVendorsFailure", props<any>())

export const updateVendorRequest = createAction("updateVendorRequest", props<any>())
export const updateVendorSuccess = createAction("updateVendorSuccess", props<any>())
export const updateVendorFailure = createAction("updateVendorFailure", props<any>())

export const deleteVendorRequest = createAction("deleteVendorRequest", props<any>())
export const deleteVendorSuccess = createAction("deleteVendorSuccess", props<any>())
export const deleteVendorFailure = createAction("deleteVendorFailure", props<any>())