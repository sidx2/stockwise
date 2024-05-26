import { createAction, props } from "@ngrx/store";
import { Vendor } from "../models/vendor";

export const fetchVendorsRequest = createAction("fetchVendorsRequest");
export const fetchVendorsSuccess = createAction("fetchVendorsSuccess", props<{ vendors: Vendor[] }>())
export const fetchVendorsFailure = createAction("fetchVendorsFailure", props<{ error: string }>())

export const addVendorRequest = createAction("addVendorsRequest", props<{ vendor: Vendor }>());
export const addVendorSuccess = createAction("addVendorsSuccess", props<{ vendor: Vendor }>())
export const addVendorFailure = createAction("addVendorsFailure", props<{ error: string }>())

export const updateVendorRequest = createAction("updateVendorRequest", props<{ vendor: Vendor }>())
export const updateVendorSuccess = createAction("updateVendorSuccess", props<{ vendor: Vendor }>())
export const updateVendorFailure = createAction("updateVendorFailure", props<{ error: string }>())

export const updateVendorRemote = createAction("updateVendorRemote", props<{ vendor: Vendor }>());

export const deleteVendorRequest = createAction("deleteVendorRequest", props<{ vendorId: string }>())
export const deleteVendorSuccess = createAction("deleteVendorSuccess", props<{ vendor: Vendor }>())
export const deleteVendorFailure = createAction("deleteVendorFailure", props<{ error: string }>())

export const setVendorLoading = createAction('setVendorLoading');
export const resetVendorLoading = createAction('resetVendorLoading');