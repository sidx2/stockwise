import { createAction, props } from "@ngrx/store";

export const fetchVendors = createAction("fetchVendors");

export const fetchVendorsSuccess = createAction("fetchVendorsSuccess", props<any>())

export const fetchVendorsFailure = createAction("fetchVendorsSuccess", props<any>())

export const getVendors = createAction("getVendors");

export const setVendors = createAction("setVendors");